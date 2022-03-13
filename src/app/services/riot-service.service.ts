import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, of } from 'rxjs';
import { catchError, map} from 'rxjs/operators';

import { CampeonesResponse } from '../interfaces/campeones';
import { CampeonRespuesta } from '../interfaces/campeon';
import { RankingResponse } from '../interfaces/ranking';
import { SummonerResponse } from '../interfaces/sumoner';
import { MaestryResponse } from '../interfaces/maestrias';
import { PartidaResponse } from '../interfaces/Partida';

@Injectable({
  providedIn: 'root'
})
export class RiotServiceService {

  private baseUrl: string = "api.riotgames.com/lol"
  private api_key:string = "RGAPI-e1b8b834-ea04-4630-af93-d36c185d74ac";

  private partidas: any[];

  constructor(private http: HttpClient) { }


  public getCampeones() {
    
    return this.http.get<CampeonesResponse>("https://ddragon.leagueoflegends.com/cdn/12.4.1/data/es_ES/champion.json")
            .pipe(
              map((resp) => Object.values(resp.data)),
            );
  }

  public getCampeonbyName(idCampeon: string){
    return this.http.get<CampeonRespuesta>(`http://ddragon.leagueoflegends.com/cdn/12.4.1/data/es_ES/champion/${idCampeon}.json`)
                    .pipe(
                      map((resp) => (resp.data))
                    );
  }

  public getRanking(){
    return this.http.get<RankingResponse[]>(`https://la1.${this.baseUrl}/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=1&api_key=${this.api_key}`);
  }

  public getInvocadorById(idInvocador: string){
    return this.http.get<SummonerResponse>(`https://la1.${this.baseUrl}/summoner/v4/summoners/${idInvocador}?api_key=${this.api_key}`);
  }

  public getInvocadorByNombre(nombreInvocador: string){
    return this.http.get<SummonerResponse>(`https://la1.${this.baseUrl}/summoner/v4/summoners/by-name/${nombreInvocador}?api_key=${this.api_key}`).pipe(
      catchError((err) => of(null))
    );
  }

  public getMaestriasCampeones(idInvocador: string){
    return this.http.get<MaestryResponse>(`https://la1.${this.baseUrl}/champion-mastery/v4/champion-masteries/by-summoner/${idInvocador}?api_key=${this.api_key}`);
  }

  public async getPartidasbyPUid(puid: string){
    let partidasid: any[] = [];
    let partidas: PartidaResponse[] = [];
    /* PREGUNTAR: 
      ¿por que cuando creo una variable y se la asigno me muestra undefiend?

      let partidas;
      this.http.get(`https://americas.${this.baseUrl}/match/v5/matches/by-puuid/${puid}/ids?start=0&count=10&api_key=${this.api_key}`).subscribe((resp: any[]) => {
      partidas = resp;
    });
      */

    partidasid = await firstValueFrom(this.http.get<any[]>(`https://americas.${this.baseUrl}/match/v5/matches/by-puuid/${puid}/ids?start=0&count=10&api_key=${this.api_key}`));

    console.log(partidasid);

    for(let i = 0; i < partidasid.length; i++){
      //https://americas.api.riotgames.com/lol/match/v5/matches/LA1_1212965413?api_key=RGAPI-628e9ac6-03ca-4f78-8b9e-eb4d20705aaa
      var partida = await firstValueFrom(this.http.get<PartidaResponse>(`https://americas.${this.baseUrl}/match/v5/matches/${partidasid[i]}?api_key=${this.api_key}`));
      partidas.push(partida);
    }
    
    return partidas;
  }

}
