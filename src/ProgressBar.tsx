import * as React from "react";
import { appContext } from "./core/AppContext";
import { Button } from "./core/Button";
import { Settings } from "./core/Settings";
import { NavButton } from "./NavButton";
import { sections } from "./data/data.json";

import "./styles/progressbar.css";

interface IProgressBarProps {
  nextRoute?: string;
  disableNext?: boolean;
  onNext?: () => void;
  section?: string;
  className?: string;
  progress?: number;
}

export class ProgressBar extends React.Component<IProgressBarProps> {
  public static get assets() {
    return {
      iconHome: "/public/images/icon-home.svg",
    };
  }

  public render() {
    const { nextRoute, disableNext, onNext, section, className, progress } =
      this.props;
    const progressDotsLength: any = sections;

    const _nextRoute =
      nextRoute == "/section/planet/0" || typeof nextRoute == "undefined"
        ? "/section/planet/1"
        : nextRoute;

    return (
      <appContext.Consumer>
        {({ transition, fish }) => {
          return (
            <div className={`progress-bar ${className ?? ""}`}>
              <div>
                <button
                  className="icon-button"
                  onClick={() => transition?.("/welcome")}
                >
                  <img
                    src={ProgressBar.assets.iconHome}
                    style={{ height: "4vh" }}
                  />
                </button>
              </div>
              <div style={{ flex: 1, marginLeft: 10 }}>
                {Array.from(Array(Number(progressDotsLength[fish])).keys()).map(
                  (i) => {
                    const active = i == progress;
                    return (
                      <span
                        key={i}
                        className={`progress-dot ${active ? "active" : ""}`}
                        style={{
                          backgroundColor:
                            section && active
                              ? Settings.data.sections[section].color
                              : undefined,
                        }}
                      />
                    );
                  }
                )}
              </div>
              <div>
                {onNext ? (
                  <Button text="Next" onClick={onNext} disabled={disableNext} />
                ) : (
                  <NavButton
                    text="Next"
                    route={_nextRoute as string}
                    disabled={disableNext}
                  />
                )}
              </div>
            </div>
          );
        }}
      </appContext.Consumer>
    );
  }
}
