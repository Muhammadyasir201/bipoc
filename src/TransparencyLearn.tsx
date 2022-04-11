import * as React from "react";
import { Background } from "./Background";
import { appContext } from "./core/AppContext";
import { Button } from "./core/Button";

import "./styles/transparencylearn.css";

export interface ITransparencyLearnContent {
  title: JSX.Element;
  content: string;
  bg: string;
}

interface ITransparencyLearnProps {
  content: any;
  onBack: () => void;
}

export class TransparencyLearn extends React.Component<ITransparencyLearnProps> {
  public render() {
    const { content, onBack } = this.props;
    return (
      <React.Fragment>
        <Background path={content.bg} />
        <div className='fill-parent transparency-learn'>
          <div className='transparency-learn-body'>
            <div>
              <div>
                <h2
                  className='title has-text-color'
                  style={{ color: "rgb(15, 188, 192)" }}>
                  {content.title}
                </h2>
              </div>
              <div>{content.content}</div>
            </div>
            <div className='transparency-learn-footer'>
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}
