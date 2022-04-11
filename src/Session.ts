interface ISessionState {
  ingredient?: string;
  regions?: {
    source?: string;
    dest?: string;
  };
  answers?: {
    [section: string]: Array<{
      visibility: number;
      practices: boolean[];
    }>;
  };
  certifications?: number;
  transparency?: number;
}

export class Session {
  public static get state() {
    return Session._state;
  }
  public static get ingredient() {
    return Session._state?.ingredient;
  }
  public static get sourceRegion() {
    return Session._state?.regions?.source;
  }
  public static get destRegion() {
    return Session._state?.regions?.dest;
  }
  public static get answers() {
    return Session._state?.answers;
  }

  public static clear() {
    sessionStorage.removeItem("session");
    Session._state = {};
  }

  public static setIngredient(ingredient: string) {
    Session._state.ingredient = ingredient;
    Session.write();
  }

  public static setSourceRegion(source?: string) {
    if (!Session.state.regions) {
      Session.state.regions = {};
    }
    Session.state.regions.source = source;
    Session.write();
  }

  public static setDestRegion(dest?: string) {
    if (!Session.state.regions) {
      Session.state.regions = {};
    }
    Session.state.regions.dest = dest;
    Session.write();
  }

  public static setAnswers(
    section: string,
    index: number,
    visibility: number,
    practices: boolean[]
  ) {
    if (!Session.state.answers) {
      Session.state.answers = {};
    }

    if (!(section in Session.state.answers)) {
      Session.state.answers[section] = [];
    }

    Session.state.answers[section][index] = {
      visibility,
      practices,
    };
    Session.write();
  }

  public static setCertifications(certifications: number) {
    Session.state.certifications = certifications;
    Session.write();
  }

  public static setTransparency(transparency: number) {
    Session.state.transparency = transparency;
    Session.write();
  }

  public static getScore(section: string) {
    if (!Session.state.answers) {
      return 0;
    }
    const answers = Session.state.answers[section];
    // TODO
  }

  public static read() {
    const data = sessionStorage.getItem("session");
    if (data) {
      Session._state = JSON.parse(data);
    }
  }

  private static _state: ISessionState = {};

  private static write() {
    sessionStorage.setItem("session", JSON.stringify(Session._state));
  }
}
