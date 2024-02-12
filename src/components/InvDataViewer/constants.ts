import { BalanceSheet, CashFlow, IncomeStatement, LabelData } from './types'

export const incomeStatementStructure: LabelData<IncomeStatement>[] = [
    {
        label: 'Revenue',
        value: (data) => data.REVENUE,
        main: true,
    },
    {
        label: 'Cost of revenue',
        value: (data) => data.COST_OF_REVENUE,
        main: true,
    },
    {
        label: 'Gross profit',
        value: (data) => data.GROSS_PROFIT,
    },
    {
        label: 'Total operating expenses',
        value: (data) => data.TOTAL_OPERATING_EXPENSES,
        children: [
            {
                label: 'Research and development',
                value: (data) => data.RESEARCH_AND_DEVELOPMENT,
                main: true,
            },
            {
                label: 'Sales, General and administrative',
                value: (data) => data.SALES_GENERAL_AND_ADMINISTRATIVE,
                main: true,
            },
            {
                label: 'Depreciation and Amortization',
                value: (data) => data.DEPRECATION_AND_AMORTIZATION,
            },
            {
                label: 'Other operating expenses',
                value: (data) => data.OTHER_OPERATING_EXPENSES,
            },
        ],
    },
    {
        label: 'Operating income',
        value: (data) => data.OPERATING_INCOME,
        main: true,
    },
    {
        label: 'Interest expense',
        value: (data) => data.INTEREST_EXPENSES,
        main: true,
    },
    {
        label: 'Other income (expense)',
        value: (data) => data.OTHER_INCOME_EXPENSE,
    },
    {
        label: 'Income before taxes',
        value: (data) => data.INCOME_BEFORE_TAXES,
        main: true,
    },
    {
        label: 'Provision for income taxes',
        value: (data) => data.PROVISION_FOR_INCOME_TAXES,
    },
    {
        label: 'Minority interest',
        value: (data) => data.MINORITY_INTEREST,
    },
    {
        label: 'Other income',
        value: (data) => data.OTHER_INCOME,
    },
    {
        label: 'Net income from continuing operations',
        value: (data) => data.NET_INCOME_FROM_CONTINUING_OPERATIONS,
    },
    {
        label: 'Net income rom discontinuing operations',
        value: (data) => data.NET_INCOME_FROM_DISCONTINUING_OPERATIONS,
    },
    {
        label: 'Other',
        value: (data) => data.OTHER,
    },
    {
        label: 'Net income',
        value: (data) => data.NET_INCOME,
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
        label: 'Earnings per share',
        children: [
            {
                label: 'Basic',
                value: (data) => data.EARNINGS_PER_SHARE_BASIC,
            },
            {
                label: 'Diluted',
                value: (data) => data.EARNINGS_PER_SHARE_DILUTED,
                main: true,
            },
        ],
    },
    {
        label: 'Weighted average shares outstanding',
        children: [
            {
                label: 'Basic',
                value: (data) => data.WEIGHTED_AVERAGE_SHARES_OUTSTANDING_BASIC,
            },
            {
                label: 'Diluted',
                value: (data) =>
                    data.WEIGHTED_AVERAGE_SHARES_OUTSTANDING_DILUTED,
                main: true,
            },
        ],
    },
    {
        label: 'Cash dividends per share',
        value: (data) => data.CASH_DIVIDENDS_PER_SHARE,
    },
    {
        label: 'EBITDA',
    },
]

