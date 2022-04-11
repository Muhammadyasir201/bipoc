import * as React from "react";
import { Button, ButtonType } from "./core/Button";
import { appContext } from "./core/AppContext";

interface INavButton {
  text: string | undefined;
  type?: ButtonType;
  route: string;
  disabled?: boolean;
}

export class NavButton extends React.Component<INavButton> {
  public render() {
    const { text, type, route, disabled } = this.props;
    return (
      <appContext.Consumer>
        {({ transition }) => {
          return (
            <Button
              text={text}
              type={type}
              onClick={() => {
                transition?.(route);
              }}
              disabled={disabled}
            />
          );
        }}
      </appContext.Consumer>
    );
  }
}
