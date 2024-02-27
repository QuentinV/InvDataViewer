export interface InvData {
    cik?: string
    name?: string
    years?: { [key: string]: Data }
}

export interface Data {
    INCOME_STATEMENT: IncomeStatement
    BALANCE_SHEET: BalanceSheet
    CASH_FLOW: CashFlow
    metrics: Metrics
}

export interface Metrics {
    adjustedNetIncome: number;
    grossProfitMargin: number;
    operatingIncome: number;
    revenueGrowth: number;
    cogsGrowth: number;
    vvRevenue: number;
}

export interface IncomeStatement {
    REVENUE?: number
    COST_OF_REVENUE?: number
    GROSS_PROFIT?: number
    TOTAL_OPERATING_EXPENSES?: number
    RESEARCH_AND_DEVELOPMENT?: number
    SALES_GENERAL_AND_ADMINISTRATIVE?: number
    DEPRECATION_AND_AMORTIZATION?: number
    OTHER_OPERATING_EXPENSES?: number
    OPERATING_INCOME?: number
    INTEREST_EXPENSES?: number
    OTHER_INCOME_EXPENSE?: number
    INCOME_BEFORE_TAXES?: number
    PROVISION_FOR_INCOME_TAXES?: number
    MINORITY_INTEREST?: number
    OTHER_INCOME?: number
    NET_INCOME_FROM_CONTINUING_OPERATIONS?: number
    NET_INCOME_FROM_DISCONTINUING_OPERATIONS?: number
    OTHER?: number
    NET_INCOME?: number
    PREFERRED_DIVIDENDS?: number
    NET_INCOME_AVAILABLE_TO_COMMON_SHAREHOLDERS?: number
    EARNINGS_PER_SHARE_BASIC?: number
    EARNINGS_PER_SHARE_DILUTED?: number
    WEIGHTED_AVERAGE_SHARES_OUTSTANDING_BASIC?: number
    WEIGHTED_AVERAGE_SHARES_OUTSTANDING_DILUTED?: number
    CASH_DIVIDENDS_PER_SHARE?: number
}

export interface BalanceSheet {
    TOTAL_ASSETS?: number
    TOTAL_CURRENT_ASSETS?: number
    TOTAL_CASH?: number
    CASH_AND_CASH_EQUIVALENTS?: number
    SHORT_TERM_INVESTMENTS?: number
    MARKETABLE_SECURITIES?: number
    RECEIVABLES?: number
    INVENTORIES?: number
    DEFERRED_INCOME_TAXES_CURRENT_ASSETS?: number
    INCOME_TAX_RECEIVABLE?: number
    PREPAID_EXPENSES?: number
    OTHER_CURRENT_ASSETS?: number
    TOTAL_NON_CURRENT_ASSETS?: number
    NET_PROPERTY_PLANT_AND_EQUIPMENT?: number
    PROPERTY_AND_EQUIPMENT_AT_COST?: number
    LAND?: number
    FIXTURES_AND_EQUIPMENT?: number
    OTHER_PROPERTIES?: number
    GROSS_PROPERTY_PLANT_AND_EQUIPMENT?: number
    ACCUMULATED_DEPRECIATION?: number
    INVESTMENTS?: number
    INTANGIBLE_ASSETS?: number
    DEFERRED_INCOME_TAXES_NON_CURRENT_ASSETS?: number
    GOODWILL?: number
    OTHER_LONG_TERM_ASSETS?: number
    TOTAL_LIABILITIES_AND_STOCKHOLDERS_EQUITY?: number
    TOTAL_LIABILITIES?: number
    TOTAL_CURRENT_LIABILITIES?: number
    SHORT_TERM_DEBT?: number
    CAPITAL_LEASES_CURRENT_LIABILITIES?: number
    ACCOUNTS_PAYABLE?: number
    TAXES_PAYABLE?: number
    DEFERRED_INCOME_TAXES_CURRENT_LIABILITIES?: number
    DEFERRED_REVENUES_CURRENT_LIABILITIES?: number
    ACCURED_LIABILITIES?: number
    EMPLOYEE_COMPENSATION_AND_BENEFITS?: number
    OTHER_CURRENT_LIABILITIES?: number
    TOTAL_NON_CURRENT_LIABILITIES?: number
    LONG_TERM_DEBT?: number
    CAPITAL_LEASES_NON_CURRENT_LIABILITIES?: number
    DEFERRED_TAXES_LIABILITIES?: number
    DEFERRED_REVENUES_NON_CURRENT_LIABILITIES?: number
    MINORITY_INTEREST_NON_CURRENT_LIABILITIES?: number
    PENSIONS_AND_OTHER_BENEFITS?: number
    CONTINGENT_LIABILITIES?: number
    OTHER_LONG_TERM_LIABILITIES?: number
    TOTAL_STOCKHOLDERS_EQUITY?: number
    TOTAL_COMPANY_STOCKHOLDERS_EQUITY?: number
    COMMON_STOCK?: number
    ADDITIONAL_PAID_IN_CAPITAL?: number
    RETAINED_EARNINGS?: number
    TREASURY_STOCK?: number
    ACCUMULATED_OTHER_COMPREHENSIVE_INCOME?: number
    PREFERRED_STOCK?: number
    NONCONTROLLING_INTEREST?: number
}

