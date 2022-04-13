import * as React from "react";
const { default: html2React } = require("html2react");

import "./styles/howtosection.css";

interface IHowToSectionProps {
  icon: string;
  name: string;
  color: string;
  lines: string[];
}

export class HowToSection extends React.Component<IHowToSectionProps> {
  public render() {
    const { icon, name, color, lines } = this.props;
    return (
      <div className="howtosection-container">
        <div className="howtosection-left">
          <img src={icon} />
        </div>
        <div className="howtosection-right">
          {lines.map((line, i) => {
            return (
              <div key={i} className="howtosection-line">
                {html2React(line)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
