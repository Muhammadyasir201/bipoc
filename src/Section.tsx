import * as React from "react";
import { Background } from "./Background";
import { Categories } from "./Categories";
import { appContext } from "./core/AppContext";
import { Dialog } from "./core/Dialog";
import { DOMUtils } from "./core/DOMUtils";
import { Images } from "./core/Images";
import { LoadingIndicator } from "./core/LoadingIndicator";
import { Settings } from "./core/Settings";
import { HowTo } from "./howto/HowTo";
import { InfoButtonIngredient } from "./InfoButtonIngredient";
import { Panel } from "./Panel";
import { IPostJson } from "./Posts";
import { ProgressBar } from "./ProgressBar";
import { Question } from "./Question";
import { SectionHeader } from "./SectionHeader";
import { SectionIntro } from "./SectionIntro";
import { Session } from "./Session";
import { Slider } from "./Slider";
import { section as mySection } from "./data/data.json";

import "./styles/section.css";

// tslint:disable-next-line
const { default: html2React } = require("html2react");

interface ISectionsProps {
  section: string;
  index: number;
}

interface IPrincipleContent {
  icon: string;
  title: string;
  text: string;
  question: string;
  practices: string[];
  footer: JSX.Element;
  bg: string;
  actionCard: string;
}

interface ISectionContent {
  title: string;
  icon: string;
  principles: IPrincipleContent[];
}

interface ISectionsContent {
  sections: {
    [section: string]: ISectionContent;
  };
  dialog: {
    title: string;
    content: JSX.Element;
    iconClose: string;
  };
}

interface ISectionState {
  loaded: boolean;
  practices: boolean[];
  visibility: number;
  dialogVisible: boolean;
}

export class Section extends React.Component<ISectionsProps, ISectionState> {
  public static content: any = mySection;

  public static getPrinciples(section: string, fish: string) {
    return Section.content[fish][section].principles;
  }

  public static getIcon(section: string) {
    return Section.content.sections[section].icon;
  }

  public static tempSetContent(section: string, content: ISectionContent) {
    Section.content.sections[section] = content;
  }

  constructor(props: ISectionsProps) {
    super(props);
    this.state = {
      loaded: false,
      practices: [],
      visibility: 0.5,
      dialogVisible: false,
    };
  }

  public componentDidMount() {
    this.load(this.props)
      .then(() => this.initPractices(this.props))
      .then(() => this.setState({ loaded: true }));
  }

  public UNSAFE_componentWillReceiveProps(nextProps: ISectionsProps) {
    if (nextProps.section !== this.props.section) {
      this.setState({ loaded: false });
      this.load(nextProps)
        .then(() => this.initPractices(nextProps))
        .then(() => this.setState({ loaded: true }));
    } else if (nextProps.index !== this.props.index) {
      this.initPractices(nextProps);
    }
  }

  public render() {
    if (!this.state.loaded) {
      return <LoadingIndicator />;
    }

    const { section, index } = this.props;
    const content = Section.content[this.context.fish][section];
    const dialogContent = Section.content.dialog;

    // const { section, index } = this.props;
    // const content = Section.content.sections[section];
    // const dialogContent = Section.content.dialog;

    if (index === 0) {
      return (
        <SectionIntro
          section={section}
          icon={content.introIcon}
          text={content.title}
          principles={content.sectionIntroHeadings}
          color={content.color}
        />
      );
    }

    const principleIndex = index - 1;
    const { color } = content;
    const subContent = content.principles[principleIndex];
    const icons = content.principles.map((s: any) => s.icon);

    if (this.context.fish === "Shellfish" && subContent.principleNo === "5") {
      return (
        <div>
          <Background path={subContent.bg} />
          <InfoButtonIngredient section={section} />
          <SectionHeader
            name={section}
            index={principleIndex}
            color={color}
            icons={icons}
            icon={content.icon}
          />
          <div
            style={{
              width: "39vw",
              margin: "0 auto",
              backgroundColor: "#fff",
              padding: "4vw",
            }}
          >
            <div className="section-principle fsFooter">Principle No. 5</div>
            <div className={`section-header-title fsSubtitle`}>
              {subContent.resultTitle}
            </div>
            <div style={{ fontSize: "1vw" }} className="section-text">
              {html2React(subContent.text)}
            </div>
          </div>
          <appContext.Consumer>
            {({ transition }) => {
              return (
                <React.Fragment>
                  <ProgressBar
                    className="progress-bar-inline-shellfish-5"
                    progress={subContent.progress}
                    section={section}
                    onNext={() => {
                      this.recordAnswer(
                        this.state.visibility,
                        this.state.practices
                      );
                      if (principleIndex + 1 < content.principles.length) {
                        transition?.(`/section/${section}/${index + 1}`);
                      } else {
                        const sections = Object.keys(Settings.data.sections);
                        const sectionIndex = sections.indexOf(section);
                        if (sectionIndex + 1 < sections.length) {
                          const nextSection = sections[sectionIndex + 1];
                          transition?.(`/section/${nextSection}/0`);
                        } else {
                          transition?.("/certifications");
                        }
                      }
                    }}
                  />
                </React.Fragment>
              );
            }}
          </appContext.Consumer>
        </div>
      );
    }

    return (
      <>
        <Background path={subContent.bg} cls={"section-overlay"} />
        <InfoButtonIngredient section={section} />
        <SectionHeader
          name={section}
          index={principleIndex}
          color={color}
          icons={icons}
          icon={content.icon}
          title={subContent.resultTitle}
          text={html2React(subContent.text)}
          principleNo={subContent.principleNo}
          cls={subContent.cls}
          titleCls={subContent.titleCls}
        />
        <Panel
          className="section"
          body={
            <React.Fragment>
              <div className="section-title">{subContent.question}</div>
              <Slider
                value={this.state.visibility}
                color={color}
                onChange={(visibility) => {
                  this.setState({ visibility });
                  this.recordAnswer(visibility, this.state.practices);
                }}
              />
              <div className="section-title">Check all that apply:</div>
              {subContent.practices.map((question: any, i: any) => {
                return (
                  <Question
                    key={i}
                    text={question}
                    color={color}
                    checked={this.state.practices[i]}
                    onChecked={(checked) => {
                      const practices = [...this.state.practices];
                      practices[i] = checked;
                      this.setState({ practices });
                      this.recordAnswer(this.state.visibility, practices);
                    }}
                  />
                );
              })}
            </React.Fragment>
          }
          footer={
            <appContext.Consumer>
              {({ transition }) => {
                return (
                  <React.Fragment>
                    <ProgressBar
                      className="progress-bar-inline"
                      progress={subContent.progress}
                      section={section}
                      onNext={() => {
                        this.recordAnswer(
                          this.state.visibility,
                          this.state.practices
                        );
                        if (principleIndex + 1 < content.principles.length) {
                          transition?.(`/section/${section}/${index + 1}`);
                        } else {
                          const sections = Object.keys(Settings.data.sections);
                          const sectionIndex = sections.indexOf(section);
                          if (sectionIndex + 1 < sections.length) {
                            const nextSection = sections[sectionIndex + 1];
                            transition?.(`/section/${nextSection}/0`);
                          } else {
                            transition?.("/certifications");
                          }
                        }
                      }}
                    />
                  </React.Fragment>
                );
              }}
            </appContext.Consumer>
          }
        />
        <Dialog
          visible={this.state.dialogVisible}
          title={dialogContent.title}
          content={html2React(dialogContent.content)}
          bgColor="rgba(62, 137, 251, 0.75)"
          onClose={() => this.setState({ dialogVisible: false })}
        />
        {this.props.section === "planet" &&
          this.props.index === 1 &&
          sessionStorage.getItem("show-help-dialog") && (
            <div
              className="section-click"
              onClick={() => {
                sessionStorage.removeItem("show-help-dialog");
                this.setState({
                  dialogVisible: true,
                });
              }}
            />
          )}
      </>
    );
  }

