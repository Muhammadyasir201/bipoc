import * as React from "react";
import { Background } from "./Background";
import { appContext } from "./core/AppContext";
import { Button, ButtonType } from "./core/Button";
import { welcome } from "./data/data.json";
const { default: html2React } = require("html2react");

import "./styles/welcome.css";

interface IWelcomeContent {
  title: string;
  content: JSX.Element;
  footer: JSX.Element;
  bg: string;
}

export class Welcome extends React.Component {
  public static content: IWelcomeContent;

  public render() {
    return (
      <div className="fill-parent welcome">
        <Background path={welcome.backgroundImage} />
        <div className="welcome-container">
          <div className="welcome-panel card">
            <div className="welcome-body">
              <div className="welcome-title fsTitle">{welcome.title}</div>
              <div>{html2React(welcome.content)}</div>
              <div className="welcome-button-container">
                <appContext.Consumer>
                  {({ transition }) => {
                    return (
                      <button
                        className="welcomeBtn"
                        onClick={() => {
                          sessionStorage.removeItem("howto-history-back");
                          transition?.("/welcome-2");
                        }}
                      >
                        Get Connected
                      </button>
                    );
                  }}
                </appContext.Consumer>
              </div>
            </div>
          </div>
          <div className="welcome-footer">
            <div className="welcome-footer-text">
              {welcome.footerText}

              <span>
                Learn more{" "}
                <strong
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    window.open(
                      "https://creativecommons.org/publicdomain/zero/1.0/"
                    )
                  }
                >
                  here
                </strong>
              </span>
            </div>
            <div className="welcome-footer-logos">
              <img src={welcome.logo2} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
