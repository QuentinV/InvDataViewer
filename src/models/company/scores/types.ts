export interface CompanyScores {
    businessModel?: number;
    moat?: MoatScores;
    score?: number;
}

export interface MoatScores {
    moat?: number;
    trend?: number;
    result?: number;
}