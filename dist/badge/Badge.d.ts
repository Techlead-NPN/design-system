import type { ComponentProps, ReactNode } from 'react';
export type BadgeState = 'success' | 'error' | 'info' | 'accent' | 'urgent' | 'warning' | 'idle' | 'disabled';
export interface BadgeProps extends ComponentProps<'span'> {
    state: BadgeState;
    /** Optional 14px icon before the label. Status must never rely on color alone. */
    icon?: ReactNode;
}
/** Static status label. Never interactive — use Chip for anything clickable. */
export declare function Badge({ state, icon, className, children, ...rest }: BadgeProps): import("react").JSX.Element;
