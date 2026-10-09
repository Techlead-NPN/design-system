export interface DateRange {
    start: Date | null;
    end: Date | null;
}
interface Common {
    /** Month shown first. Defaults to the selected date, or today. */
    defaultMonth?: Date;
    weekStartsOn?: 'monday' | 'sunday';
    /** Days before this cannot be picked. */
    min?: Date;
    /** Days after this cannot be picked. */
    max?: Date;
    /** Draw the floating card around the calendar (border, radius, shadow). */
    card?: boolean;
    className?: string;
}
export type CalendarProps = (Common & {
    mode?: 'single';
    value: Date | null;
    onChange: (value: Date) => void;
}) | (Common & {
    mode: 'range';
    value: DateRange;
    onChange: (value: DateRange) => void;
});
export declare function Calendar(props: CalendarProps): import("react").JSX.Element;
export {};
