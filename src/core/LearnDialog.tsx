import * as React from "react";
import * as ReactDOM from "react-dom";

import "./styles/dialog.css";

interface IDialogProps {
  visible: boolean;
  title: string;
  content: JSX.Element;
  bgColor?: string;
  graph?: string;
  onClose: () => void;
}

export class LearnDialog extends React.Component<IDialogProps> {
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
          className='card dialog-in dialog-root1'
          onClick={(e) => e.stopPropagation()}>
          <div className='results-explainer-header'>
            <div className='fsSubtitle'>
              <p
                className='title has-text-color'
                style={{ color: "rgb(15, 188, 192)" }}>
                <strong>{this.props.title}</strong>
              </p>
            </div>
            <div className='fsFooter1'>{this.props.content}</div>
          </div>
          <div className='results-explainer-body'>
            <img
              src={this.props.graph}
              style={{ width: "87vw", height: "62vh" }}
            />
          </div>
          <div className='results-explainer-footer' onClick={close}>
            <button className='closeBtn'>Go Back</button>
          </div>
        </div>
      </div>,
      document.getElementById("dialog-layer") as HTMLElement
    );
  }
}
