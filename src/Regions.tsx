import * as React from "react";
import { WorldMap } from "./WorldMap";
import { InfoButtonIngredient } from "./InfoButtonIngredient";

import "./styles/regions.css";
import { ProgressBar } from "./ProgressBar";
import { RegionLocation } from "./RegionLocation";
import { Session } from "./Session";
import { region } from "./data/data.json";

interface IRegionsState {
  source?: string;
  destination?: string;
}

interface IRegionsContent {
  title: string;
  content: string;
}

export class Regions extends React.Component<{}, IRegionsState> {
  public static content: IRegionsContent;

  public static get assets() {
    return {
      pinSrc: "/public/images/location-pin-src.svg",
      pinDest: "/public/images/location-pin-dest.svg",
      pinMap: "/public/images/location-pin-map.svg",
    };
  }

  constructor(props: {}) {
    super(props);
    this.state = {
      source: Session.sourceRegion,
      destination: Session.destRegion,
    };
  }

  public render() {
    const content = region;
    const { source, destination } = this.state;
    return (
      <div className='regions'>
        <InfoButtonIngredient />
        <div className='fill-parent'>
          <div className='regions-body'>
            <WorldMap
              source={source}
              dest={destination}
              interactive={!(source && destination)}
              pickSource={!source}
              onSelected={(region) => {
                if (!source) {
                  Session.setSourceRegion(region);
                  this.setState({
                    source: region,
                    // destination: region === destination ? undefined : destination
                  });
                } else {
                  Session.setDestRegion(region);
                  this.setState({
                    destination: region,
                    // source: region === source ? undefined : source
                  });
                }
              }}
              onDeselected={(isSource) => {
                if (isSource) {
                  Session.setSourceRegion(undefined);
                  this.setState({ source: undefined });
                } else {
                  Session.setDestRegion(undefined);
                  this.setState({ destination: undefined });
                }
              }}
            />
            <div>
              <div>
                <div className='regions-title fsTitle'>{content.title}</div>
                <div className='regions-content'>{content.content}</div>
              </div>
              <div>
                <RegionLocation
                  icon={Regions.assets.pinSrc}
                  text='Where is your operation based?'
                  isSource={true}
                  location={source}
                />
                {(source || destination) && (
                  <RegionLocation
                    icon={Regions.assets.pinDest}
                    text='Where would you like to source from?'
                    isSource={false}
                    location={destination}
                  />
                )}
              </div>
            </div>
          </div>
          <div className='regions-footer'>
            <ProgressBar
              disableNext={!(source && destination)}
              nextRoute='/section/planet/0'
              progress={0}
            />
          </div>
        </div>
      </div>
    );
  }
}
