
export interface LabelData<T> {
    label: string
    children?: LabelData<T>[]
    main?: boolean
    value?: (data: T) => number | undefined
}