  private async load(props: ISectionsProps) {
    const { section } = props;
    if (props.section in mySection.Finfish) {
      return;
    }

    const categoryId = Categories.get(section).id;
    const request = `wp-json/wp/v2/posts?categories=${categoryId}`;
    const response = await fetch(`${Settings.data}/${request}`);
    const json: IPostJson[] = await response.json();

    const getPrincipleIndex = (slug: string) => {
      const [match, index] = slug.match(/[a-z-]+-([0-9]+)/) ?? [null, null];
      return index;
    };

    const rawPrinciples = json
      .filter((p) => getPrincipleIndex(p.slug) !== null)
      .sort((a, b) => {
        const aIndex = parseInt(getPrincipleIndex(a.slug) as string, 10);
        const bIndex = parseInt(getPrincipleIndex(b.slug) as string, 10);
        return aIndex - bIndex;
      });

    const mainPage = json.find((p) => p.slug === section) as IPostJson;

    const principles = rawPrinciples.map((rawPrinciple, i) => {
      const tree = new DOMParser().parseFromString(
        rawPrinciple.content.rendered,
        "text/html"
      ).body;
      return {
        title: HowTo.Finfish.sections[section].principles[i],
        icon: (tree.querySelector("div > figure > img") as HTMLImageElement)
          .src,
        practices: DOMUtils.select(tree, "li").map((p) => p.innerText),
        text: tree.querySelector("p")?.innerText as string,
        question: tree.querySelector("h3")?.innerText as string,
        footer: html2React(tree.querySelector("ul + p")?.innerHTML),
        bg: (tree.querySelector("p + figure > img") as HTMLImageElement).src,
        actionCard: (
          tree.querySelector(".action-card-link > a") as HTMLLinkElement
        )?.href as string,
      } as IPrincipleContent;
    });

    const mainTree = new DOMParser().parseFromString(
      mainPage.content.rendered,
      "text/html"
    ).body;
    const content: ISectionContent = {
      icon: (mainTree.querySelector("figure > img") as HTMLImageElement).src, // HowTo.content.sections[section].icon,
      title: mainTree.querySelector("h2")?.innerText as string,
      principles,
    };

    const images = [
      content.icon,
      ...principles.reduce((prev, cur) => {
        return [...prev, cur.bg, cur.icon];
      }, [] as string[]),
    ];

    await Images.preload(images);
    Section.content.sections[section] = content;
  }

  private initPractices(props: ISectionsProps) {
    const { section, index } = props;
    if (index === 0) {
      return;
    }
    const principleIndex = index - 1;
    const content = Section.content[this.context.fish][section];
    const subContent = content.principles[principleIndex];
    const principles = Session.answers?.[section]?.[principleIndex]; // try to init from previous answers
    this.setState({
      practices: principles?.practices ?? subContent.practices.map(() => false),
      visibility: principles?.visibility ?? 0.5,
    });
  }

  private recordAnswer(visibility: number, practices: boolean[]) {
    const { section, index } = this.props;
    Session.setAnswers(section, index - 1, visibility, practices);
  }
}

Section.contextType = appContext;
