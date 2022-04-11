import { createContext } from "react";
import * as H from "history";

interface IAppContext {
  history?: H.History;
  transition?: (route: string) => void;
  localTransition?: (onFadeOut: () => void) => void;
  progress: number;
  fish: string;
  Finfish: () => void;
  Shellfish: () => void;
  Seaweed: () => void;
  Shrimp: () => void;
}

export const appContext = createContext<IAppContext>({
  progress: 0,
  fish: "",
  Finfish: () => "",
  Shellfish: () => "",
  Seaweed: () => "",
  Shrimp: () => "",
});
