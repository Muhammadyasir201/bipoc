
import * as React from "react";

import { Slider as MaterialSlider } from "@material-ui/core";

import "./styles/slider.css";

interface ISliderProps {
    value: number;
    color: string;
    onChange: (value: number) => void;
}

export class Slider extends React.Component<ISliderProps> {

    public static get assets() {
        return {
            eye: "/public/images/icon-eye.svg",
            eyeDash: "/public/images/icon-eye-dashed.svg"
        };
    }

    public render() {
        return (
            <div className="slider">
                <img src={Slider.assets.eyeDash} />
                <MaterialSlider
                    value={this.props.value * 100}
                    onChange={(e, value) => this.props.onChange((value as number) / 100)}
                    style={{ 
                        color: this.props.color,
                        margin: "0px 20px"
                    }}
                />
                <img src={Slider.assets.eye} />
            </div>
        );
    }
}
