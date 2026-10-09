import type { ReactNode } from 'react';
export interface DropdownOption {
    value: string;
    label: string;
    /** 16px icon shown before the label in the list. */
    icon?: ReactNode;
    disabled?: boolean;
}
interface Common {
    options: DropdownOption[];
    label?: ReactNode;
    hint?: ReactNode;
    placeholder?: string;
    error?: boolean;
    disabled?: boolean;
    /** 16px icon at the start of the field. */
    prefix?: ReactNode;
    /** Accessible name when there is no visible `label`. */
    'aria-label'?: string;
    className?: string;
}
export type DropdownProps = (Common & {
    multiple?: false;
    value: string | null;
    onChange: (value: string | null) => void;
}) | (Common & {
    multiple: true;
    value: string[];
    onChange: (value: string[]) => void;
});
export declare function Dropdown(props: DropdownProps): import("react").JSX.Element;
export {};
