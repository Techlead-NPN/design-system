import type { ReactNode } from 'react';
export type StepState = 'empty' | 'progressing' | 'checked' | 'rejected' | 'disabled' | 'checked-disabled';
/** The round status dot. 20px inside a step row, 24px when used on its own. */
export declare function StepIndicator({ state, size }: {
    state: StepState;
    size?: 20 | 24;
}): import("react").JSX.Element;
export interface StepItem {
    label: ReactNode;
    status: 'empty' | 'progressing' | 'completed' | 'completed-inactive';
}
/** A horizontal sequence of steps joined by lines. */
export declare function Steps({ items, className }: {
    items: StepItem[];
    className?: string;
}): import("react").JSX.Element;
