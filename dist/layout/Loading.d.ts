import type { ComponentProps } from 'react';
export interface LoadingProps extends ComponentProps<'span'> {
    /** Which surface the bar sits on: `light` for light backgrounds, `dark` for dark ones. */
    surface?: 'light' | 'dark';
}
/** Skeleton bar shown in place of content that is still loading. Set its width with `className`. */
export declare function Loading({ surface, className, ...rest }: LoadingProps): import("react").JSX.Element;
