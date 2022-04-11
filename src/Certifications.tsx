import * as React from "react";
import { Background } from "./Background";
import {
  CertificationsLearn,
  ICertificationsLearnContent,
} from "./CertificationsLearn";
import { appContext } from "./core/AppContext";
import { LoadingIndicator } from "./core/LoadingIndicator";
import { Settings } from "./core/Settings";
import { InfoButtonIngredient } from "./InfoButtonIngredient";
import { Panel } from "./Panel";
import { ProgressBar } from "./ProgressBar";
import { Question } from "./Question";
import { Session } from "./Session";
import { certifications } from "./data/data.json";

// tslint:disable-next-line
const { default: html2React } = require("html2react");

import "./styles/certifications.css";

interface IColumn {
  title: JSX.Element;
  rows: string[];
}

interface ICertificationsContent {
  main: {
    title: JSX.Element;
    question: string;
    footer: JSX.Element;
    organics: IColumn;
    others: IColumn;
    bg: string;
  };
  learn: ICertificationsLearnContent;
}

interface ICertificationsState {
  loaded: boolean;
  organics: boolean[];
  others: boolean[];
  learn: boolean;
}

export class Certifications extends React.Component<{}, ICertificationsState> {
  private static _content: any = certifications;

  constructor(props: {}) {
    super(props);
    this.state = {
      loaded: true,
      organics: [],
      others: [],
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

    const _content = Certifications._content[this.context.fish];

    if (this.state.learn) {
      return (
        <CertificationsLearn
          rows={certifications.learn.rows}
          content={certifications.learn}
          onBack={() => this.setState({ learn: false })}
        />
      );
    }

    const color = Settings.data.colors.certifications;
    const mainContent = _content;

    return (
      <div>
        <Background path={mainContent.bg} />
        <InfoButtonIngredient />
        <Panel
          className='certifications'
          body={
            <React.Fragment>
              <div>
                <h2
                  className='has-text-color'
                  style={{ color: "rgb(15, 188, 192)", fontWeight: 500 }}>
                  {mainContent.title}
                </h2>
              </div>
              <div style={{ fontWeight: 500 }}>{mainContent.question}</div>
              <div className='certifications-table'>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    maxHeight: "60vh",
                  }}>
                  {mainContent.rows.map((r: any, i: any) => {
                    return (
                      <div key={`organics_${i}`}>
                        <Question
                          checked={this.state.organics[i]}
                          text={html2React(r)}
                          color={color}
                          onChecked={(checked) => {
                            const organics = [...this.state.organics];
                            organics[i] = checked;
                            this.setState({ organics });
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </React.Fragment>
          }
          footer={
            <appContext.Consumer>
              {({ localTransition, transition }) => {
                return (
                  <React.Fragment>
                    <div
                      className='clickable fsFooter'
                      onClick={() => {
                        localTransition?.(() => this.setState({ learn: true }));
                      }}>
                      <p
                        className='has-text-color'
                        style={{ color: "rgb(15, 188, 192)" }}>
                        {html2React(mainContent.footer)}
                      </p>
                    </div>
                    <ProgressBar
                      progress={mainContent.progress}
                      onNext={() => {
                        const organicsCount = this.state.organics.reduce(
                          (prev, cur) => prev + (cur ? 1 : 0),
                          0
                        );
                        const otherCount = this.state.others.reduce(
                          (prev, cur) => prev + (cur ? 1 : 0),
                          0
                        );
                        const count = Math.min(organicsCount + otherCount, 5);
                        Session.setCertifications(count);

                        transition?.("/transparency");
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
}

Certifications.contextType = appContext;
