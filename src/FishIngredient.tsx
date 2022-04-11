import React from "react";
import { Background } from "./Background";
import { ingredient } from "./data/data.json";
import "./styles/fishIngredient.css";
import { appContext } from "./core/AppContext";

const FishIngredient = () => {
  return (
    <appContext.Consumer>
      {({ transition, Finfish, Shellfish, Shrimp, Seaweed }) => {
        return (
          <div className='fill-parent'>
            <Background path={ingredient?.backgroundImage} />
            <div className='container'>
              <div className='fish-container'>
                <div className='finFish-container image-btn-container'>
                  <img
                    style={{ width: "39vw" }}
                    src={ingredient.finFishImage}
                    alt='finFish'
                  />
                  <button
                    onClick={() => {
                      Finfish();
                      sessionStorage.removeItem("howto-history-back");
                      transition?.("/howto");
                    }}
                    className='btn btn-finfish'>
                    Finfish
                  </button>
                </div>
                <div className='shellFish-container image-btn-container'>
                  <img
                    style={{ width: "17vw" }}
                    src={ingredient.shellFishImage}
                    alt='shellFish'
                  />
                  <button
                    onClick={() => {
                      Shellfish();
                      sessionStorage.removeItem("howto-history-back");
                      transition?.("/howto");
                    }}
                    className='btn btn-shellfish'>
                    Shellfish (Mollusks Only)
                  </button>
                </div>
                <div className='shrimp-container image-btn-container'>
                  <img
                    style={{ width: "21vw" }}
                    src={ingredient.shrimpImage}
                    alt='shrimp'
                  />
                  <button
                    onClick={() => {
                      Shrimp();
                      sessionStorage.removeItem("howto-history-back");
                      transition?.("/howto");
                    }}
                    className='btn btn-Shrimp'>
                    Shrimp
                  </button>
                </div>
                <div className='seaWeed-container image-btn-container'>
                  <img
                    style={{ width: "17vw" }}
                    src={ingredient.seaWeedImage}
                    alt='Seaweed'
                  />
                  <button
                    onClick={() => {
                      Seaweed();
                      sessionStorage.removeItem("howto-history-back");
                      transition?.("/howto");
                    }}
                    className='btn btn-Seaweed'>
                    Seaweed
                  </button>
                </div>
              </div>
              <div className='select-text'>Select your seafood</div>
            </div>
          </div>
        );
      }}
    </appContext.Consumer>
  );
};

export default FishIngredient;
