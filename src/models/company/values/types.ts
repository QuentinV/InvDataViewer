export interface CompanyValues {
    values: CompanyValue[];
    areas: number[][];
}

export type CompanyValue = {[key: string]: number};