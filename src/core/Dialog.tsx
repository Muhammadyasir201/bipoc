import * as React from "react";
import * as ReactDOM from "react-dom";

import "./styles/dialog.css";

interface IDialogProps {
  visible: boolean;
  title: string;
  learn?: string;
  link?: string;
  content: JSX.Element;
  bgColor?: string;
  onClose: () => void;
}

export class Dialog extends React.Component<IDialogProps> {
  private _root!: HTMLElement;

  public render() {
    if (!this.props.visible) {
      return null;
    }

    const close = () => {
      this._root.classList.replace("dialog-in", "dialog-out");
      setTimeout(this.props.onClose, 300);
    };

    return ReactDOM.createPortal(
      <div
        className='dialog-backdrop fill-parent'
        style={{
          backgroundColor: this.props.bgColor ?? "rgba(20, 20, 20, .75)",
        }}
        onClick={close}>
        <div
          ref={(e) => (this._root = e as HTMLElement)}
          className='card dialog-in dialog-root'
          onClick={(e) => e.stopPropagation()}>
          <div className='dialog-title'>{this.props.title}</div>
          <div>{this.props.content}</div>
          <div
            onClick={() => {
              window.open(this.props.link);
            }}
            style={{
              color: "#0fbcc0",
              fontSize: "1.3vmax",
              cursor: "pointer",
              marginTop: "2vh",
            }}>
            {this.props.learn}
          </div>
          <div className='clickable dialog-close' onClick={close}>
            <button className='closeBtn'>close</button>
          </div>
        </div>
      </div>,
      document.getElementById("dialog-layer") as HTMLElement
    );
  }
}
