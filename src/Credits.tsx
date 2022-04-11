import * as React from "react";
import { Background } from "./Background";
import { appContext } from "./core/AppContext";
import { Button } from "./core/Button";
import { credits } from "./data/data.json";

import "./styles/credits.css";
const { default: html2React } = require("html2react");

interface ICreditsTable {
  title: string;
  teams: JSX.Element[];
}

interface ICreditsContent {
  title: JSX.Element;
  subtitle: JSX.Element;
  content: JSX.Element;

  fact: ICreditsTable;
  gbb: ICreditsTable;
  reawakened: string;

  logoGBB: string;
  logoCC: string;
  footer: JSX.Element;
  bg: string;
}

export class Credits extends React.Component {
  public static content: ICreditsContent;

  public render() {
    const content = credits;
    return (
      <div className='credits'>
        <Background path={content.bg} />
        {/* <div className='credit-blackOverlay'></div> */}
        <div className='credits-header'>
          <div className='credits-title fsTitle'>{content.title}</div>
          <div className='credits-subtitle fsSubtitle'>{content.subtitle}</div>
          <div style={{ fontSize: "0.7rem" }}>{content.content}</div>
        </div>
        <div>
          <div className='credits-table fsFooter1'>
            {content.teams.map((t, i) => (
              <div key={i}>{html2React(t)}</div>
            ))}
          </div>
          <div className='credits-footer fsFooter1'>
            <div className='credits-footer-logos'>
              <img
                onClick={() => window.open("https://www.greenbrownblue.com/")}
                src={content.logo1}
              />
              <img
                onClick={() => window.open("https://www.thelexicon.org/")}
                src={content.logo2}
              />
            </div>
            <div>{content.reawakened1}</div>
            <div>{html2React(content.reawakened2)}</div>
          </div>
          <div className='credits-table-title'>{content.gbb.title}</div>
          <div className='credits-table fsFooter1'>
            <i>{content.gbbSubtitle}</i>
          </div>
          <div className='credits-table fsFooter1'>
            {content.gbb.teams.map((t, i) => (
              <div key={i}>{html2React(t)}</div>
            ))}
          </div>
        </div>
        <div className='public-domain-container'>
          <div className='credits-footer-logos'>
            <img
              onClick={() =>
                window.open(
                  "https://creativecommons.org/publicdomain/zero/1.0/"
                )
              }
              style={{ margin: 0 }}
              src={content.logoCC}
            />
          </div>
          <div className='footerText'>
            {html2React(content.footer)}
            <strong
              style={{ cursor: "pointer", fontSize: "0.7rem" }}
              onClick={() =>
                window.open(
                  "https://creativecommons.org/publicdomain/zero/1.0/"
                )
              }>
              Learn more about CC0 and fair use.
            </strong>
          </div>
        </div>
        <div className='credits-footer fsFooter1'>
          <div>
            <appContext.Consumer>
              {({ localTransition, history }) => {
                return (
                  <button
                    className='creditBtn'
                    onClick={() => {
                      localTransition?.(() => history?.goBack());
                    }}>
                    Go Back
                  </button>
                );
              }}
            </appContext.Consumer>
          </div>
        </div>
      </div>
    );
  }
}
