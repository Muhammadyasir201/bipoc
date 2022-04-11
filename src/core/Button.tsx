import * as React from "react";

import "./styles/button.css";

export enum ButtonType {
  Normal,
  Orange,
  Blue,
}

interface IButtonProps {
  text: string | JSX.Element | undefined;
  type?: ButtonType;
  onClick: () => void;
  disabled?: boolean;
}

export class Button extends React.Component<IButtonProps> {
  public render() {
    const { text, type, onClick, disabled } = this.props;
    const _type = type ?? ButtonType.Normal;
    const _disabled = disabled ?? false;
    const buttonClass = ["button-normal", "button-orange", "button-blue"][
      _type
    ];
    return (
      <button
        className={`${buttonClass} ${_disabled ? "disabled" : ""}`}
        onClick={onClick}>
        <div>{text}</div>
      </button>
    );
  }
}
