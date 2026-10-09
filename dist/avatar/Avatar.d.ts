import type { ComponentProps } from 'react';
export type AvatarSize = 16 | 20 | 24 | 36;
export type AvatarColor = 'green' | 'teal' | 'sky' | 'blue' | 'purple' | 'pink' | 'red' | 'orange' | 'yellow' | 'gray';
export interface AvatarProps extends ComponentProps<'span'> {
    size?: AvatarSize;
    /** Photo URL. When set, the photo replaces the initials. */
    src?: string;
    alt?: string;
    /**
     * Background/text pair for initials. `green` and `red` reuse the success
     * and danger status colors — prefer the others for plain variety.
     */
    color?: AvatarColor;
    /** Initials, e.g. "AB". */
    children?: string;
}
/** Round avatar: a photo, or initials on a low-contrast color. */
export declare function Avatar({ size, src, alt, color, className, children, ...rest }: AvatarProps): import("react").JSX.Element;
