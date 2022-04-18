import { yellow } from "@material-ui/core/colors";
import * as React from "react";
import { Background } from "./Background";
import { Categories } from "./Categories";
import { appContext } from "./core/AppContext";
import { Button, ButtonType } from "./core/Button";
import { DOMUtils } from "./core/DOMUtils";
import { Images } from "./core/Images";
import { LoadingIndicator } from "./core/LoadingIndicator";
import { Settings } from "./core/Settings";
import { IngredientIndicator } from "./IngredientIndicator";
import { IPostJson } from "./Posts";
import { ActionCardSvg } from "./results/ActionCardSvg";
import { ScoreBarSvg } from "./results/ScoreBarSvg";
import { ResultsExplainer } from "./ResultsExplainer";
import { IResultsIntroContent, ResultsIntro } from "./ResultsIntro";
import { Section } from "./Section";
import { Session } from "./Session";
import { result } from "./data/data.json";
import json from "./data/result.json";
import { LearnDialog } from "./core/LearnDialog";

// tslint:disable-next-line
const { default: html2React } = require("html2react");

import "./styles/results.css";

interface IResultsState {
  loaded: boolean;
  intro: boolean;
  explainer: boolean;
}

interface IResultsContent {
  intro: IResultsIntroContent;
  main: {
    title: JSX.Element;
    subTitle: string;
    learn: JSX.Element;
    learnTeam: JSX.Element;
    download: JSX.Element;
    replay: string;
    legend: string[];
  };
  explainer: {
    title: JSX.Element;
    content: JSX.Element;
    graph: string;
  };
}

export class Results extends React.Component<{}, IResultsState> {
  private static _content: IResultsContent;
  private static _content1: IResultsContent;

  private _canvas!: HTMLCanvasElement;
  private _actionCards: { [section: string]: ActionCardSvg[] };
  private _legends: SVGElement[] = [];

  constructor(props: {}) {
    super(props);
    this.state = {
      loaded: true,
      intro: true, // true
      explainer: false, // false
    };

    this._actionCards = {
      planet: [],
      people: [],
      "Supply Chain": [],
    };
  }

