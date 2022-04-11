import { Settings } from "./core/Settings";

interface ICategoryJson {
  slug: string;
  id: string;
}

interface ICategories {
  [name: string]: {
    id: string;
  };
}

export class Categories {
  public static async load() {
    const response = await fetch(
      `${Settings.data.wordpressUrl}/wp-json/wp/v2/categories`
    );
    const json = (await response.json()) as ICategoryJson[];
    const categories = json
      .map(({ slug, id }) => ({ slug, id }))
      .filter((c) => c.slug !== "uncategorized");

    Categories._data = categories.reduce((prev, cur) => {
      return {
        ...prev,
        ...{
          [cur.slug]: {
            id: cur.id,
          },
        },
      };
    }, {});
  }

  public static get(slug: string) {
    return Categories._data[slug];
  }

  private static _data: ICategories = {};
}
