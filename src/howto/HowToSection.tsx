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
      <div className='howtosection-container'>
        <div className='howtosection-left'>
          <div>
            <img src={icon} />
          </div>
          <div className='howtosection-name' style={{ color }}>
            {name}
          </div>
        </div>
        <div className='howtosection-right'>
          {lines.map((line, i) => {
            return (
              <div key={i} className='howtosection-line'>
                <div className='howtosection-line-left'>
                  <div
                    className='howtosection-dash'
                    style={{ backgroundColor: color }}
                  />
                </div>
                <div className='howtosection-line-right'>
                  {html2React(line)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
