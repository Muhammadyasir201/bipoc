import * as React from "react";

import "./styles/sectionheader.css";

interface ISectionsHeaderProps {
  name: string;
  icons: string[];
  index: number;
  title?: string;
  text?: string;
  color: string;
  icon: string;
  principleNo?: string;
  cls?: string;
  titleCls?: string;
}

const questIconsObj = [0, 0, 0, 1, 1, 1, 1, 2, 2];

export class SectionHeader extends React.Component<ISectionsHeaderProps> {
  public render() {
    const {
      name,
      icons,
      index,
      title,
      text,
      color,
      icon,
      principleNo,
      cls,
      titleCls,
    } = this.props;

    return (
      <div className="section-header">
        <div className="section-icons">
          {/* <div className='section-main-icon' style={{ textAlign: "center" }}>
            <div>
              <img src={icon} />
            </div>
            <div className='section-name'>{name}</div>
          </div> */}
          {/* <div className="section-icons-separator">
            <div
              style={{
                backgroundColor: color,
              }}
            />
          </div> */}
          {icons.map((icon, i) => {
            return (
              <img
                key={i}
                src={icon}
                className={`section-icon ${
                  i === questIconsObj[index] ? "icon-normal" : "icon-grey"
                }`}
              />
            );
          })}
        </div>
        <div className={cls}>
          <div className="section-principle fsFooter">
            {principleNo && `Question ${principleNo}`}
          </div>
          <div className={`section-header-title fsSubtitle ${titleCls}`}>
            {title}
          </div>
          <div style={{ fontSize: "1vw" }} className="section-text">
            {text}
          </div>
        </div>
      </div>
    );
  }
}
