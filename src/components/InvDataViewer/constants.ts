import { BalanceSheet, CashFlow, IncomeStatement } from '../../models/types'
import { LabelData } from './types'

export const incomeStatementStructure: LabelData<IncomeStatement>[] = [
    {
        label: 'Revenue',
        value: (data) => data.REVENUE,
        main: true
    },
    {
        label: 'Cost of revenue',
        value: (data) => data.COST_OF_REVENUE,
        main: true
    },
    {
        label: 'Gross profit',
        value: (data) => data.GROSS_PROFIT
    },
    {
        label: 'Total operating expenses',
        value: (data) => data.TOTAL_OPERATING_EXPENSES
    },
    {
        label: 'Research and development',
        value: (data) => data.RESEARCH_AND_DEVELOPMENT,
        main: true,
        level: 1
    },
    {
        label: 'Sales, General and administrative',
        value: (data) => data.SALES_GENERAL_AND_ADMINISTRATIVE,
        main: true,
        level: 1
    },
    {
        label: 'Depreciation and Amortization',
        value: (data) => data.DEPRECATION_AND_AMORTIZATION,
        level: 1
    },
    {
        label: 'Other operating expenses',
        value: (data) => data.OTHER_OPERATING_EXPENSES,
        level: 1
    },
    {
        label: 'Operating income',
        value: (data) => data.OPERATING_INCOME,
        main: true
    },
    {
        label: 'Interest expense',
        value: (data) => data.INTEREST_EXPENSES,
        main: true
    },
    {
        label: 'Other income (expense)',
        value: (data) => data.OTHER_INCOME_EXPENSE
    },
    {
        label: 'Income before taxes',
        value: (data) => data.INCOME_BEFORE_TAXES,
        main: true
    },
    {
        label: 'Provision for income taxes',
        value: (data) => data.PROVISION_FOR_INCOME_TAXES
    },
    {
        label: 'Minority interest',
        value: (data) => data.MINORITY_INTEREST
    },
    {
        label: 'Other income',
        value: (data) => data.OTHER_INCOME
    },
    {
        label: 'Net income from continuing operations',
        value: (data) => data.NET_INCOME_FROM_CONTINUING_OPERATIONS
    },
    {
        label: 'Net income from discontinuing operations',
        value: (data) => data.NET_INCOME_FROM_DISCONTINUING_OPERATIONS
    },
    {
        label: 'Other',
        value: (data) => data.OTHER
    },
    {
        label: 'Net income',
        value: (data) => data.NET_INCOME
    },
    {
        label: 'Preferred dividends',
        value: (data) => data.PREFERRED_DIVIDENDS,
    },
    {
        label: 'Net income available to common shareholders',
        value: (data) => data.NET_INCOME_AVAILABLE_TO_COMMON_SHAREHOLDERS,
        main: true,
    },
    {
        label: 'Earnings per share'
    },
    {
        label: 'Basic',
        value: (data) => data.EARNINGS_PER_SHARE_BASIC,
        level: 1,
        avoidFormat: true
    },
    {
        label: 'Diluted',
        value: (data) => data.EARNINGS_PER_SHARE_DILUTED,
        main: true,
        level: 1,
        avoidFormat: true
    },
    {
        label: 'Weighted average shares outstanding'
    },
    {
        label: 'Basic',
        value: (data) => data.WEIGHTED_AVERAGE_SHARES_OUTSTANDING_BASIC,
        level: 1
    },
    {
        label: 'Diluted',
        value: (data) =>
            data.WEIGHTED_AVERAGE_SHARES_OUTSTANDING_DILUTED,
        main: true,
        level: 1
    },
    {
        label: 'Cash dividends per share',
        value: (data) => data.CASH_DIVIDENDS_PER_SHARE,
    },
    {
        label: 'EBITDA'
    }
]

