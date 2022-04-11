
import * as React from "react";

import "./styles/scorebarsvg.css";

interface IScoreBarSvgProps {
    color: string;
    score: number;
    x: number;
    y: number;
}

export class ScoreBarSvg extends React.Component<IScoreBarSvgProps> {
    public render() {
        const { color, score, x, y } = this.props;
        const height = 170 * score;
        return (
            <path
                className="scorebar"
                fill={color}
                d={`m ${x} ${y} v -${height} a 10 10 0 0 1 52 0 v ${height}`}
            />
        );
    }
}
