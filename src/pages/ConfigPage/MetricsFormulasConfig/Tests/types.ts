
export interface TestConfig {
    _id?: string;
    name: string;
    data: object;
    results?: { [key: string]: TestConfigResult};
}

export interface TestConfigResult {
    pass: boolean; 
    errors: {
        error?: string;
        compareMetrics?: {[key: string]: TestConfigResultCompare},
        compareMetricsYears?: {
            year: string;
            compare: { [key: string]: TestConfigResultCompare }
        }[];
    };
    formulasWithData?: {
        metrics?: {[key: string]: TestConfigResultFormulaData};
        years?: {[key: string]: { metrics: {[key: string]: TestConfigResultFormulaData} } };
    }
}

export interface TestConfigResultFormulaData {
    replaced: string; 
    formula: string;
}

export interface TestConfigResultCompare {
    calc?: number|null;
    expected?: number|null;
}