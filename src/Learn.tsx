import * as React from "react";
import { Categories } from "./Categories";
import { appContext } from "./core/AppContext";
import { Button } from "./core/Button";
import { DOMUtils } from "./core/DOMUtils";
import { Images } from "./core/Images";
import { LoadingIndicator } from "./core/LoadingIndicator";
import { Settings } from "./core/Settings";
import { IPostJson } from "./Posts";

import "./styles/learn.css";

// tslint:disable-next-line
const { default: html2React } = require("html2react");

interface ILearnProps {
  section: string;
  index: string;
}

interface ILearnState {
  loaded: boolean;
  page: number;
}

interface ILearnPageContent {
  title: string;
  content: JSX.Element;
  image: string;
}

interface ILearnContent {
  [section: string]: {
    [index: string]: ILearnPageContent[];
  };
}

export class Learn extends React.Component<ILearnProps, ILearnState> {
  private static _content: ILearnContent = {};

  public static get assets() {
    return {
      leftArrow: "/public/images/button-left.svg",
      rightArrow: "/public/images/button-right.svg",
    };
  }

  constructor(props: ILearnProps) {
    super(props);
    this.state = {
      loaded: false,
      page: 0,
    };
  }

  public componentDidMount() {
    this.load(this.props);
  }

  public UNSAFE_componentWillReceiveProps(nextProps: ILearnProps) {
    if (
      nextProps.section !== this.props.section ||
      nextProps.index !== this.props.index
    ) {
      this.setState({ loaded: false });
      this.load(nextProps);
    }
  }

  public render() {
    if (!this.state.loaded) {
      return <LoadingIndicator />;
    }

    const { section, index } = this.props;
    const { page } = this.state;
    const pages = Learn._content[section][index];
    const content = pages[page];

    return (
      <div className='learn'>
        <div>
          <div className='learn-image-container'>
            <img className='learn-image' src={content.image} />
          </div>
          <div className='learn-left-footer'>
            <div>
              <img
                className='learn-arrow clickable'
                src={Learn.assets.leftArrow}
                onClick={() => {
                  this.setState({
                    page: page > 0 ? page - 1 : pages.length - 1,
                  });
                }}
              />
            </div>
            <div className='fsFooter'>
              Information Artwork by Douglas Gayeton for The Lexicon
            </div>
            <div>
              <img
                className='learn-arrow clickable'
                src={Learn.assets.rightArrow}
                onClick={() => {
                  this.setState({ page: (page + 1) % pages.length });
                }}
              />
            </div>
          </div>
        </div>
        <div className='learn-right'>
          <div className='learn-right-header fsSubtitle'>{content.title}</div>
          <div className='learn-right-body'>{content.content}</div>
          <div>
            <appContext.Consumer>
              {({ localTransition, history }) => {
                return (
                  <Button
                    text='Return to Tool'
                    onClick={() => {
                      localTransition?.(() => history?.goBack());
                    }}
                  />
                );
              }}
            </appContext.Consumer>
          </div>
        </div>
      </div>
    );
  }

  private async load(props: ILearnProps) {
    const { section, index } = props;
    if (section in Learn._content && index in Learn._content[section]) {
      this.setState({ loaded: true });
      return;
    }

    const request = `wp-json/wp/v2/posts?slug=${section}-learn-${index}`;
    const response = await fetch(`${Settings.data.wordpressUrl}/${request}`);
    const json: IPostJson[] = await response.json();
    const tree = new DOMParser().parseFromString(
      json[0].content.rendered,
      "text/html"
    );

    const pages: ILearnPageContent[] = DOMUtils.select(
      tree.body,
      ".wp-block-group"
    ).map((group) => {
      const [title, ...paragraphs] = DOMUtils.select(group, "p");
      return {
        title: title.querySelector("strong")?.innerText as string,
        content: html2React(
          paragraphs.map((p) => p.innerHTML).join("<br><br>")
        ),
        image: (group.querySelector("img") as HTMLImageElement).src,
      };
    });

    if (!(section in Learn._content)) {
      Learn._content[section] = { [index]: pages };
    } else if (!(index in Learn._content[section])) {
      Learn._content[section][index] = pages;
    }

    await Images.preload([
      ...pages.map((p) => p.image),
      Learn.assets.leftArrow,
      Learn.assets.rightArrow,
    ]);
    this.setState({ loaded: true });
  }
}
