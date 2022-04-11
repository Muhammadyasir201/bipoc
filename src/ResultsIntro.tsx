import React, { useState } from "react";
import { Background } from "./Background";
import { appContext } from "./core/AppContext";
import { Button } from "./core/Button";
import { youDidIt as data } from "./data/data.json";
import "./styles/youDidIt.css";
import { section } from "./data/data.json";
import emailjs from "@emailjs/browser";

export interface IResultsIntroContent {
  bg: string;
  title: string;
  text: string;
  footer: string;
}

interface Props {
  onNext: () => void;
  answers?: any;
}

const isEmailValid = (email: string) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const sendEMail = (email: any, actionCards1: any) => {
  emailjs
    .send(
      "service_six005o",
      "template_vnomn6o",
      { email: email, actionCards: actionCards1 },
      "ntBLOhe4oRLFShAP1"
    )
    .then(
      (response) => {
        if (response) {
          emailjs
            .send(
              "service_six005o",
              "template_fj7wp14",
              {
                email: "info@greenbrownblue.com",
                user_email: email,
                action_cards: actionCards1,
              },
              "ntBLOhe4oRLFShAP1"
            )
            .then(
              (response) => {},
              (err) => {
                console.log("FAILED...", err);
              }
            );
        }
      },
      (err) => {
        console.log("FAILED...", err);
      }
    );
};

export const ResultsIntro: React.FC<Props> = ({ onNext, answers }) => {
  const [email, setEmail] = useState("");
  const youDidIt: any = data;
  const sections: any = section;

  const percentage = (partialValue: number, totalValue: number) =>
    Math.round((100 * partialValue) / totalValue);

  const resultsPercentagesArr = Object.entries(answers).map(
    ([name, arr]: any) => {
      const result = arr.map(({ practices }: any, index: number) => {
        const trueAnswersLength = practices.filter(
          (value: Boolean) => value === true
        ).length;

        const per = percentage(trueAnswersLength, practices.length);
        if (per < 50) return [per, index];
      });

      return [name, result.filter((v: any) => v !== undefined)];
    }
  );

  return (
    <appContext.Consumer>
      {({ localTransition, fish }) => {
        return (
          <div className='fill-parent'>
            <Background path={youDidIt[fish]} />
            <div className='myContainer'>
              <div className='mySubTitle'>{youDidIt?.subtitle}</div>
              <div className='myTitle'>{youDidIt?.title}</div>
              <div className='subtitle2'>{youDidIt?.subtitle2}</div>
              <div className='btnContainer'>
                <input
                  onChange={(e) => setEmail(e.target.value.trim())}
                  className='myInput'
                  type='text'
                  value={email}
                  placeholder='Insert your email'
                />
                {isEmailValid(email) && (
                  <div
                    className='myBtn'
                    onClick={() => {
                      const actionCards = resultsPercentagesArr
                        .map(([name, arr]) =>
                          arr.map(
                            ([percentage, index]: any) =>
                              sections[fish][name].principles[index].actionCard
                          )
                        )
                        .reduce((acc, el) => acc.concat(el), []);

                      sendEMail(
                        email,
                        actionCards.join("~").replaceAll("~", "\n")
                      );
                      localTransition?.(onNext);
                    }}>
                    <div className='polygon'></div>
                  </div>
                )}
                {/* <img
                  // onClick={() => window.open("https://www.greenbrownblue.com/")}
                  src={youDidIt.btnImage}
                /> */}
              </div>
            </div>
          </div>
        );
      }}
    </appContext.Consumer>
  );
};
