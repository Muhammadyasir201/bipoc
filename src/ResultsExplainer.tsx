import * as React from "react";
import { appContext } from "./core/AppContext";
import { Button } from "./core/Button";

import "./styles/resultsexplainer.css";

interface IResultsExplainerProps {
  title: string;
  content: string;
  graph: string;
  onBack: () => void;
}

export class ResultsExplainer extends React.Component<IResultsExplainerProps> {
  public render() {
    const { title, content, graph, onBack } = this.props;
    return (
      <div className='results-explainer fill-parent'>
        <div className='results-explainer-header'>
          <div className='fsSubtitle'>
            <p
              className='title has-text-color'
              style={{ color: "rgb(15, 188, 192)" }}>
              <strong>{title}</strong>
            </p>
          </div>
          <div className='fsFooter'>{content}</div>
        </div>
        <div className='results-explainer-body'>
          <img src={graph} />
        </div>
        <div className='results-explainer-footer'>
          <appContext.Consumer>
            {({ history, localTransition }) => {
              return (
                <Button
                  text='Go Back'
                  onClick={() => localTransition?.(onBack)}
                />
              );
            }}
          </appContext.Consumer>
        </div>
      </div>
    );
  }
}
