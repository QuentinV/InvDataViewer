
export interface TestConfig {
    _id?: string;
    name: string;
    data: object;
    results?: { [key: string]: { pass: boolean; errorMessage?: string; }};
}