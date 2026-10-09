import type { ComponentProps } from 'react';
export type SquareAvatarSize = 12 | 14 | 16 | 20 | 24 | 40;
export interface SquareAvatarProps extends ComponentProps<'span'> {
    size?: SquareAvatarSize;
    /** Image URL (e.g. a company logo). When set, it replaces the initial. */
    src?: string;
    alt?: string;
    /** A single initial, e.g. "L". */
    children?: string;
}
/** Square avatar for companies and other non-person entities: an image, or one initial. */
export declare function SquareAvatar({ size, src, alt, className, children, ...rest }: SquareAvatarProps): import("react").JSX.Element;
