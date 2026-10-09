import type { ComponentProps, ReactNode } from 'react';
export interface RadioProps extends Omit<ComponentProps<'input'>, 'type' | 'children'> {
    /** Label text. Omit for a bare radio and pass `aria-label` instead. */
    children?: ReactNode;
    /** Which side of the dot the label sits on. */
    labelSide?: 'left' | 'right';
    /** Error state: red ring, red fill when selected. */
    error?: boolean;
}
export declare function Radio({ children, labelSide, error, className, ...rest }: RadioProps): import("react").JSX.Element;
