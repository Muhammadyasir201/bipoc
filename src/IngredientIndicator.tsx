import * as React from "react";
import { appContext } from "./core/AppContext";
import { Settings } from "./core/Settings";

import "./styles/ingredientindicator.css";

interface IIngredientIndicatorProps {
  section?: string;
}

export class IngredientIndicator extends React.Component<IIngredientIndicatorProps> {
  public render() {
    const { section } = this.props;
    return (
      <div
        className='ingredient-indicator'
        style={{
          border: `1px solid ${
            section ? Settings.data.sections[section].color : "#0FBCC0"
          }`,
          backgroundColor: "white",
        }}>
        {this.context.fish}
      </div>
    );
  }
}

IngredientIndicator.contextType = appContext;
