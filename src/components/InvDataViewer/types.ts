
export interface LabelData<T> {
    label: string;
    main?: boolean;
    value?: (data: T) => number | undefined;
    level?: number;
    avoidFormat?: boolean;
}