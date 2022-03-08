export interface MaestryResponse {
    championId:                   number;
    championLevel:                number;
    championPoints:               number;
    lastPlayTime:                 number;
    championPointsSinceLastLevel: number;
    championPointsUntilNextLevel: number;
    chestGranted:                 boolean;
    tokensEarned:                 number;
    summonerId:                   string;
}

export enum SummonerID {
    The1D0VT471UgPQCC8Meka1FUvpcmzVZOWV7DjdHDKNqw = "1D0V-t471ug-PQCC8Meka1fUvpcmzVZOWV7djdHDKNqw",
}
