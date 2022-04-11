import * as React from "react";
import { appContext } from "./core/AppContext";
import { Settings } from "./core/Settings";

import "./styles/infobutton.css";

interface IInfoButtonProps {
  ingredient?: boolean;
  section?: string;
}

export class InfoButton extends React.Component<IInfoButtonProps> {
  public render() {
    const { section } = this.props;
    return (
      <appContext.Consumer>
        {({ transition }) => {
          return (
            <button
              className={`info-button button-normal ${
                this.props.ingredient ? "inside" : ""
              }`}
              style={{
                border: `1px solid ${
                  section ? Settings.data.sections[section].color : "#0FBCC0"
                }`,
              }}
              onClick={() => {
                sessionStorage.setItem("howto-history-back", "true");
                transition?.("/howto");
              }}>
              <div>i</div>
            </button>
          );
        }}
      </appContext.Consumer>
    );
  }
}
