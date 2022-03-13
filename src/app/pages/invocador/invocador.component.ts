import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidaResponse } from 'src/app/interfaces/Partida';
import { Datum } from '../../interfaces/campeones';
import { MaestryResponse } from '../../interfaces/maestrias';
import { SummonerResponse } from '../../interfaces/sumoner';
import { RiotServiceService } from '../../services/riot-service.service';

@Component({
  selector: 'app-invocador',
  templateUrl: './invocador.component.html',
  styleUrls: ['./invocador.component.css']
})
export class InvocadorComponent implements OnInit {

  invocador: SummonerResponse;
  maestriaCampeones: MaestryResponse[] = [];
  campeones: Datum[];
  partidas: PartidaResponse[] = [];
  existeInvovador: boolean;

  idInvocador :string ="";
  loading: boolean;

  constructor(private _riotService: RiotServiceService,
              private activateRouter: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    
    this.loading = true;
    
    this.existeInvovador = true;

    this.activateRouter.params.subscribe((parametros) => {
      this.idInvocador = parametros["idInvocador"];
    });

    if(this.idInvocador === "noexiste"){
      this.existeInvovador = false;
      this.loading = false;
      return;
    }


    this._riotService.getInvocadorById(this.idInvocador).subscribe((resp) => {
      this.invocador = resp;
    });

    this._riotService.getCampeones().subscribe((resp) => {
      this.campeones = resp;
    });

    this._riotService.getMaestriasCampeones(this.idInvocador).subscribe((resp) => {
      let champions: any[] = [];
      for(let i = 0; i < 3; i++){
        this.maestriaCampeones.push(resp[i]);
        champions.push(this.campeones.find(campeon => campeon.key === ""+resp[i].championId));
      }

      this.campeones = champions;
      console.log(this.campeones);
      console.log(this.maestriaCampeones);

      this._riotService.getPartidasbyPUid(this.invocador.puuid).then((resp)=>{
        this.partidas = resp;
        console.log(this.partidas);
      });

      this.loading = false;
    });

  }

}
