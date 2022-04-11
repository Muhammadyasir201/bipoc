import * as React from "react";
import { appContext } from "./core/AppContext";
import { Settings } from "./core/Settings";
import { InfoButtonIngredient } from "./InfoButtonIngredient";
import { ProgressBar } from "./ProgressBar";
import { section as mySection } from "./data/data.json";
import "./styles/sectionintro.css";
import { Utils } from "./Utils";

interface IPrinciple {
  icon: string;
  title: string;
}

interface ISectionIntroProps {
  section: string;
  text: string;
  icon: string;
  principles: IPrinciple[];
  color: string;
}

export class SectionIntro extends React.Component<ISectionIntroProps> {
  public componentDidMount() {
    if (this.props.section === "planet") {
      sessionStorage.setItem("show-help-dialog", "true");
    }
  }

  public render() {
    const { section, text, icon, principles, color } = this.props;

    const makePrinciple = (principle: IPrinciple) => {
      return (
        <div className='section-intro-icon-container'>
          <div>
            <img src={principle.icon} />
          </div>
          <div>{principle.title}</div>
        </div>
      );
    };

    return (
      <React.Fragment>
        <InfoButtonIngredient section={section} />
        <div className='section-intro'>
          <div
            className='section-intro-left'
            style={{ backgroundColor: color }}>
            <img src={icon} />
            <div className='section-intro-left-footer'>
              <div className='title'>{Utils.capitalize(section)}</div>
              <div className='subtitle'>{text}</div>
            </div>
          </div>
          <div className='section-intro-right'>
            <div className='section-intro-icons-container'>
              <div className='section-intro-icons'>
                {makePrinciple(principles[0])}
                {principles.length > 1 && makePrinciple(principles[1])}
              </div>
              <div className='section-intro-icons'>
                {principles.length > 2 && makePrinciple(principles[2])}
                {principles.length > 3 && makePrinciple(principles[3])}
                {principles.length > 4 && makePrinciple(principles[4])}
              </div>
            </div>
          </div>
          <div className='section-intro-footer'>
            <ProgressBar
              nextRoute={`/section/${section}/1`}
              section={section}
              progress={mySection[this.context.fish][section].progress}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

SectionIntro.contextType = appContext;
