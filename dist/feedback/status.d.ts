export type Status = 'info' | 'success' | 'warning' | 'danger';
export declare const statusText: Record<Status, string>;
export declare const statusFillA80: Record<Status, string>;
export declare const statusBorder: Record<Status, string>;
/** 16px status icon in a 20px-high box so it lines up with the first line of text. */
export declare function StatusIcon({ status }: {
    status: Status;
}): import("react").JSX.Element;
export declare const CloseGlyph: () => import("react").JSX.Element;
