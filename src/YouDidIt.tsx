import React, { useState } from "react";
import { Background } from "./Background";
import { appContext } from "./core/AppContext";
import { Button } from "./core/Button";
import { youDidIt as data } from "./data/data.json";
import "./styles/youDidIt.css";

const YouDidIt = () => {
  const [email, setEmail] = useState("");
  const youDidIt: any = data;

  return (
    <appContext.Consumer>
      {({ transition, fish }) => {
        return (
          <div className='fill-parent'>
            <Background path={youDidIt[fish]} />
            <div className='myContainer'>
              <div className='mySubTitle'>{youDidIt?.subtitle}</div>
              <div className='myTitle'>{youDidIt?.title}</div>
              <div className='subtitle2'>{youDidIt?.subtitle2}</div>
              <div className='btnContainer' style={{ margin: "2vh" }}>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className='myInput'
                  type='text'
                  value={email}
                  placeholder='Insert your email'
                />
                <div
                  className='myBtn'
                  onClick={() => {
                    sessionStorage.removeItem("howto-history-back");
                    transition?.("/results");
                  }}>
                  <div className='polygon'></div>
                </div>
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

export default YouDidIt;
