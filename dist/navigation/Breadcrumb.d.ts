import type { ReactNode } from 'react';
export interface BreadcrumbItem {
    label: ReactNode;
    /** Where the level links to. The last item is the current page and never links. */
    href?: string;
    onClick?: () => void;
}
export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    /** 16px leading icon (a home icon by default in the design). */
    icon?: ReactNode;
    className?: string;
}
export declare function Breadcrumb({ items, icon, className }: BreadcrumbProps): import("react").JSX.Element;
