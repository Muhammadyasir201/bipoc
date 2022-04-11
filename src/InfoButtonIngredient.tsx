import * as React from "react";
import { InfoButton } from "./InfoButton";
import { IngredientIndicator } from "./IngredientIndicator";

interface IInfoButtonIngredientProps {
  section?: string;
}

export class InfoButtonIngredient extends React.Component<IInfoButtonIngredientProps> {
  public render() {
    return (
      <React.Fragment>
        <InfoButton section={this.props.section} ingredient={true} />
        <IngredientIndicator section={this.props.section} />
      </React.Fragment>
    );
  }
}
