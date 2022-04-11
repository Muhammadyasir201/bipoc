import * as React from "react";

import { Checkbox, FormControlLabel } from "@material-ui/core";

import "./styles/question.css";

interface IQuestionProps {
  text: string;
  color: string;
  checked: boolean;
  onChecked: (checked: boolean) => void;
}

export class Question extends React.Component<IQuestionProps> {
  public render() {
    const { text, color, checked, onChecked } = this.props;
    return (
      <div className='question'>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => onChecked(e.target.checked)}
              style={{ color, marginTop: '-8px', alignSelf:"flex-start", alignItems:"flex-start", justifySelf:"flex-start", justifyItems:"flex-start" }}
            />
          }
          label={
            <span style={{ fontFamily: "Work Sans", fontSize: ".8em" }}>
              {text}
            </span>
          }
        />
      </div>
    );
  }
}
