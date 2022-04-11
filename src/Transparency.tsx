import * as React from "react";
import { Background } from "./Background";
import { Categories } from "./Categories";
import { appContext } from "./core/AppContext";
import { DOMUtils } from "./core/DOMUtils";
import { Images } from "./core/Images";
import { LoadingIndicator } from "./core/LoadingIndicator";
import { Settings } from "./core/Settings";
import { InfoButtonIngredient } from "./InfoButtonIngredient";
import { Panel } from "./Panel";
import { IPostJson } from "./Posts";
import { ProgressBar } from "./ProgressBar";
import { Question } from "./Question";
import { Session } from "./Session";
import { transparency } from "./data/data.json";

// tslint:disable-next-line
const { default: html2React } = require("html2react");

import "./styles/transparency.css";
import { TransparencyLearn } from "./TransparencyLearn";

interface ITransparencyState {
  loaded: boolean;
  programs: boolean[];
  learn: boolean;
}

interface IProgram {
  text: string;
  multiplier: number;
}

interface ITransparencyContent {
  main: {
    title: JSX.Element;
    question: string;
    programs: IProgram[];
    footer: JSX.Element;
    bg: string;
  };
  learn: {
    bg: string;
    title: JSX.Element;
    content: string;
  };
}

export class Transparency extends React.Component<{}, ITransparencyState> {
  private static _content: any = transparency;

  constructor(props: {}) {
    super(props);
    this.state = {
      loaded: true,
      programs: [],
      learn: false,
    };
  }

  // public componentDidMount() {
  //   this.load();
  // }

  public render() {
    if (!this.state.loaded) {
      return <LoadingIndicator />;
    }

    const { _content } = Transparency;

    if (this.state.learn) {
      return (
        <TransparencyLearn
          content={_content.learn}
          onBack={() => this.setState({ learn: false })}
        />
      );
    }

    return (
      <div>
        <Background path={_content[this.context.fish]} />
        <InfoButtonIngredient />
        <Panel
          className='transparency'
          body={
            <React.Fragment>
              <div>
                <h2
                  className='title has-text-color'
                  style={{ color: "rgb(15, 188, 192)", fontWeight: 500 }}>
                  {_content.title}
                </h2>
              </div>
              <div className='transparency-question'>{_content.question}</div>
              {_content.programs.map((r: any, i: any) => {
                return (
                  <div key={i}>
                    <Question
                      checked={this.state.programs[i]}
                      text={r.text}
                      color={Settings.data.colors.transparency}
                      onChecked={(checked) => {
                        const { programs } = this.state;
                        programs[i] = checked;
                        this.setState({ programs });
                      }}
                    />
                  </div>
                );
              })}
            </React.Fragment>
          }
          footer={
            <appContext.Consumer>
              {({ localTransition, transition, fish }) => {
                return (
                  <React.Fragment>
                    <div
                      className='clickable fsFooter'
                      onClick={() =>
                        localTransition?.(() => this.setState({ learn: true }))
                      }>
                      <p
                        className='has-text-color'
                        style={{ color: "rgb(15, 188, 192)" }}>
                        {html2React(_content.footer)}
                      </p>
                    </div>
                    <ProgressBar
                      progress={_content.progress[fish]}
                      onNext={() => {
                        const multiplier = this.state.programs.reduce(
                          (prev, cur, index) => {
                            if (cur) {
                              return prev * _content.programs[index].multiplier;
                            }
                            return prev;
                          },
                          1
                        );

                        Session.setTransparency(multiplier);
                        transition?.("/results");
                        // transition?.("/youdidit");
                      }}
                    />
                  </React.Fragment>
                );
              }}
            </appContext.Consumer>
          }
        />
      </div>
    );
  }

  // private async load() {
  //   if (Transparency._content) {
  //     this.setState({ loaded: true });
  //     return;
  //   }

  //   // Main
  //   const categoryId = Categories.get("transparency").id;
  //   const request = `wp-json/wp/v2/posts?categories=${categoryId}`;
  //   const response = await fetch(`${Settings.data.wordpressUrl}/${request}`);
  //   const json: IPostJson[] = await response.json();

  //   const rawTransparency = json.find(
  //     (j) => j.slug === "transparency"
  //   ) as IPostJson;
  //   const tree = new DOMParser().parseFromString(
  //     rawTransparency.content.rendered,
  //     "text/html"
  //   );

  //   const rows = DOMUtils.select(
  //     tree.body.querySelector("tbody") as HTMLElement,
  //     "tr"
  //   );
  //   const [titles, ...contentRows] = rows;
  //   const programs: IProgram[] = contentRows.map((r) => {
  //     const [text, multiplier] = DOMUtils.toArray(r.children);
  //     return {
  //       text: text.innerText,
  //       multiplier: parseFloat(multiplier.innerText),
  //     };
  //   });

  //   const mainContent = {
  //     title: html2React(tree.body.querySelector("h2")?.outerHTML),
  //     question: (tree.body.querySelector(".question") as HTMLParagraphElement)
  //       .innerHTML,
  //     footer: html2React(tree.body.querySelector(".footer")?.outerHTML),
  //     bg: (tree.body.querySelector("figure > img") as HTMLImageElement).src,
  //     programs,
  //   };

  //   // Learn
  //   const rawLearn = json.find(
  //     (j) => j.slug === "transparency-learn"
  //   ) as IPostJson;
  //   const learnTree = new DOMParser().parseFromString(
  //     rawLearn.content.rendered,
  //     "text/html"
  //   ).body;
  //   const learnContent = {
  //     title: html2React(learnTree.querySelector(".title")?.outerHTML),
  //     content: learnTree.querySelector(".content")?.innerHTML as string,
  //     bg: (learnTree.querySelector(".bg > img") as HTMLImageElement).src,
  //   };

  //   const content: ITransparencyContent = {
  //     main: mainContent,
  //     learn: learnContent,
  //   };

  //   await Images.preload([content.main.bg, content.learn.bg]);

  //   Transparency._content = content;
  //   this.setState({
  //     loaded: true,
  //     programs: programs.map(() => false),
  //   });
  // }
}

Transparency.contextType = appContext;
