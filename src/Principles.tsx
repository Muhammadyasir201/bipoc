import * as React from "react";
import { Background } from "./Background";
import { appContext } from "./core/AppContext";
import { Button } from "./core/Button";

import "./styles/principles.css";

interface IPrinciplesContent {
  title: string;
  content: string;
  bg: string;
}

export class Principles extends React.Component {
  public static content: IPrinciplesContent;

  public render() {
    const { content } = Principles;
    return (
      <React.Fragment>
        {/* <Background path={content.bg} /> */}
        <div className="principles fill-parent">
          <div>
            <div className="principles-title fsTitle">{content.title}</div>
            <div className="principles-content">{content.content}</div>
            <div>
              <appContext.Consumer>
                {({ localTransition, history }) => {
                  return (
                    <Button
                      text="Go Back"
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
      </React.Fragment>
    );
  }
}
