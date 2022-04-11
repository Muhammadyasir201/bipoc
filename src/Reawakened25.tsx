
import * as React from "react";
import { Background } from "./Background";
import { appContext } from "./core/AppContext";
import { Button } from "./core/Button";

import "./styles/learn.css";
import "./styles/reawakened.css";

export interface IReawakenedContent {
    title: string;
    content: JSX.Element;
    logo: string;
    bg: string;
}

interface IReawakenedProps {
    content: IReawakenedContent;
    onBack: () => void;
}

export class Reawakened25 extends React.Component<IReawakenedProps> {

    public render() {
        const { content, onBack } = this.props;
        return (
            <React.Fragment>
                <Background path={content.bg} />
                <div className="fill-parent learn reawakened">
                    <div>
                        <div className="learn-image-container">
                            <img className="learn-image" src={content.logo} />
                        </div>
                    </div>
                    <div className="learn-right">
                        <div className="learn-right-header fsSubtitle">{content.title}</div>
                        <div className="learn-right-body">{content.content}</div>
                        <div>
                            <appContext.Consumer>
                                {({ localTransition }) => {
                                    return (
                                        <Button
                                            text="Back"
                                            onClick={() => {
                                                localTransition?.(onBack);
                                            }}
                                        />
                                    );
                                }}
                            </appContext.Consumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