export const balanceSheetStructure: LabelData<BalanceSheet>[] = [
    {
        label: 'Total assets',
        value: (data) => data.TOTAL_ASSETS,
        main: true
    },
    {
        label: 'Total current assets',
        value: (data) => data.TOTAL_CURRENT_ASSETS,
        main: true,
        level: 1
    },
    {
        label: 'Total cash',
        value: (data) => data.TOTAL_CASH,
        level: 2
    },
    {
        label: 'Cash and cash equivalents',
        value: (data) => data.CASH_AND_CASH_EQUIVALENTS,
        main: true,
        level: 3
    },
    {
        label: 'Short-term investments',
        value: (data) => data.SHORT_TERM_INVESTMENTS,
        level: 3
    },
    {
        label: 'Marketable securities',
        value: (data) => data.MARKETABLE_SECURITIES,
        level: 2
    },
    {
        label: 'Receivables',
        value: (data) => data.RECEIVABLES,
        main: true,
        level: 2
    },
    {
        label: 'Inventories',
        value: (data) => data.INVENTORIES,
        main: true,
        level: 2
    },
    {
        label: 'Deferred income taxes',
        value: (data) =>
            data.DEFERRED_INCOME_TAXES_CURRENT_ASSETS,
        level: 2    
    },
    {
        label: 'Income tax receivable',
        value: (data) => data.INCOME_TAX_RECEIVABLE,
        level: 2
    },
    {
        label: 'Prepaid expenses',
        value: (data) => data.PREPAID_EXPENSES,
        level: 2
    },
    {
        label: 'Other current assets',
        value: (data) => data.OTHER_CURRENT_ASSETS,
        level: 2
    },
    {
        label: 'Total non-current assets',
        value: (data) => data.TOTAL_NON_CURRENT_ASSETS,
        level: 1
    },
    {
        label: 'Net property, plant and equipment',
        value: (data) => data.NET_PROPERTY_PLANT_AND_EQUIPMENT,
        main: true,
        level: 2
    },
    {
        label: 'Property and equipment at cost',
        value: (data) =>
            data.PROPERTY_AND_EQUIPMENT_AT_COST,
        level: 3
    },
    {
        label: 'Land',
        value: (data) => data.LAND,
        level: 4
    },
    {
        label: 'Fixtures and equipment',
        value: (data) =>
            data.FIXTURES_AND_EQUIPMENT,
        level: 4
    },
    {
        label: 'Other properties',
        value: (data) => data.OTHER_PROPERTIES,
        level: 4
    },
    {
        label: 'Gross property, plant and equipment',
        value: (data) =>
            data.GROSS_PROPERTY_PLANT_AND_EQUIPMENT,
        level: 3
    },
    {
        label: 'Accumulated depriciation',
        value: (data) => data.ACCUMULATED_DEPRECIATION,
        level: 3
    },
    {
        label: 'Investments',
        value: (data) => data.INVESTMENTS,
        level: 2
    },
    {
        label: 'Intangible assets',
        value: (data) => data.INTANGIBLE_ASSETS,
        main: true,
        level: 2
    },
    {
        label: 'Deferred income taxes',
        value: (data) =>
            data.DEFERRED_INCOME_TAXES_NON_CURRENT_ASSETS,
        level: 2
    },
    {
        label: 'Goodwill',
        value: (data) => data.GOODWILL,
        main: true,
        level: 2
    },
    {
        label: 'Other long-term assets',
        value: (data) => data.OTHER_LONG_TERM_ASSETS,
        main: true,
        level: 2
    },
    {
        label: "Total liabilities and stockholders' equity",
        value: (data) => data.TOTAL_LIABILITIES_AND_STOCKHOLDERS_EQUITY
    },
    {
        label: 'Total liabilities',
        value: (data) => data.TOTAL_LIABILITIES,
        level: 1,
        main: true
    },
    {
        label: 'Total current liabilities',
        value: (data) => data.TOTAL_CURRENT_LIABILITIES,
        level: 2,
        main: true
    },
    {
        label: 'Short-term debt',
        value: (data) => data.SHORT_TERM_DEBT,
        level: 3
    },
    {
        label: 'Capital leases',
        value: (data) =>
            data.CAPITAL_LEASES_CURRENT_LIABILITIES,
        level: 3
    },
    {
        label: 'Accounts payable',
        value: (data) => data.ACCOUNTS_PAYABLE,
        level: 3
    },
    {
        label: 'Deferred income taxes',
        value: (data) =>
            data.DEFERRED_INCOME_TAXES_CURRENT_LIABILITIES,
        level: 3
    },
    {
        label: 'Deferred revenues',
        value: (data) =>
            data.DEFERRED_REVENUES_CURRENT_LIABILITIES,
        level: 3
    },
    {
        label: 'Accured liabilities',
        value: (data) => data.ACCURED_LIABILITIES,
        level: 3
    },
    {
        label: 'Employee compensation and benefits',
        value: (data) =>
            data.EMPLOYEE_COMPENSATION_AND_BENEFITS,
        level: 3
    },
    {
        label: 'Other current  liabilities',
        value: (data) => data.OTHER_CURRENT_LIABILITIES,
        level: 3
    },
    {
        label: 'Total non-current liabilities',
        value: (data) => data.TOTAL_NON_CURRENT_LIABILITIES,
        level: 2
    },
    {
        label: 'Long-term debt',
        value: (data) => data.LONG_TERM_DEBT,
        level: 3
    },
    {
        label: 'Capital leases',
        value: (data) =>
            data.CAPITAL_LEASES_NON_CURRENT_LIABILITIES,
        level: 3
    },
    {
        label: 'Deferred taxes liabilities',
        value: (data) =>
            data.DEFERRED_TAXES_LIABILITIES,
        level: 3
    },
    {
        label: 'Deferred revenues',
        value: (data) =>
            data.DEFERRED_REVENUES_NON_CURRENT_LIABILITIES,
        level: 3
    },
    {
        label: 'Minority interest',
        value: (data) =>
            data.MINORITY_INTEREST_NON_CURRENT_LIABILITIES,
        level: 3
    },
    {
        label: 'Pensions and other benefits',
        value: (data) =>
            data.PENSIONS_AND_OTHER_BENEFITS,
        level: 3
    },
    {
        label: 'Contingent liabilities',
        value: (data) => data.CONTINGENT_LIABILITIES,
        level: 3
    },
    {
        label: 'Other long-term liabilities',
        value: (data) =>
            data.OTHER_LONG_TERM_LIABILITIES,
        level: 3
    },
    {
        label: "Total stockholders' equity",
        value: (data) => data.TOTAL_STOCKHOLDERS_EQUITY,
        level: 1
    },
    {
        label: "Total company stockholders' equity",
        value: (data) => data.TOTAL_COMPANY_STOCKHOLDERS_EQUITY,
        level: 2,
        main: true
    },
    {
        label: 'Common stock',
        value: (data) => data.COMMON_STOCK,
        level: 3
    },
    {
        label: 'Additional paid-in capital',
        value: (data) =>
            data.ADDITIONAL_PAID_IN_CAPITAL,
        level: 3
    },
    {
        label: 'Retained earnings',
        value: (data) => data.RETAINED_EARNINGS,
        level: 3
    },
    {
        label: 'Treasury stock',
        value: (data) => data.TREASURY_STOCK,
        level: 3
    },
    {
        label: 'Accumulated other comprehensive income',
        value: (data) =>
            data.ACCUMULATED_OTHER_COMPREHENSIVE_INCOME,
        level: 3
    },
    {
        label: 'Preferred stock',
        value: (data) => data.PREFERRED_STOCK,
        level: 2
    },
    {
        label: 'Noncontrolling interest',
        value: (data) => data.NONCONTROLLING_INTEREST,
        level: 2
    },
]