export const balanceSheetStructure: LabelData<BalanceSheet>[] = [
    {
        label: 'Total assets',
        value: (data) => data.TOTAL_ASSETS,
        main: true,
        children: [
            {
                label: 'Total current assets',
                value: (data) => data.TOTAL_CURRENT_ASSETS,
                main: true,
                children: [
                    {
                        label: 'Total cash',
                        value: (data) => data.TOTAL_CASH,
                        children: [
                            {
                                label: 'Cash and cash equivalents',
                                value: (data) => data.CASH_AND_CASH_EQUIVALENTS,
                                main: true,
                            },
                            {
                                label: 'Short-term investments',
                                value: (data) => data.SHORT_TERM_INVESTMENTS,
                            },
                        ],
                    },
                    {
                        label: 'Marketable securities',
                        value: (data) => data.MARKETABLE_SECURITIES,
                    },
                    {
                        label: 'Receivables',
                        value: (data) => data.RECEIVABLES,
                        main: true,
                    },
                    {
                        label: 'Inventories',
                        value: (data) => data.INVENTORIES,
                        main: true,
                    },
                    {
                        label: 'Deferred income taxes',
                        value: (data) =>
                            data.DEFERRED_INCOME_TAXES_CURRENT_ASSETS,
                    },
                    {
                        label: 'Income tax receivable',
                        value: (data) => data.INCOME_TAX_RECEIVABLE,
                    },
                    {
                        label: 'Prepaid expenses',
                        value: (data) => data.PREPAID_EXPENSES,
                    },
                    {
                        label: 'Other current assets',
                        value: (data) => data.OTHER_CURRENT_ASSETS,
                    },
                ],
            },
            {
                label: 'Total non-current assets',
                value: (data) => data.TOTAL_NON_CURRENT_ASSETS,
                children: [
                    {
                        label: 'Net property, plant and equipment',
                        value: (data) => data.NET_PROPERTY_PLANT_AND_EQUIPMENT,
                        main: true,
                        children: [
                            {
                                label: 'Property and equipment at cost',
                                value: (data) =>
                                    data.PROPERTY_AND_EQUIPMENT_AT_COST,
                                children: [
                                    {
                                        label: 'Land',
                                        value: (data) => data.LAND,
                                    },
                                    {
                                        label: 'Fixtures and equipment',
                                        value: (data) =>
                                            data.FIXTURES_AND_EQUIPMENT,
                                    },
                                    {
                                        label: 'Other properties',
                                        value: (data) => data.OTHER_PROPERTIES,
                                    },
                                ],
                            },
                            {
                                label: 'Gross property, plant and equipment',
                                value: (data) =>
                                    data.GROSS_PROPERTY_PLANT_AND_EQUIPMENT,
                            },
                            {
                                label: 'Accumulated depriciation',
                                value: (data) => data.ACCUMULATED_DEPRECIATION,
                            },
                        ],
                    },
                    {
                        label: 'Investments',
                        value: (data) => data.INVESTMENTS,
                    },
                    {
                        label: 'Intangible assets',
                        value: (data) => data.INTANGIBLE_ASSETS,
                        main: true,
                    },
                    {
                        label: 'Deferred income taxes',
                        value: (data) =>
                            data.DEFERRED_INCOME_TAXES_NON_CURRENT_ASSETS,
                    },
                    {
                        label: 'Goodwill',
                        value: (data) => data.GOODWILL,
                        main: true,
                    },
                    {
                        label: 'Other long-term assets',
                        value: (data) => data.OTHER_LONG_TERM_ASSETS,
                        main: true,
                    },
                ],
            },
        ],
    },
    {
        label: "Total liabilities and stockholders' equity",
        value: (data) => data.TOTAL_LIABILITIES_AND_STOCKHOLDERS_EQUITY,
        children: [
            {
                label: 'Total liabilities',
                value: (data) => data.TOTAL_LIABILITIES,
                main: true,
                children: [
                    {
                        label: 'Total current liabilities',
                        value: (data) => data.TOTAL_CURRENT_LIABILITIES,
                        main: true,
                        children: [
                            {
                                label: 'Short-term debt',
                                value: (data) => data.SHORT_TERM_DEBT,
                            },
                            {
                                label: 'Capital leases',
                                value: (data) =>
                                    data.CAPITAL_LEASES_CURRENT_LIABILITIES,
                            },
                            {
                                label: 'Accounts payable',
                                value: (data) => data.ACCOUNTS_PAYABLE,
                            },
                            {
                                label: 'Deferred income taxes',
                                value: (data) =>
                                    data.DEFERRED_INCOME_TAXES_CURRENT_LIABILITIES,
                            },
                            {
                                label: 'Deferred revenues',
                                value: (data) =>
                                    data.DEFERRED_REVENUES_CURRENT_LIABILITIES,
                            },
                            {
                                label: 'Accured liabilities',
                                value: (data) => data.ACCURED_LIABILITIES,
                            },
                            {
                                label: 'Employee compensation and benefits',
                                value: (data) =>
                                    data.EMPLOYEE_COMPENSATION_AND_BENEFITS,
                            },
                            {
                                label: 'Other current  liabilities',
                                value: (data) => data.OTHER_CURRENT_LIABILITIES,
                            },
                        ],
                    },
                    {
                        label: 'Total non-current liabilities',
                        value: (data) => data.TOTAL_NON_CURRENT_LIABILITIES,
                        children: [
                            {
                                label: 'Long-term debt',
                                value: (data) => data.LONG_TERM_DEBT,
                            },
                            {
                                label: 'Capital leases',
                                value: (data) =>
                                    data.CAPITAL_LEASES_NON_CURRENT_LIABILITIES,
                            },
                            {
                                label: 'Deferred taxes liabilities',
                                value: (data) =>
                                    data.DEFERRED_TAXES_LIABILITIES,
                            },
                            {
                                label: 'Deferred revenues',
                                value: (data) =>
                                    data.DEFERRED_REVENUES_NON_CURRENT_LIABILITIES,
                            },
                            {
                                label: 'Minority interest',
                                value: (data) =>
                                    data.MINORITY_INTEREST_NON_CURRENT_LIABILITIES,
                            },
                            {
                                label: 'Pensions and other benefits',
                                value: (data) =>
                                    data.PENSIONS_AND_OTHER_BENEFITS,
                            },
                            {
                                label: 'Contingent liabilities',
                                value: (data) => data.CONTINGENT_LIABILITIES,
                            },
                            {
                                label: 'Other long-term liabilities',
                                value: (data) =>
                                    data.OTHER_LONG_TERM_LIABILITIES,
                            },
                        ],
                    },
                ],
            },
            {
                label: "Total stockholders' equity",
                value: (data) => data.TOTAL_STOCKHOLDERS_EQUITY,
                children: [
                    {
                        label: "Total company stockholders' equity",
                        value: (data) => data.TOTAL_COMPANY_STOCKHOLDERS_EQUITY,
                        main: true,
                        children: [
                            {
                                label: 'Common stock',
                                value: (data) => data.COMMON_STOCK,
                            },
                            {
                                label: 'Additional paid-in capital',
                                value: (data) =>
                                    data.ADDITIONAL_PAID_IN_CAPITAL,
                            },
                            {
                                label: 'Retained earnings',
                                value: (data) => data.RETAINED_EARNINGS,
                            },
                            {
                                label: 'Treasury stock',
                                value: (data) => data.TREASURY_STOCK,
                            },
                            {
                                label: 'Accumulated other comprehensive income',
                                value: (data) =>
                                    data.ACCUMULATED_OTHER_COMPREHENSIVE_INCOME,
                            },
                        ],
                    },
                    {
                        label: 'Preferred stock',
                        value: (data) => data.PREFERRED_STOCK,
                    },
                    {
                        label: 'Noncontrolling interest',
                        value: (data) => data.NONCONTROLLING_INTEREST,
                    },
                ],
            },
        ],
    },
]

