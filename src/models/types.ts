export interface InvData {
    cik?: string
    name?: string
    years?: { [key: string]: Data },
    metrics: GlobalMetrics
}

export interface Data {
    BALANCE_SHEET: BalanceSheet
    metrics: Metrics
}

export interface Metrics {
    adjustedNetIncome: number;
    adjustedNetIncomePerShare: number;
    grossProfitMargin: number;
    operatingIncome: number;
    revenueGrowth: number;
    cogsGrowth: number;
    vvRevenue: number;
    ownersEarningsGrowth: number;
    ownersEarningsPerShare: number;
}

export interface GlobalMetrics {
    cagrAdjustedProfit?: number;
    cagrEarningsPerShare?: number;
    tenYAvgEarningsPerShare?: number;
    cagrOperatingIncome?: number;
    cagrOperatingIncomePerShare?: number;
    tenYAvgEbitPerShare?: number;
}

export interface BalanceSheet {
    CASH_AND_CASH_EQUIVALENTS?: number
}