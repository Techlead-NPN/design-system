import type { ComponentProps } from 'react';
export interface DividerProps extends ComponentProps<'div'> {
    direction?: 'horizontal' | 'vertical';
    /** Space the divider takes up across its line: none, regular or spacious. */
    spacing?: 'none' | 'regular' | 'spacious';
}
export declare function Divider({ direction, spacing, className, ...rest }: DividerProps): import("react").JSX.Element;
