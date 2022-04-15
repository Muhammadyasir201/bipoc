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
          {icons &&
            Object.keys(icons).map((key: any, index: any) => {
              return (
                <img
                  key={`${key}-${index}`}
                  src={icons[key]}
                  className={`section-icon ${key !== name && "icon-grey"}`}
                />
              );
            })}
          ;
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
