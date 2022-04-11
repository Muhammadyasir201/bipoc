import * as React from "react";
import { Background } from "./Background";
import { appContext } from "./core/AppContext";
import { Dialog } from "./core/Dialog";

import Popover from "@material-ui/core/Popover";
const { default: html2React } = require("html2react");
import "./styles/certificationslearn.css";

interface ILearnLink {
  name: string;
  content: JSX.Element;
}

interface ILearnSection {
  title: string;
  links: ILearnLink[];
}

export interface ICertificationsLearnContent {
  title: JSX.Element;
  content: JSX.Element;
  organics: ILearnSection;
  others: ILearnSection;
  bg: string;
}

interface ICertificationsLearnProps {
  content: any;
  onBack: () => void;
  rows: string[][];
}

interface ICertificationsLearnState {
  popover?: {
    anchor: HTMLElement;
    content: JSX.Element;
  };
  dialogVisible: boolean;
  title: string;
  link: string;
  dialogContent: string;
}

export class CertificationsLearn extends React.Component<
  ICertificationsLearnProps,
  ICertificationsLearnState
> {
  constructor(props: ICertificationsLearnProps) {
    super(props);
    this.state = {
      dialogVisible: false,
      title: "",
      link: "",
      dialogContent: "",
    };
  }

  public render() {
    const { content, onBack, rows } = this.props;
    const { popover } = this.state;

    const makeSection = (section: ILearnSection) => {
      return (
        <div>
          <div className='certifications-learn-section-title'>
            {section.title}
          </div>
          <div>
            {section.links.map((l, i) => {
              return (
                <div
                  key={i}
                  className='clickable certifications-link'
                  onClick={(e) => {
                    this.setState({
                      popover: {
                        anchor: e.currentTarget,
                        content: (
                          <div className='certifications-popover'>
                            {l.content}
                          </div>
                        ),
                      },
                    });
                  }}>
                  {l.name}
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    return (
      <React.Fragment>
        <Background path={content.bg} />
        <Dialog
          link={this.state.link}
          visible={this.state.dialogVisible}
          title={this.state.title}
          learn='Learn More'
          content={html2React(this.state.dialogContent)}
          bgColor=''
          onClose={() => this.setState({ dialogVisible: false })}
        />
        <div className='fill-parent certifications-learn'>
          <div className='certifications-learn-body'>
            <div>
              <h2
                className='has-text-color'
                style={{
                  color: "rgb(15, 188, 192)",
                  fontSize: "2rem",
                  fontWeight: 500,
                }}>
                {content.title}
              </h2>
            </div>
            <div>{html2React(content.content)}</div>
            <div className='certifications-learn-sections'>
              {rows.map(([r, c, l]: any, i) => (
                <div
                  onClick={() => {
                    this.setState({
                      title: html2React(r),
                      dialogContent: c,
                      dialogVisible: true,
                      link: l,
                    });
                  }}
                  className='clickable certifications-link'
                  key={i}>
                  {html2React(r)}
                </div>
              ))}
            </div>
          </div>
          <div>
            <appContext.Consumer>
              {({ localTransition }) => {
                return (
                  <button
                    className='certificationBtn'
                    onClick={() => {
                      localTransition?.(onBack);
                    }}>
                    Return to Tool
                  </button>
                );
              }}
            </appContext.Consumer>
          </div>
          <Popover
            anchorEl={popover?.anchor}
            open={Boolean(popover)}
            onClose={() => this.setState({ popover: undefined })}>
            {popover?.content}
          </Popover>
        </div>
      </React.Fragment>
    );
  }
}
