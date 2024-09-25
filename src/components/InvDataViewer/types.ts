export interface LabelData {
    label: string
    main?: boolean
    level?: number
    avoidFormat?: boolean
    name: string
}

export interface Config {
    children: LabelData[]
    name: string
}
