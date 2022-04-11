import * as React from "react";

import "./styles/actioncardsvg.css";

interface IActionCardSvgProps {
  x: number;
  y: number;
  color: string;
  onClick: () => void;
}

export class ActionCardSvg extends React.Component<IActionCardSvgProps> {
  public get icon() {
    return this._icon.getBoundingClientRect();
  }
  public get text() {
    return this._text.getBoundingClientRect();
  }

  private _icon!: SVGElement;
  private _text!: SVGElement;

  public render() {
    const { x, y, color, onClick } = this.props;
    return (
      <g
        className='actioncard'
        transform={`translate(${x}, ${y})`}
        onClick={onClick}>
        <rect className='actioncard-rect' rx={15} stroke={color} />
        <rect
          ref={(e) => (this._icon = e as SVGElement)}
          className='actioncard-icon'
          x={19}
          y={8}
        />
        <rect
          ref={(e) => (this._text = e as SVGElement)}
          className='actioncard-text'
          x={4}
          y={64}
        />
        <text className='actioncard-footer' x={86 / 2} y={145} fill={color}>
          Download
        </text>
      </g>
    );
  }
}
