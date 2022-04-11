
export class DOMUtils {
    public static select(tree: Element, selector: string) {
        const elems: HTMLElement[] = [];
        tree.querySelectorAll(selector).forEach(e => elems.push(e as HTMLElement));
        return elems;
    }

    public static toArray(collection: HTMLCollection) {
        const elems: HTMLElement[] = [];
        for (let i = 0; i < collection.length; ++i) {
            elems.push(collection.item(i) as HTMLElement);
        }
        return elems;
    }
}
