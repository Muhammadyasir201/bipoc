
import * as React from "react";

import "./styles/regionlocation.css";

interface IRegionLocationProps {
    icon: string;
    text: string;
    location?: string;
    isSource: boolean;
}

export class RegionLocation extends React.Component<IRegionLocationProps> {
    public render() {
        const { icon, text, location, isSource } = this.props;
        return (
            <div className="location-container">
                <div className="location-header">
                    <div><img src={icon} /></div>
                    <div>
                        <div className="location-question">{text}</div>
                        <div className={`location-footer ${isSource ? "source" : "destination"}`}>
                            {location}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
