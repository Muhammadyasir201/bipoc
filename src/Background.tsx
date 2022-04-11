import * as React from "react";

import "./styles/background.css";

interface IBackgroundProps {
  path: string | undefined;
  cls?: string | undefined;
}

export class Background extends React.Component<IBackgroundProps> {
  private _bgImage!: HTMLImageElement;

  public componentDidMount() {
    this.onResize = this.onResize.bind(this);
    window.addEventListener("resize", this.onResize);
    this.onResize();
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  public render() {
    const { path, cls } = this.props;
    return (
      <div className={`fill-parent background ${cls}`}>
        <img ref={(e) => (this._bgImage = e as HTMLImageElement)} src={path} />
      </div>
    );
  }

  private onResize() {
    const bg = this._bgImage;
    const bgW = 1920;
    const bgH = 1080;
    const windowRatio = window.innerWidth / window.innerHeight;
    const bgRatio = bgW / bgH;
    let bgX = 0;
    let bgY = 0;
    if (bgRatio > windowRatio) {
      bg.height = window.innerHeight;
      bg.width = window.innerHeight * bgRatio;
      bgX = -(bg.width - window.innerWidth) / 2;
    } else {
      bg.width = window.innerWidth;
      bg.height = window.innerWidth / bgRatio;
      bgY = -(bg.height - window.innerHeight) / 2;
    }

    this._bgImage.style.transform = `translate(${bgX}px, ${bgY}px)`;
  }
}
