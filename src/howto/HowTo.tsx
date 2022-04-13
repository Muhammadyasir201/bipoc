import * as React from "react";
import { appContext } from "../core/AppContext";
import { Button } from "../core/Button";
import { NavButton } from "../NavButton";
import { Utils } from "../Utils";
import { HowToSection } from "./HowToSection";
import { howto } from "../data/data.json";
const { default: html2React } = require("html2react");
import "./styles/howto.css";
import { Redirect } from "react-router-dom";

interface IHowToContent {
  icon: string;
  title: string;
  content: JSX.Element;
  learnFact: JSX.Element;
  principlesDesc: JSX.Element;
  sections: {
    [section: string]: {
      principles: string[];
      icon: string;
      color: string;
    };
  };
  learnPrinciples: JSX.Element;
}

export class HowTo extends React.Component {
  public static Finfish: any = howto;

  public render() {
    const backButton = Boolean(sessionStorage.getItem("howto-history-back"));
    const fish = HowTo.Finfish[this.context.fish];
    if (!fish) return <Redirect to="/intro" />;

    return (
      <appContext.Consumer>
        {({ localTransition, transition, history }) => {
          return (
            <div className="fill-parent howto">
              <div className="howto-body">
                <div className="howto-body-left backdrop" />
                <div className="howto-body-left">
                  <img src={howto?.Finfish?.icon} />
                  <div className="howTo-wrapper">
                    <div className="howto-title fsTitle">
                      {howto?.Finfish?.title}
                    </div>
                    <div
                      className="howto-text"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        window.open(
                          "https://creativecommons.org/licenses/by-nc-sa/3.0/igo/"
                        )
                      }
                    >
                      {html2React(howto?.Finfish?.content)}
                    </div>

                    <div
                      className="howto-text"
                      style={{ cursor: "pointer" }}
                      onClick={() => transition?.("/credits")}
                    >
                      {html2React(howto?.Finfish?.contentTwo)}
                    </div>
                  </div>
                </div>
                <div className="howto-body-right">
                  <div className="pointOuterWrapper">
                    <span className="pointCount">1</span>
                    <div className="pointWrapper">
                      <h6 className="pointTitle">
                        {howto?.Finfish?.pointOneTitle}
                      </h6>
                      <p className="pointDesc">
                        {howto?.Finfish?.pointOneDesc}
                      </p>
                      {Object.entries(howto?.Finfish?.sections).map(
                        ([section, c]: any) => {
                          const { principles, icon, color } = c;
                          return (
                            <HowToSection
                              key={section}
                              icon={icon}
                              name={Utils.capitalize(section)}
                              color={color}
                              lines={principles}
                            />
                          );
                        }
                      )}
                    </div>
                  </div>

                  <div className="pointOuterWrapper pointWrapperMargin">
                    <span className="pointCount">2</span>
                    <div className="pointWrapper">
                      <h6 className="pointTitle">
                        {howto?.Finfish?.pointTwoTitle}
                      </h6>
                      <p className="pointDesc">
                        {howto?.Finfish?.pointTwoDesc}
                      </p>
                    </div>
                  </div>
                  <div className="howto-footer-right fsFooter">
                    <div>
                      {backButton ? (
                        <Button
                          text="Go Back"
                          onClick={() => {
                            sessionStorage.removeItem("howto-history-back");
                            localTransition?.(() => history?.goBack());
                          }}
                        />
                      ) : (
                        <NavButton text="Next" route="/regions" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </appContext.Consumer>
    );
  }
}

HowTo.contextType = appContext;
