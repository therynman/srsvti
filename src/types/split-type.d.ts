// src/types/split-type.d.ts

declare module "split-type" {
    export interface SplitTypeOptions {
        types?: string;
        tagName?: string;
        wordClass?: string;
        charClass?: string;
        lineClass?: string;
        splitClass?: string;
        absolute?: boolean;
        split?: string | string[];
    }

    export interface SplitTypeResult {
        lines: HTMLElement[] | null;
        words: HTMLElement[] | null;
        chars: HTMLElement[] | null;
        revert: () => void;
    }

    export default class SplitType {
        constructor(
            target: string | Element | NodeList | Array<Element>,
            options?: SplitTypeOptions
        );

        lines: HTMLElement[] | null;
        words: HTMLElement[] | null;
        chars: HTMLElement[] | null;

        revert(): void;
    }
}
