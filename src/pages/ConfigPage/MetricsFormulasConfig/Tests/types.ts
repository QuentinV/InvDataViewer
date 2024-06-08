
export interface TestConfig {
    _id?: string;
    name: string;
    inputData: object;
    expectedData: object;
    results?: { [key: string]: { pass: boolean; errorMessage?: string; }};
}