
export interface TestConfig {
    _id?: string;
    name: string;
    inputData: object;
    expectedData: object;
    result?: boolean;
    errorMessage?: string;
}