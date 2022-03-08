export interface RankingResponse {
    leagueId:     string;
    queueType:    QueueType;
    tier:         Tier;
    rank:         Rank;
    summonerId:   string;
    summonerName: string;
    leaguePoints: number;
    wins:         number;
    losses:       number;
    veteran:      boolean;
    inactive:     boolean;
    freshBlood:   boolean;
    hotStreak:    boolean;
}

export enum QueueType {
    RANKEDSOLO5X5 = "RANKED_SOLO_5x5",
}

export enum Rank {
    I = "I",
}

export enum Tier {
    Challenger = "CHALLENGER",
}
