import * as React from "react";
import { Background } from "./Background";
import { NavButton } from "./NavButton";
import { intro } from "./data/data.json";
import "./styles/intro.css";
import { appContext } from "./core/AppContext";
// tslint:disable-next-line
const { default: html2React } = require("html2react");

export class Intro extends React.Component {
  // public static get assets() {
  //   return {
  //     bg: intro?.backgroundImage,
  //     logo: intro?.logo,
  //   };
  // }

  public render() {
    return (
      <div className="fill-parent intro-root">
        <Background path={intro?.backgroundImage} />
        <div className="fill-parent intro-container">
          <div className="intro-body">
            <div className="main-logo-wrap">
              <img className="logo" src={intro?.logo2} />
            </div>
            {/* <div className="black-overlay"></div> */}
            <div className="intro-title">{intro?.title}</div>
            <div className="intro-title-two">{intro?.titleTwo}</div>
            <div className="intro-subtitle">{intro?.subTitle}</div>
            <div className="intro-desc">{intro?.description}</div>
            <div className="footer">
              <div className="footer-button">
                <NavButton text="Find out!" route="/welcome" />
              </div>
            </div>
          </div>

          {/* <div className="footer-rectangle">
              <div className="intro-subtitle">{intro?.subTitle}</div>
              <div className="intro-footer">{intro?.footerText}</div>
              <div className="logos">
                <img
                  onClick={() => window.open("https://www.greenbrownblue.com/")}
                  src={intro.logo1}
                />
                <img
                  onClick={() => window.open("https://www.thelexicon.org/")}
                  src={intro.logo2}
                />
                <img
                  onClick={() =>
                    window.open("https://www.greenbrownblue.com/greenerblue/")
                  }
                  src={intro.logo3}
                />
              </div>
              <div className="lastPara">{html2React(intro.footerPara)}</div>
            </div> */}
        </div>
      </div>
    );
  }
}
