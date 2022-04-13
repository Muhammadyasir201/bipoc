import * as React from "react";
import { Background } from "./Background";
import { appContext } from "./core/AppContext";
import { Button, ButtonType } from "./core/Button";
import { welcomeTwo } from "./data/data.json";
const { default: html2React } = require("html2react");

import "./styles/welcometwo.css";

interface IWelcomeTwoContent {
  title: string;
  content: JSX.Element;
  footer: JSX.Element;
  bg: string;
}

export class WelcomeTwo extends React.Component {
  public static content: IWelcomeTwoContent;

  public render() {
    return (
      <div className="fill-parent welcome">
        <Background path={welcomeTwo?.backgroundImage} />
        <div className="welcome-container">
          <div className="welcomeTwo-panel">
            <div className="welcome-body">
              <div className="welcomeTwo-title fsTitle">
                {welcomeTwo?.titleOne}
              </div>
              <div className="welcomeTwo-desc">
                {html2React(welcomeTwo?.descriptionOne)}
              </div>
              <div className={"welcomeTwoWrap"}>
                <div className="welcomeTwo-title fsTitle">
                  {welcomeTwo?.titleTwo}
                </div>
                <div className="welcomeTwo-desc">
                  {html2React(welcomeTwo?.descriptionTwo)}
                </div>
              </div>
              <div className="welcome-button-container">
                <appContext.Consumer>
                  {({ transition, Finfish }) => {
                    return (
                      <button
                        className="welcomeBtn"
                        onClick={() => {
                          Finfish();
                          sessionStorage.removeItem("howto-history-back");
                          transition?.("/howto");
                        }}
                      >
                        Let's get started!
                      </button>
                    );
                  }}
                </appContext.Consumer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
