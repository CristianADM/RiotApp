import { Component, OnInit } from '@angular/core';
import { RankingResponse } from 'src/app/interfaces/ranking';
import { RiotServiceService } from '../../services/riot-service.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  jugadores: RankingResponse[] = [];
  loading: boolean;
  page:number;

  constructor(private _riotService: RiotServiceService) {

    this.loading = true;

    this._riotService.getRanking().subscribe((resp: RankingResponse[]) => {
      console.log(resp);
      this.jugadores = resp;
      this.loading = false;
    });
  }

  ngOnInit(): void {
  }

}
