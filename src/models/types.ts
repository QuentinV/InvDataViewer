export interface InvData {
    cik?: string
    name?: string
    years?: { [key: string]: Data }
}

export interface Data {
    BALANCE_SHEET: BalanceSheet
    metrics: Metrics
}

export interface Metrics {
    adjustedNetIncome: number;
    grossProfitMargin: number;
    operatingIncome: number;
    revenueGrowth: number;
    cogsGrowth: number;
    vvRevenue: number;
    ownersEarningsGrowth: number;
    ownersEarningsPerShare: number;
}

export interface BalanceSheet {
    CASH_AND_CASH_EQUIVALENTS?: number
}