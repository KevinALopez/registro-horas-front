declare module 'bootstrap' {
    export interface Modal {
        show(): void;
        hide(): void;
        toggle(): void;
        handleUpdate(): void;
        dispose(): void;
    }

    export class Modal {
        constructor(element: string | Element, options?: any);
        show(): void;
        hide(): void;
        toggle(): void;
        handleUpdate(): void;
        dispose(): void;
    }
}