  public componentDidMount() {
    this.load();
    this.onResize = this.onResize.bind(this);
    window.addEventListener("resize", this.onResize);
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  public componentDidUpdate() {
    this.tryDrawCanvas();
  }

  public render() {
    if (!this.state.loaded) {
      return <LoadingIndicator />;
    }

    const _content = result;

    if (this.state.intro) {
      return (
        <ResultsIntro
          answers={Session.answers}
          onNext={() => this.setState({ intro: false })}
        />
      );
    }

    // if (this.state.explainer) {
    //   return (
    //     <ResultsExplainer
    //       title={_content.explainer.title}
    //       content={_content.explainer.content}
    //       graph={_content.explainer.graph}
    //       onBack={() => this.setState({ explainer: false })}
    //     />
    //   );
    // }

    const svg = { w: 1062, h: 390 };
    const layout = {
      bar: { x: 17, y: 200 },
      actionCard: { y: 219 },
      legend: { x: 950, w: 140, h: 67 },
      grid: { y: 7, w: 937, spacing: 63 },
    };

    const makeSection = (section: string, x: number) => {
      const principles = Section.getPrinciples(section, this.context.fish);
      const getScore = (principle: number) => {
        const answers = Session.answers?.[section];
        const answer = answers?.[principle];
        const practices = answer?.practices as boolean[];
        const visibility = answer?.visibility as number;
        const usedPractices = practices.filter((p) => p).length;
        const maxPracticesScore = practices.length * 0.2;
        const practicesScore = usedPractices * 0.2;
        const visibilityScore = visibility > 0.5 ? 1 : 0;
        const maxVisibilityScore = 1;
        const maxScore = maxPracticesScore + maxVisibilityScore;
        const score = Math.max(
          practicesScore + visibilityScore,
          maxScore * 0.05
        ); // bias to ensure bar is non-zero
        const scoreNormalized = score / maxScore;
        return scoreNormalized;
      };
      return principles.map((p: any, i: any) => {
        const color = Settings.data.sections[section].color;
        return (
          <React.Fragment key={`${section}_${i}`}>
            <ScoreBarSvg
              color={color}
              score={getScore(i)}
              x={x + layout.bar.x + i * 96}
              y={layout.bar.y}
            />
            <ActionCardSvg
              ref={(e) => (this._actionCards[section][i] = e as ActionCardSvg)}
              x={x + i * 96}
              y={layout.actionCard.y}
              color={"#686a65"}
              onClick={() => {
                window.open(p.actionCard);
              }}
            />
          </React.Fragment>
        );
      });
    };

    const makeLegend = (index: number) => {
      return (
        <rect
          ref={(e) => (this._legends[index] = e as SVGElement)}
          x={layout.legend.x}
          y={layout.legend.h * index}
          width={layout.legend.w}
          height={layout.legend.h}
          fill="transparent"
        />
      );
    };

    const makeLine = (index: number) => {
      const y = layout.grid.y + layout.grid.spacing * index;
      return <line x1={0} x2={layout.grid.w} y1={y} y2={y} />;
    };

    return (
      <appContext.Consumer>
        {({ transition, localTransition }) => {
          return (
            <React.Fragment>
              <LearnDialog
                graph={_content.explainer.graph}
                visible={this.state.explainer}
                title={_content.explainer.title}
                bgColor="rgba(62, 137, 251, 0.75)"
                content={html2React(_content.explainer.content)}
                onClose={() => this.setState({ explainer: false })}
              />
              <div className="results">
                {/* <IngredientIndicator /> */}
                <div className="results-header">
                  <div className="fsSubtitle">
                    <p
                      className="title has-text-color"
                      style={{ color: "rgb(15, 188, 192)", fontWeight: 500 }}
                    >
                      {_content.title}
                    </p>
                  </div>
                  <div style={{ maxWidth: 836 }}>{_content.subTitle}</div>
                  {/* <div
                    className="clickable"
                    onClick={() => {
                      this.setState({ explainer: true });
                    }}
                  >
                    <p
                      className="results-learn has-text-color"
                      style={{ color: "rgb(15, 188, 192)" }}
                    >
                      {_content.learn}
                    </p>
                  </div> */}
                </div>
                <div className="results-body">
                  <svg
                    className="fill-parent"
                    viewBox={`0 0 ${svg.w} ${svg.h}`}
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {makeLine(0)}
                    {makeLine(1)}
                    {makeLine(2)}
                    {makeSection("planet", 2)}
                    {this.context.fish === "Seaweed"
                      ? makeSection("people", 96 * 4)
                      : makeSection("people", 96 * 3)}
                    {makeSection("Supply Chain", 96 * 7)}
                    <line
                      className="baseline"
                      x1={0}
                      x2={layout.grid.w}
                      y1={200}
                      y2={200}
                    />
                    {makeLegend(0)}
                    {makeLegend(1)}
                    {makeLegend(2)}
                  </svg>
                </div>
                <canvas
                  className="fill-parent"
                  ref={(e) => (this._canvas = e as HTMLCanvasElement)}
                />
                <div className="results-footer">
                  <div>
                    <span className="download">
                      <Button
                        type={ButtonType.Blue}
                        text={html2React(_content.download)}
                        onClick={() => {
                          window.open(_content.allActionCards);
                        }}
                      />
                    </span>
                    <span className="replay">
                      <Button
                        text={_content.replay}
                        onClick={() => {
                          Session.clear();
                          transition?.("/intro");
                        }}
                      />
                    </span>
                  </div>
                  <div
                    className="clickable fsFooter"
                    onClick={() => {
                      transition?.("/credits");
                    }}
                  >
                    <p
                      className="learn-team has-text-color"
                      style={{ color: "rgb(15, 188, 192)" }}
                    >
                      {html2React(_content.learnTeam)}
                    </p>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </appContext.Consumer>
    );
  }

  private async load() {
    // if (Results._content) {
    //   this.setState({ loaded: true });
    //   return;
    // }

    // const categoryId = Categories.get("results").id;
    // const request = `wp-json/wp/v2/posts?categories=${categoryId}`;
    // const response = await fetch(`${Settings.data.wordpressUrl}/${request}`);

    const rawIntro = json.find((j) => j.slug === "results-intro") as IPostJson;
    const introTree = new DOMParser().parseFromString(
      rawIntro.content.rendered,
      "text/html"
    );

    const rawResults = json.find((j) => j.slug === "results") as IPostJson;
    const resultsTree = new DOMParser().parseFromString(
      rawResults.content.rendered,
      "text/html"
    );

    const rawExplained = json.find(
      (j) => j.slug === "results-explained"
    ) as IPostJson;
    const explainerTree = new DOMParser().parseFromString(
      rawExplained.content.rendered,
      "text/html"
    );

    const content: IResultsContent = {
      intro: {
        bg: (introTree.body.querySelector("figure > img") as HTMLImageElement)
          .src,
        title: (introTree.body.querySelector(".title") as HTMLParagraphElement)
          .innerText,
        text: introTree.body.querySelector("h2")?.innerText as string,
        footer: (
          introTree.body.querySelector(".footer") as HTMLParagraphElement
        ).innerText,
      },
      main: {
        title: html2React(resultsTree.body.querySelector(".title")?.outerHTML),
        subTitle: html2React(
          resultsTree.body.querySelector(".subtitle")?.innerHTML
        ),
        learn: html2React(
          resultsTree.body.querySelector(".results-learn")?.outerHTML
        ),
        download: html2React(
          resultsTree.body.querySelector(".download")?.innerHTML
        ),
        replay: html2React(
          resultsTree.body.querySelector(".replay")?.innerHTML
        ),
        legend: DOMUtils.select(resultsTree.body, "td").map(
          (td) => td.innerText
        ),
        learnTeam: html2React(
          resultsTree.body.querySelector(".learn-team")?.outerHTML
        ),
      },
      explainer: {
        title: html2React(
          explainerTree.body.querySelector(".title")?.outerHTML
        ),
        content: html2React(
          explainerTree.body.querySelector(".content")?.innerHTML
        ),
        graph: (
          explainerTree.body.querySelector("figure > img") as HTMLImageElement
        ).src,
      },
    };

    // await Images.preload([content.intro.bg, content.explainer.graph]);

    Results._content1 = content;
    this.setState({ loaded: true });
  }

  private onResize() {
    this.tryDrawCanvas();
  }

  private tryDrawCanvas() {
    if (!this._canvas) {
      return;
    }
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;
    // NOTE use setTimeout if you see drawing offset again!
    const context = this._canvas.getContext("2d") as CanvasRenderingContext2D;
    const dummyCard = this._actionCards.planet[0];
    const maxTextSize = { w: 98, h: 78 };
    const font = `${(dummyCard.text.width * 10) / maxTextSize.w}px Work Sans`;
    const lineHeight = (dummyCard.text.height * 13) / maxTextSize.h;
    context.font = font;
    context.fillStyle = "black";

    context.clearRect(0, 0, this._canvas.width, this._canvas.height);

    const drawText = (
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      maxHeight: number,
      center: boolean
    ) => {
      const getLines = () => {
        const lines: string[] = [];
        const words = text.split(" ");
        let line = "";
        let height = 0;
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + " ";
          const metrics = context.measureText(testLine);
          const testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            height += lineHeight;
            if (height + lineHeight > maxHeight) {
              return [...lines, "..."];
            }
            line = words[n] + " ";
          } else {
            line = testLine;
          }
        }
        lines.push(line);
        return lines;
      };
      const finalLines = getLines();
      const halfLine = Math.ceil(lineHeight / 2);
      for (let j = 0; j < finalLines.length; ++j) {
        let lineX = 0;
        if (center) {
          lineX = (maxWidth - context.measureText(finalLines[j]).width) / 2;
        }
        context.fillText(
          finalLines[j],
          x + lineX,
          y + j * lineHeight + halfLine
        );
      }
    };

    const drawSection = (section: string) => {
      Section.getPrinciples(section, this.context.fish).forEach(
        (p: any, i: any) => {
          const { icon, text } = this._actionCards[section][i];
          var imageObj1 = new Image();
          imageObj1.src = p.resultIcon;
          imageObj1.onload = function () {
            context.drawImage(
              imageObj1,
              icon.left,
              icon.top,
              icon.width,
              icon.height
            );
          };
          drawText(
            p.resultTitle,
            text.left,
            text.top,
            text.width,
            text.height,
            true
          );
        }
      );
    };
    drawSection("planet");
    drawSection("people");
    drawSection("Supply Chain");

    Results._content1.main.legend.forEach((legend, i) => {
      const { left, top, width, height } =
        this._legends[i].getBoundingClientRect();
      drawText(legend, left, top, width, height, false);
    });
  }
}

Results.contextType = appContext;
