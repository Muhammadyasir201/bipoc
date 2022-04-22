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
      <div className="credits">
        <Background path={content.bg} />
        {/* <div className='credit-blackOverlay'></div> */}
        <div className="credits-header">
          <div className="credits-title fsTitle">{content.title}</div>
          <div className="credits-subtitle fsSubtitle">{content.subtitle}</div>
          <div className="content">{content.content}</div>
          <div className="infoText">
            {content.infoText}
            <a href={`mailto:${content.infoEmail}`}>{content.infoEmail}</a>
          </div>
        </div>

        <div className="createdByWrap">
          <div className="teamTitle">created by</div>
          <div className="teamName">{html2React(content.createdBy)}</div>
        </div>
        <div>
          <div style={{ marginTop: "5vh" }}>
            <div className="teamTitle">the lexicon team</div>
            <div className="credits-table fsFooter1">
              {content.teams.map((t, i) => (
                <div className="teamName" key={i}>
                  {html2React(t)}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "5vh" }}>
            <div className="teamTitle">advisory board</div>
            <div className="teamName">{html2React(content.advisoryBoard)}</div>
          </div>

          <div className="credits-footer fsFooter1">
            <div>
              <appContext.Consumer>
                {({ localTransition, history }) => {
                  return (
                    <button
                      className="creditBtn"
                      onClick={() => {
                        localTransition?.(() => history?.goBack());
                      }}
                    >
                      Go Back
                    </button>
                  );
                }}
              </appContext.Consumer>
            </div>
          </div>
        </div>
        <div className="public-domain-container">
          <div className="credits-footer-logos">
            <img
              onClick={() =>
                window.open(
                  "https://creativecommons.org/licenses/by-nc-sa/3.0/igo"
                )
              }
              style={{ margin: 0 }}
              src={content.logoCC}
            />
          </div>
          <div className="footerText">
            {content.footer}
            <span
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                marginLeft: "3px",
              }}
              onClick={() =>
                window.open(
                  "https://creativecommons.org/licenses/by-nc-sa/3.0/igo/"
                )
              }
            >
              Learn more here
            </span>
          </div>
        </div>
      </div>
    );
  }
}
