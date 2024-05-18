export interface InvData {
    cik?: string
    name?: string
    years?: { [key: string]: Data }
    metrics: GlobalMetrics
}

export interface Data {
    INCOME_STATEMENT: IncomeStatement
    BALANCE_SHEET: BalanceSheet
    CASH_FLOW: CashFlow
    metrics: Metrics
}

export interface Metrics {
    adjustedNetIncome: number
    adjustedNetIncomePerShare: number
    grossProfitMargin: number
    operatingIncome: number
    revenuePerShare: number
    costsPerShare: number
    vvRevenue: number
    ownersEarningsGrowth: number
    ownersEarningsPerShare: number
    freeCashFlow: number
    debtToEquityRatio: number
    ltDebtToEquityRatio: number
    ltDebtToOpIncomeRatio: number
    longTermDebt: number
    operatingMargin: number
    daMargin: number
    rdRevenueMargin: number
    rdMargin: number
    interestExpenseMargin: number
}

export interface GlobalMetrics {
    cagrAdjustedProfit?: number
    cagrEarningsPerShare?: number
    tenYAvgEarningsPerShare?: number
    cagrOperatingIncome?: number
    cagrOperatingIncomePerShare?: number
    tenYAvgEbitPerShare?: number
    cagrRevenue?: number
    cagrRevenuePerShare?: number
}

export interface IncomeStatement {
    REVENUE?: number
    OPERATING_INCOME?: number
}

export interface BalanceSheet {
    CASH_AND_CASH_EQUIVALENTS?: number
    TOTAL_CURRENT_LIABILITIES?: number
    LONG_TERM_DEBT?: number
    TOTAL_CURRENT_ASSETS?: number
}

export interface CashFlow {
    NET_CASH_PROVIDED_BY_OPERATING_ACTIVITIES?: number
}
