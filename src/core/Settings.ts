import data from "../data/setting.json";

interface ISettings {
  //   wordpressUrl: string;
  sections: {
    [section: string]: {
      color: string;
      progress: number;
    };
  };

  colors: {
    [section: string]: string;
  };

  actionCards: {
    all: string;
  };
}

export class Settings {
  public static get data() {
    return Settings._data;
  }

  public static async load() {
    Settings._data = data;
  }

  private static _data: ISettings;
}
