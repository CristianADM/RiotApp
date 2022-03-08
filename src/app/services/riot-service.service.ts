import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { CampeonesResponse } from '../interfaces/campeones';
import { CampeonRespuesta } from '../interfaces/campeon';
import { RankingResponse } from '../interfaces/ranking';
import { SummonerResponse } from '../interfaces/sumoner';
import { MaestryResponse } from '../interfaces/maestrias';

@Injectable({
  providedIn: 'root'
})
export class RiotServiceService {

  private baseUrl: string = "api.riotgames.com/lol"
  private api_key:string = "RGAPI-5cb5881c-65f9-41c6-9fa6-b4a3b506d7c8";

  private partidas;

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
    return this.http.get<SummonerResponse>(`https://la1.${this.baseUrl}/summoner/v4/summoners/by-name/${nombreInvocador}?api_key=${this.api_key}`);
  }

  public getMaestriasCampeones(idInvocador: string){
    return this.http.get<MaestryResponse>(`https://la1.${this.baseUrl}/champion-mastery/v4/champion-masteries/by-summoner/${idInvocador}?api_key=${this.api_key}`);
  }

  public getPartidasbyPUid(puid: string){

    /* PREGUNTAR: 
      ¿por que cuando creo una variable y se la asigno me muestra undefiend?

      let partidas;
      this.http.get(`https://americas.${this.baseUrl}/match/v5/matches/by-puuid/${puid}/ids?start=0&count=10&api_key=${this.api_key}`).subscribe((resp: any[]) => {
      partidas = resp;
    });
      */

    this.http.get(`https://americas.${this.baseUrl}/match/v5/matches/by-puuid/${puid}/ids?start=0&count=10&api_key=${this.api_key}`).subscribe((resp) => { 
      this.partidas = resp; 
    });


    console.log(this.partidas);
  }

}