export interface CashFlow {
    NET_CASH_PROVIDED_BY_OPERATING_ACTIVITIES?: number
    NET_INCOME_CASH_FLOW?: number
    DEPRECATION_AND_AMORTIZATION_CASH_FLOW?: number
    PROVISION_FOR_DOUBTFUL_ACCOUNTS_AND_INVENTORY_OBSOLENCE?: number
    DEFERRED_INCOME_TAXES?: number
    SHARE_BASED_COMPENSATION?: number
    ASSET_IMPAIMENT?: number
    GOODWILL_IMPAIMENT?: number
    LOSS_FROM_DISCONTINUING_OPERATIONS?: number
    ACCOUNTS_RECEIVABLE?: number
    INVENTORY?: number
    PREPAID_EXPENSES_DEFERRED_COSTS_AND_OTHER_CURRENT_ASSETS?: number
    ACCOUNTS_PAYABLE_CASH_FLOW?: number
    ACCURED_LIABILITIES_CASH_FLOW?: number
    INCOME_TAXES_PAYABLE?: number
    DEFERRED_CREDITS_AND_OTHER_LIABILITIES?: number
    OTHER_WORKING_CAPITAL?: number
    OTHER_NON_CASH_ITEMS?: number
    NET_CASH_USED_FOR_INVESTING_ACTIVITIES?: number
    INVESTMENT_IN_PROPERTY_PLANT_AND_EQUIPMENT?: number
    PROPERTY_PLANT_AND_EQUIPMENT_REDUCTIONS?: number
    CAPITAL_EXPENDITURE_INVESTING_ACTIVITIES?: number
    NET_ACQUISITIONS?: number
    INVESTMENTS_IN_UNCONSOLIDATED_AFFILIATES?: number
    PURCHASES_OF_INVESTMENTS?: number
    SALES_MATURITIES_OF_INVESTMENTS?: number
    PURCHASES_OF_INTANGIBLES?: number
    OTHER_INVESTING_CHARGES?: number
    NET_CASH_USED_FOR_FINANCING_ACTIVITIES?: number
    DEBT_ISSUED?: number
    SHORT_TERM_BORROWING?: number
    LONG_TERM_DEBT_ISSUED?: number
    DEBT_REPAYMENT?: number
    SHORT_TERM_DEBT_REPAYMENT?: number
    LONG_TERM_DEBT_REPAYMENT?: number
    COMMON_STOCK_ISSUED?: number
    COMMON_STOCK_REPURCHASED?: number
    PREFERRED_STOCK_ISSUED?: number
    REPURCHASES_OF_TREASURY_STOCKS?: number
    DIVIDENDS_PAID?: number
    PROCEEDS_FROM_EXERCISE_OF_STOCK_OPTIONS?: number
    DEBT_ISSUANCE_COSTS_PAID?: number
    OTHER_FINANCING_ACTIVITIES?: number
    EFFECT_OF_EXCHANGE_RATE_CHANGES?: number
    NET_CHANGE_IN_CASH?: number
    CASH_AT_BEGINNING_OF_PERIOD?: number
    CASH_AT_END_OF_PERIOD?: number
    FREE_CASH_FLOW?: number
    OPERATING_CASH_FLOW?: number
    CAPITAL_EXPENDITURE_CASH_FLOW?: number
    CASH_PAID_FOR_INCOME_TAXES?: number
    CASH_PAID_FOR_INTEREST?: number
}
