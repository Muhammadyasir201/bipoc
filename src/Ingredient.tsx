import * as React from "react";
import { Background } from "./Background";
import { Categories } from "./Categories";
import { appContext } from "./core/AppContext";
import { DOMUtils } from "./core/DOMUtils";
import { Images } from "./core/Images";
import { LoadingIndicator } from "./core/LoadingIndicator";
import { Settings } from "./core/Settings";
import { InfoButton } from "./InfoButton";
import { Panel } from "./Panel";
import { IPostJson } from "./Posts";
import { ProgressBar } from "./ProgressBar";
import { IReawakenedContent, Reawakened25 } from "./Reawakened25";
import { Session } from "./Session";

import "./styles/ingredient.css";

// tslint:disable-next-line
const { default: html2React } = require("html2react");

interface IIngredientState {
  loaded: boolean;
  reawakened: boolean;
}

interface IIngredientContent {
  main: {
    title: string;
    content: JSX.Element;
    prompt: JSX.Element;
    footer: JSX.Element;
    bg: string;
  };

  reawakened: IReawakenedContent;
}

export class Ingredient extends React.Component<{}, IIngredientState> {
  private static _content: IIngredientContent;

  private _ingredient!: HTMLInputElement;

  constructor(props: {}) {
    super(props);

    this.state = {
      loaded: false,
      reawakened: false,
    };

    Session.clear();
  }

  public componentDidMount() {
    this.load();
  }

  public componentDidUpdate() {
    if (this._ingredient) {
      this._ingredient.focus();
    }
  }

  public render() {
    const { _content } = Ingredient;
    const { loaded, reawakened } = this.state;

    if (!loaded) {
      return <LoadingIndicator />;
    }

    if (reawakened) {
      return (
        <Reawakened25
          content={_content.reawakened}
          onBack={() => this.setState({ reawakened: false })}
        />
      );
    }

    return (
      <div>
        <Background path={_content.main.bg} />
        <InfoButton />
        <Panel
          className='ingredient'
          body={
            <React.Fragment>
              <div className='ingredient-title fsTitle'>
                {_content.main.title}
              </div>
              <div>{_content.main.content}</div>
            </React.Fragment>
          }
          footer={
            <React.Fragment>
              <div className='ingredient-footer-title'>
                {_content.main.prompt}
              </div>
              <div>
                <input
                  ref={(e) => (this._ingredient = e as HTMLInputElement)}
                  type='text'
                  value={Session.ingredient ?? ""}
                  onChange={(e) => {
                    Session.setIngredient(e.target.value);
                    this.forceUpdate();
                  }}
                />
              </div>
              <ProgressBar
                className='progress-bar-inline'
                disableNext={!Session.ingredient?.length}
                nextRoute='/regions'
              />
              <appContext.Consumer>
                {({ localTransition }) => {
                  return (
                    <div
                      className='clickable fsFooter'
                      onClick={() =>
                        localTransition?.(() =>
                          this.setState({ reawakened: true })
                        )
                      }>
                      {_content.main.footer}
                    </div>
                  );
                }}
              </appContext.Consumer>
            </React.Fragment>
          }
        />
      </div>
    );
  }

  private async load() {
    if (Ingredient._content) {
      this.setState({ loaded: true });
      return;
    }

    const categoryId = Categories.get("ingredient").id;
    const request = `wp-json/wp/v2/posts?categories=${categoryId}`;
    const response = await fetch(`${Settings.data.wordpressUrl}/${request}`);
    const json: IPostJson[] = await response.json();

    const mainJson = json.find((j) => j.slug === "ingredient") as IPostJson;
    const mainTree = new DOMParser().parseFromString(
      mainJson.content.rendered,
      "text/html"
    ).body;
    const mainContent = {
      title: mainTree.querySelector(".title")?.innerHTML as string,
      content: html2React(
        DOMUtils.select(mainTree, "p:not(.prompt):not(.footer)")
          .map((p) => p.innerHTML)
          .join("<br><br>")
      ),
      prompt: html2React(mainTree.querySelector(".prompt")?.innerHTML),
      footer: html2React(mainTree.querySelector(".footer")?.outerHTML),
      bg: (mainTree.querySelector(".bg > img") as HTMLImageElement).src,
    };

    const reawakenedJson = json.find(
      (j) => j.slug === "reawakened-25"
    ) as IPostJson;
    const reawakenedTree = new DOMParser().parseFromString(
      reawakenedJson.content.rendered,
      "text/html"
    ).body;
    const reawakenedContent: IReawakenedContent = {
      title: reawakenedTree.querySelector(".title")?.innerHTML as string,
      content: html2React(
        DOMUtils.select(reawakenedTree, ".content")
          .map((p) => p.innerHTML)
          .join("<br><br>")
      ),
      bg: (reawakenedTree.querySelector(".bg > img") as HTMLImageElement).src,
      logo: (reawakenedTree.querySelector(".logo > img") as HTMLImageElement)
        .src,
    };

    await Images.preload([
      mainContent.bg,
      reawakenedContent.bg,
      reawakenedContent.logo,
    ]);

    Ingredient._content = {
      main: mainContent,
      reawakened: reawakenedContent,
    };
    this.setState({ loaded: true });
  }
}
