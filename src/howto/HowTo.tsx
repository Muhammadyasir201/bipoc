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
  public static fish: any = howto;

  public render() {
    const backButton = Boolean(sessionStorage.getItem("howto-history-back"));
    const fish = HowTo.fish[this.context.fish];
    if (!fish) return <Redirect to='/intro' />;

    return (
      <appContext.Consumer>
        {({ localTransition, transition, history }) => {
          return (
            <div className='fill-parent howto'>
              <div className='howto-body'>
                <div className='howto-body-left backdrop' />
                <div className='howto-body-left'>
                  <img src={fish.icon} />
                  <div className='howto-title fsTitle'>{fish.title}</div>
                  <div className='howto-text'>{html2React(fish.content)}</div>
                </div>
                <div className='howto-body-right'>
                  <div>{html2React(fish.principlesDesc)}</div>
                  {Object.entries(fish.sections).map(([section, c]: any) => {
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
                  })}
                </div>
              </div>
              <div className='howto-footer'>
                <div className='howto-footer-left fsFooter'>
                  <span
                    className='clickable'
                    onClick={() => transition?.("/credits")}>
                    {fish.learnFact}
                  </span>
                </div>
                <div className='howto-footer-right fsFooter'>
                  <div>
                    {backButton ? (
                      <Button
                        text='Go Back'
                        onClick={() => {
                          sessionStorage.removeItem("howto-history-back");
                          localTransition?.(() => history?.goBack());
                        }}
                      />
                    ) : (
                      <NavButton text='Next' route='/regions' />
                    )}
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
