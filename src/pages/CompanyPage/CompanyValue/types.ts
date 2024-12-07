export type CompanyValueConfig = {
    [key: string]: { 
        configs: {[key: string]: { values: number[], digits?: number }},
        display?: {[key: string]: { metric: string; symbol?: '%' }}
    }
};