import * as React from "react";
import "./styles/panel.css";

interface IPanelProps {
  body: JSX.Element;
  footer: JSX.Element;
  className: string;
}

export class Panel extends React.Component<IPanelProps> {
  public render() {
    const { body, footer, className } = this.props;

    return (
      <div className={`panel card ${className}`}>
        <div className={`panel-body ${className}-body`}>{body}</div>
        <div className={`${className}-footer`}>{footer}</div>
      </div>
    );
  }
}
