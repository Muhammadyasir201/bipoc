import { Categories } from "./Categories";
import { DOMUtils } from "./core/DOMUtils";
import { Images } from "./core/Images";
import { Settings } from "./core/Settings";
import { Credits } from "./Credits";
import { HowTo } from "./howto/HowTo";
import { Intro } from "./Intro";
import { Principles } from "./Principles";
import { ProgressBar } from "./ProgressBar";
import { Regions } from "./Regions";
import { Section } from "./Section";
import { Slider } from "./Slider";
import { Welcome } from "./Welcome";

// tslint:disable-next-line
const { default: html2React } = require("html2react");

export interface IPostJson {
  slug: string;
  content: {
    rendered: string;
  };
}

export class Posts {
  public static async loadCommon() {
    const categoryId = Categories.get("common").id;
    const request = `wp-json/wp/v2/posts?categories=${categoryId}&per_page=100`;
    const response = await fetch(`${Settings.data.wordpressUrl}/${request}`);
    const json: IPostJson[] = await response.json();

    // Intro
    const introJson = json.find((j) => j.slug === "intro") as IPostJson;
    const introTree = new DOMParser().parseFromString(
      introJson.content.rendered,
      "text/html"
    ).body;
    Intro.content = {
      bg: (introTree.querySelector(".bg > img") as HTMLImageElement).src,
      logo: (introTree.querySelector(".logo img") as HTMLImageElement).src,
      title: introTree.querySelector(".title")?.innerHTML as string,
      subtitle: introTree.querySelector(".subtitle")?.innerHTML as string,
      footer: introTree.querySelector(".content")?.innerHTML as string,
    };

    // Welcome
    const welcomeJson = json.find((j) => j.slug === "welcome") as IPostJson;
    const welcomeTree = new DOMParser().parseFromString(
      welcomeJson.content.rendered,
      "text/html"
    ).body;
    Welcome.content = {
      title: welcomeTree.querySelector(".title")?.innerHTML as string,
      content: html2React(
        DOMUtils.select(welcomeTree, "p:not(.footer)")
          .map((c) => c.innerHTML)
          .join("<br><br>")
      ),
      footer: html2React(welcomeTree.querySelector(".footer")?.innerHTML),
      bg: (welcomeTree.querySelector(".bg > img") as HTMLImageElement).src,
    };

    // Howto
    const howtoJson = json.find((j) => j.slug === "how-to") as IPostJson;
    const howtoTree = new DOMParser().parseFromString(
      howtoJson.content.rendered,
      "text/html"
    );
    HowTo.content = {
      title: html2React(howtoTree.body.querySelector(".title")?.innerHTML),
      content: html2React(
        DOMUtils.select(howtoTree.body, ".content")
          .map((e) => e.innerHTML)
          .join("<br><br>")
      ),
      icon: (howtoTree.body.querySelector(".icon > img") as HTMLImageElement)
        .src,
      learnFact: html2React(
        howtoTree.body.querySelector(".learn-fact")?.outerHTML
      ),
      principlesDesc: html2React(
        howtoTree.body.querySelector(".principles")?.innerHTML
      ),
      learnPrinciples: html2React(
        howtoTree.body.querySelector(".learn-principles")?.outerHTML
      ),
      sections: DOMUtils.select(howtoTree.body, ".principles-table tr").reduce(
        (prev, cur) => {
          const [section, iconHTML] = cur.children[0].innerHTML.split("<br>");
          const icon = (
            new DOMParser().parseFromString(iconHTML, "text/html").body
              .firstChild as HTMLImageElement
          ).src;
          const principles = cur.children[1].innerHTML
            .split("<br>")
            .map((p) => p.slice(2)); // remove leading "- "
          return {
            ...prev,
            ...{
              [section.toLowerCase()]: {
                principles,
                icon,
              },
            },
          };
        },
        {}
      ),
    };

    // Credits
    const creditsJson = json.find((j) => j.slug === "credits") as IPostJson;
    const creditsTree = new DOMParser().parseFromString(
      creditsJson.content.rendered,
      "text/html"
    ).body;
    Credits.content = {
      title: html2React(creditsTree.querySelector(".title")?.outerHTML),
      subtitle: html2React(creditsTree.querySelector(".subtitle")?.outerHTML),
      content: html2React(
        DOMUtils.select(creditsTree, ".content")
          .map((p) => p.innerHTML)
          .join("<br><br>")
      ),
      logoGBB: (creditsTree.querySelector(".logo-gbb img") as HTMLImageElement)
        .src,
      logoCC: (creditsTree.querySelector(".logo-cc img") as HTMLImageElement)
        .src,
      footer: html2React(creditsTree.querySelector(".footer")?.innerHTML),
      bg: (creditsTree.querySelector(".bg > img") as HTMLImageElement).src,

      fact: {
        title: creditsTree.querySelector(".fact-title")?.innerHTML as string,
        teams: DOMUtils.select(creditsTree, ".fact-table td").map((t) =>
          html2React(t.innerHTML)
        ),
      },
      gbb: {
        title: creditsTree.querySelector(".gbb-title")?.innerHTML as string,
        teams: DOMUtils.select(creditsTree, ".gbb-table td").map((t) =>
          html2React(t.innerHTML)
        ),
      },
      reawakened: creditsTree.querySelector(".credits-reawakened")
        ?.innerHTML as string,
    };

    // Principles
    const principlesJson = json.find(
      (j) => j.slug === "principles"
    ) as IPostJson;
    const principlesTree = new DOMParser().parseFromString(
      principlesJson.content.rendered,
      "text/html"
    );
    Principles.content = {
      title: principlesTree.body.querySelector(".title")?.innerHTML as string,
      content: principlesTree.body.querySelector(".content")
        ?.innerHTML as string,
      bg: (principlesTree.body.querySelector("img") as HTMLImageElement).src,
    };

    // Regions
    const regionsJson = json.find((j) => j.slug === "regions") as IPostJson;
    const regionsTree = new DOMParser().parseFromString(
      regionsJson.content.rendered,
      "text/html"
    ).body;
    Regions.content = {
      title: regionsTree.querySelector(".title")?.innerHTML as string,
      content: regionsTree.querySelector(".content")?.innerHTML as string,
    };

    // Dialog
    const dialogJson = json.find((j) => j.slug === "help-popup") as IPostJson;
    const dialogTree = new DOMParser().parseFromString(
      dialogJson.content.rendered,
      "text/html"
    ).body;
    Section.content = {
      sections: {},
      dialog: {
        title: dialogTree.querySelector(".title")?.innerHTML as string,
        content: html2React(
          DOMUtils.select(dialogTree, ".content")
            .map((e) => e.innerHTML)
            .join("<br><br>")
        ),
        iconClose: (
          dialogTree.querySelector(".icon-close img") as HTMLImageElement
        ).src,
      },
    };

    await Images.preload([
      ...Object.values(ProgressBar.assets),
      ...Object.values(Slider.assets),
      ...Object.values(Regions.assets),

      Intro.content.bg,
      Intro.content.logo,
      Welcome.content.bg,
      HowTo.content.icon,
      ...Object.values(HowTo.content.sections).map((p) => p.icon),
      Credits.content.bg,
      Credits.content.logoGBB,
      Credits.content.logoCC,
      Principles.content.bg,
      Section.content.dialog.iconClose,
    ]);
  }
}