export const cashFlowStructure: LabelData<CashFlow>[] = [
    {
        label: 'Net cash provided by operating activities',
        value: (data) => data.NET_CASH_PROVIDED_BY_OPERATING_ACTIVITIES,
        main: true
    },
    {
        label: 'Net income',
        value: (data) => data.NET_INCOME_CASH_FLOW,
        level: 1
    },
    {
        label: 'Depreciation & amortization',
        value: (data) => data.DEPRECATION_AND_AMORTIZATION_CASH_FLOW,
        main: true,
        level: 1
    },
    {
        label: 'Provision for doubtful accounts and inventory obsolescence',
        value: (data) =>
            data.PROVISION_FOR_DOUBTFUL_ACCOUNTS_AND_INVENTORY_OBSOLENCE,
        level: 1
    },
    {
        label: 'Deferred income taxes',
        value: (data) => data.DEFERRED_INCOME_TAXES,
        level: 1
    },
    {
        label: 'Share-based compensation',
        value: (data) => data.SHARE_BASED_COMPENSATION,
        level: 1
    },
    {
        label: 'Asset impairement',
        value: (data) => data.ASSET_IMPAIMENT,
        level: 1
    },
    {
        label: 'Goodwill impairement',
        value: (data) => data.GOODWILL_IMPAIMENT,
        level: 1
    },
    {
        label: '(Gain) Loss from discontinuing operations',
        value: (data) => data.LOSS_FROM_DISCONTINUING_OPERATIONS,
        level: 1
    },
    {
        label: 'Accounts receivable',
        value: (data) => data.ACCOUNTS_RECEIVABLE,
        level: 1
    },
    {
        label: 'Inventory',
        value: (data) => data.INVENTORY,
        level: 1
    },
    {
        label: 'Prepaid expenses, deferred costs and other current assets',
        value: (data) =>
            data.PREPAID_EXPENSES_DEFERRED_COSTS_AND_OTHER_CURRENT_ASSETS,
        level: 1
    },
    {
        label: 'Accounts payable',
        value: (data) => data.ACCOUNTS_PAYABLE_CASH_FLOW,
        level: 1
    },
    {
        label: 'Accrued liabilities',
        value: (data) => data.ACCURED_LIABILITIES_CASH_FLOW,
        level: 1
    },
    {
        label: 'Income taxes payable',
        value: (data) => data.INCOME_TAXES_PAYABLE,
        level: 1
    },
    {
        label: 'Deferred credits and other liabilities',
        value: (data) => data.DEFERRED_CREDITS_AND_OTHER_LIABILITIES,
        level: 1
    },
    {
        label: 'Other working capital',
        value: (data) => data.OTHER_WORKING_CAPITAL,
        level: 1
    },
    {
        label: 'Other non-cash items',
        value: (data) => data.OTHER_NON_CASH_ITEMS,
        level: 1
    },
    {
        label: 'Net cash used for investing activities',
        value: (data) => data.NET_CASH_USED_FOR_INVESTING_ACTIVITIES,
        main: true
    },
    {
        label: 'Investment in property, plant and equipment',
        value: (data) =>
            data.INVESTMENT_IN_PROPERTY_PLANT_AND_EQUIPMENT,
        level: 1
    },
    {
        label: 'Property, plan and equipment reductions',
        value: (data) => data.PROPERTY_PLANT_AND_EQUIPMENT_REDUCTIONS,
        level: 1
    },
    {
        label: 'Capital expenditure',
        value: (data) => data.CAPITAL_EXPENDITURE_CASH_FLOW,
        level: 1
    },
    {
        label: 'Acquisitions, net',
        value: (data) => data.NET_ACQUISITIONS,
        level: 1
    },
    {
        label: 'Investment in unconsolidated affiliates',
        value: (data) => data.INVESTMENTS_IN_UNCONSOLIDATED_AFFILIATES,
        level: 1
    },
    {
        label: 'Purchases of investments',
        value: (data) => data.PURCHASES_OF_INVESTMENTS,
        level: 1
    },
    {
        label: 'Sales/Maturities of investements',
        value: (data) => data.SALES_MATURITIES_OF_INVESTMENTS,
        level: 1
    },
    {
        label: 'Purchases of intangibles',
        value: (data) => data.PURCHASES_OF_INTANGIBLES,
        level: 1
    },
    {
        label: 'Other investing charges',
        value: (data) => data.OTHER_INVESTING_CHARGES,
        level: 1
    },
    {
        label: 'Net cash provided by (used for) financing activities',
        value: (data) => data.NET_CASH_USED_FOR_FINANCING_ACTIVITIES,
        main: true
    },
    {
        label: 'Debt issued',
        value: (data) => data.DEBT_ISSUED,
        level: 1
    },
    {
        label: 'Short-term borrowing',
        value: (data) => data.SHORT_TERM_BORROWING,
        level: 2
    },
    {
        label: 'Long-term debt issued',
        value: (data) => data.LONG_TERM_DEBT_ISSUED,
        level: 2
    },
    {
        label: 'Debt repayment',
        value: (data) => data.DEBT_REPAYMENT,
        level: 1
    },
    {
        label: 'Short-term debt repayment',
        value: (data) => data.SHORT_TERM_DEBT_REPAYMENT,
        level: 2
    },
    {
        label: 'Long-term debt repayment',
        value: (data) => data.LONG_TERM_DEBT_REPAYMENT,
        level: 2
    },
    {
        label: 'Common stock issued',
        value: (data) => data.COMMON_STOCK_ISSUED,
        level: 1
    },
    {
        label: 'Preferred stock issued',
        value: (data) => data.PREFERRED_STOCK_ISSUED,
        level: 1
    },
    {
        label: 'Common stock repurchassed',
        value: (data) => data.COMMON_STOCK_REPURCHASED,
        level: 1,
        main: true,
    },
    {
        label: 'Repurchases of treasury stocks',
        value: (data) => data.REPURCHASES_OF_TREASURY_STOCKS,
        level: 1
    },
    {
        label: 'Dividend paid',
        value: (data) => data.DIVIDENDS_PAID,
        level: 1
    },
    {
        label: 'Proceeds from exercise of stock options',
        value: (data) => data.PROCEEDS_FROM_EXERCISE_OF_STOCK_OPTIONS,
        level: 1
    },
    {
        label: 'Debt issuance costs paid',
        value: (data) => data.DEBT_ISSUANCE_COSTS_PAID,
        level: 1
    },
    {
        label: 'Other financing activities',
        value: (data) => data.OTHER_FINANCING_ACTIVITIES,
        level: 1
    },
    {
        label: 'Effect of exchance rate changes',
        value: (data) => data.EFFECT_OF_EXCHANGE_RATE_CHANGES,
        main: true,
    },
    {
        label: 'Net change in cash',
        value: (data) => data.NET_CHANGE_IN_CASH,
    },
    {
        label: 'Cash at beginning of period',
        value: (data) => data.CASH_AT_BEGINNING_OF_PERIOD,
    },
    {
        label: 'Cash at end of period',
        value: (data) => data.CASH_AT_END_OF_PERIOD,
    },
    {
        label: 'Free cash flow',
        value: (data) => data.FREE_CASH_FLOW
    },
    {
        label: 'Operating cash flow',
        value: (data) => data.OPERATING_CASH_FLOW,
        level: 1
    },
    {
        label: 'Capital expenditure',
        value: (data) => data.CAPITAL_EXPENDITURE_CASH_FLOW,
        level: 1
    },
    {
        label: 'Cash paid for income taxes',
        value: (data) => data.CASH_PAID_FOR_INCOME_TAXES,
    },
    {
        label: 'Cash paid for interest',
        value: (data) => data.CASH_PAID_FOR_INTEREST,
    },
]