export const cashFlowStructure: LabelData<CashFlow>[] = [
    {
        label: 'Net cash provided by operating activities',
        value: (data) => data.NET_CASH_PROVIDED_BY_OPERATING_ACTIVITIES,
        main: true,
        children: [
            {
                label: 'Net income',
                value: (data) => data.NET_INCOME_CASH_FLOW,
            },
            {
                label: 'Depreciation & amortization',
                value: (data) => data.DEPRECATION_AND_AMORTIZATION_CASH_FLOW,
                main: true,
            },
            {
                label: 'Provision for doubtful accounts and inventory obsolescence',
                value: (data) =>
                    data.PROVISION_FOR_DOUBTFUL_ACCOUNTS_AND_INVENTORY_OBSOLENCE,
            },
            {
                label: 'Deferred income taxes',
                value: (data) => data.DEFERRED_INCOME_TAXES,
            },
            {
                label: 'Share-based compensation',
                value: (data) => data.SHARE_BASED_COMPENSATION,
            },
            {
                label: 'Asset impairement',
                value: (data) => data.ASSET_IMPAIMENT,
            },
            {
                label: 'Goodwill impairement',
                value: (data) => data.GOODWILL_IMPAIMENT,
            },
            {
                label: '(Gain) Loss from discontinuing operations',
                value: (data) => data.LOSS_FROM_DISCONTINUING_OPERATIONS,
            },
            {
                label: 'Accounts receivable',
                value: (data) => data.ACCOUNTS_RECEIVABLE,
            },
            {
                label: 'Inventory',
                value: (data) => data.INVENTORY,
            },
            {
                label: 'Prepaid expenses, deferred costs and other current assets',
                value: (data) =>
                    data.PREPAID_EXPENSES_DEFERRED_COSTS_AND_OTHER_CURRENT_ASSETS,
            },
            {
                label: 'Accounts payable',
                value: (data) => data.ACCOUNTS_PAYABLE_CASH_FLOW,
            },
            {
                label: 'Accrued liabilities',
                value: (data) => data.ACCURED_LIABILITIES_CASH_FLOW,
            },
            {
                label: 'Income taxes payable',
                value: (data) => data.INCOME_TAXES_PAYABLE,
            },
            {
                label: 'Deferred credits and other liabilities',
                value: (data) => data.DEFERRED_CREDITS_AND_OTHER_LIABILITIES,
            },
            {
                label: 'Other working capital',
                value: (data) => data.OTHER_WORKING_CAPITAL,
            },
            {
                label: 'Other non-cash items',
                value: (data) => data.OTHER_NON_CASH_ITEMS,
            },
        ],
    },
    {
        label: 'Net cash used for investing activities',
        value: (data) => data.NET_CASH_USED_FOR_INVESTING_ACTIVITIES,
        main: true,
        children: [
            {
                label: 'Investment in property, plant and equipment',
                value: (data) =>
                    data.INVESTMENT_IN_PROPERTY_PLANT_AND_EQUIPMENT,
            },
            {
                label: 'Property, plan and equipment reductions',
                value: (data) => data.PROPERTY_PLANT_AND_EQUIPMENT_REDUCTIONS,
            },
            {
                label: 'Capital expenditure',
                value: (data) => data.CAPITAL_EXPENDITURE_CASH_FLOW,
            },
            {
                label: 'Acquisitions, net',
                value: (data) => data.NET_ACQUISITIONS,
            },
            {
                label: 'Investment in unconsolidated affiliates',
                value: (data) => data.INVESTMENTS_IN_UNCONSOLIDATED_AFFILIATES,
            },
            {
                label: 'Purchases of investments',
                value: (data) => data.PURCHASES_OF_INVESTMENTS,
            },
            {
                label: 'Sales/Maturities of investements',
                value: (data) => data.SALES_MATURITIES_OF_INVESTMENTS,
            },
            {
                label: 'Purchases of intangibles',
                value: (data) => data.PURCHASES_OF_INTANGIBLES,
            },
            {
                label: 'Other investing charges',
                value: (data) => data.OTHER_INVESTING_CHARGES,
            },
        ],
    },
    {
        label: 'Net cash provided by (used for) financing activities',
        value: (data) => data.NET_CASH_USED_FOR_FINANCING_ACTIVITIES,
        main: true,
        children: [
            {
                label: 'Debt issued',
                value: (data) => data.DEBT_ISSUED,
                children: [
                    {
                        label: 'Short-term borrowing',
                        value: (data) => data.SHORT_TERM_BORROWING,
                    },
                    {
                        label: 'Long-term debt issued',
                        value: (data) => data.LONG_TERM_DEBT_ISSUED,
                    },
                ],
            },
            {
                label: 'Debt repayment',
                value: (data) => data.DEBT_REPAYMENT,
                children: [
                    {
                        label: 'Short-term debt repayment',
                        value: (data) => data.SHORT_TERM_DEBT_REPAYMENT,
                    },
                    {
                        label: 'Long-term debt repayment',
                        value: (data) => data.LONG_TERM_DEBT_REPAYMENT,
                    },
                ],
            },
            {
                label: 'Common stock issued',
                value: (data) => data.COMMON_STOCK_ISSUED,
            },
            {
                label: 'Preferred stock issued',
                value: (data) => data.PREFERRED_STOCK_ISSUED,
            },
            {
                label: 'Common stock repurchassed',
                value: (data) => data.COMMON_STOCK_REPURCHASED,
                main: true,
            },
            {
                label: 'Repurchases of treasury stocks',
                value: (data) => data.REPURCHASES_OF_TREASURY_STOCKS,
            },
            {
                label: 'Dividend paid',
                value: (data) => data.DIVIDENDS_PAID,
            },
            {
                label: 'Proceeds from exercise of stock options',
                value: (data) => data.PROCEEDS_FROM_EXERCISE_OF_STOCK_OPTIONS,
            },
            {
                label: 'Debt issuance costs paid',
                value: (data) => data.DEBT_ISSUANCE_COSTS_PAID,
            },
            {
                label: 'Other financing activities',
                value: (data) => data.OTHER_FINANCING_ACTIVITIES,
            },
        ],
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
        value: (data) => data.FREE_CASH_FLOW,
        children: [
            {
                label: 'Operating cash flow',
                value: (data) => data.OPERATING_CASH_FLOW,
            },
            {
                label: 'Capital expenditure',
                value: (data) => data.CAPITAL_EXPENDITURE_CASH_FLOW,
            },
        ],
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
