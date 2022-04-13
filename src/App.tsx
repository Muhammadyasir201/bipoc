import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { match } from "react-router";
import * as H from "history";

import "./styles/common.css";
import { LoadingIndicator } from "./core/LoadingIndicator";
import { Fonts } from "./core/Fonts";
import { appContext } from "./core/AppContext";
import { Settings } from "./core/Settings";
import { Transition } from "./core/Transition";

import { Intro } from "./Intro";
import { Welcome } from "./Welcome";
import { WelcomeTwo } from "./WelcomeTwo";
import { HowTo } from "./howto/HowTo";
import { Regions } from "./Regions";
import { Section } from "./Section";
import { Certifications } from "./Certifications";
import { Transparency } from "./Transparency";
import { Results } from "./Results";

import { Session } from "./Session";
import { Credits } from "./Credits";
import { Principles } from "./Principles";
import { Learn } from "./Learn";
import FishIngredient from "./FishIngredient";
import YouDidIt from "./YouDidIt";
import { section } from "./data/data.json";

interface IAppState {
  loaded: boolean;
  rotateScreenPrompt: boolean;
  fish: string;
}

export class App extends React.Component<{}, IAppState> {
  private _transition!: Transition;
  private _transitioning = false;

  constructor(props: {}) {
    super(props);
    this.state = {
      loaded: false,
      rotateScreenPrompt: false,
      fish: "",
    };

    Session.clear();
  }

  Finfish = () => {
    this.setState({
      fish: "Finfish",
    });
  };

  public componentDidMount() {
    Settings.load()
      .then(() => Fonts.preload())
      .then(() => {
        Session.read();
        this.setState({
          loaded: true,
        });
      })
      .catch((e) => {
        // tslint:disable-next-line
        console.error(e);
      });

    this.onResize = this.onResize.bind(this);
    window.addEventListener("resize", this.onResize);
    this.onResize();
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  public render() {
    if (!this.state.loaded) {
      return <LoadingIndicator />;
    }

    const transition = async (history: H.History, route: string) => {
      if (this._transitioning) {
        return;
      }
      this._transitioning = true;
      await this._transition.transition();
      history.push(route);
      this._transitioning = false;
    };

    const localTransition = async (onFadeOut: () => void) => {
      if (this._transitioning) {
        return;
      }
      this._transitioning = true;
      await this._transition.transition();
      onFadeOut();
      this._transitioning = false;
    };

    const makeRoute = (
      section: string,
      progress: number,
      makeElem: (m: match<any>) => JSX.Element
    ) => {
      return (
        <Route
          path={`/${section}`}
          exact={true}
          render={({ match: m, history }) => {
            if (
              ![
                "intro",
                "welcome",
                "welcome-2",
                "howto",
                "credits",
                "principles",
                "ingredient",
              ].includes(section)
            ) {
              if (!this.state.fish) {
                return <Redirect to="/intro" />;
              }
            }

            if (section === "results") {
              if (Object.keys(Session.answers ?? {}).length < 3) {
                return <Redirect to="/intro" />;
              }
            }

            const { Finfish } = this;
            const { fish } = this.state;

            return (
              <appContext.Provider
                value={{
                  transition: (route: string) => transition(history, route),
                  localTransition,
                  history,
                  progress,
                  Finfish,
                  fish,
                }}
              >
                {makeElem(m)}
              </appContext.Provider>
            );
          }}
        />
      );
    };

    return (
      <React.Fragment>
        <div
          className="fill-parent"
          style={{
            display: this.state.rotateScreenPrompt ? "none" : undefined,
          }}
        >
          <BrowserRouter>
            <Switch>
              {makeRoute("intro", 0, () => (
                <Intro />
              ))}
              {makeRoute("welcome", 0, () => (
                <Welcome />
              ))}
              {makeRoute("welcome-2", 0, () => (
                <WelcomeTwo />
              ))}

              {makeRoute("howto", 0, () => (
                <HowTo />
              ))}
              {makeRoute("credits", 0, () => (
                <Credits />
              ))}
              {makeRoute("principles", 0, () => (
                <Principles />
              ))}

              {makeRoute("ingredient", 0, () => (
                <FishIngredient />
              ))}
              {makeRoute("regions", 0, () => (
                <Regions />
              ))}
              {makeRoute("youdidit", 0, () => (
                <YouDidIt />
              ))}

              <Route
                path="/section/:category/:index"
                exact={true}
                render={({ match: m, history }) => {
                  if (!this.state.fish) {
                    return <Redirect to="/intro" />;
                  }

                  if (!Session.sourceRegion || !Session.destRegion) {
                    return <Redirect to="/regions" />;
                  }

                  const { category, index } = m.params;
                  const _index = parseInt(index, 10);
                  const progress =
                    Settings.data.sections[category].progress + _index;

                  const { Finfish } = this;
                  const { fish } = this.state;

                  return (
                    <appContext.Provider
                      value={{
                        transition: (route: string) =>
                          transition(history, route),
                        history,
                        progress,
                        localTransition,
                        Finfish,
                        fish,
                      }}
                    >
                      <Section section={category} index={_index} />
                    </appContext.Provider>
                  );
                }}
              />

              {makeRoute("learn/:category/:index", 0, (m) => (
                <Learn section={m.params.category} index={m.params.index} />
              ))}

              {makeRoute("certifications", 15, () => (
                <Certifications />
              ))}
              {makeRoute("transparency", 16, () => (
                <Transparency />
              ))}
              {makeRoute("results", 16, () => (
                <Results />
              ))}
              <Route render={() => <Redirect to="/intro" />} />
            </Switch>
          </BrowserRouter>
        </div>
        <div id="dialog-layer" />
        <Transition ref={(e) => (this._transition = e as Transition)} />
        <div
          className="rotate-prompt"
          style={{
            display: this.state.rotateScreenPrompt ? "grid" : "none",
          }}
        >
          <div>
            <div>
              <img src="/public/rotate-device.png" />
            </div>
            <div
              style={{
                color: "white",
                padding: "20px",
              }}
            >
              Please rotate your device
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  private onResize() {
    const [width, height] = [window.innerWidth, window.innerHeight];
    const isPortrait = height > width;
    if (isPortrait !== this.state.rotateScreenPrompt) {
      this.setState({ rotateScreenPrompt: isPortrait });
    }
  }
}
