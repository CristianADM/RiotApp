import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Campeon, CampeonRespuesta, Data } from '../../interfaces/campeon';
import { RiotServiceService } from '../../services/riot-service.service';

@Component({
  selector: 'app-campeon',
  templateUrl: './campeon.component.html',
  styleUrls: ['./campeon.component.css'],
})
export class CampeonComponent implements OnInit {
  campeon: Campeon;
  idcampeon: string;
  loading: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private _ritoService: RiotServiceService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    
    this.activateRoute.params.subscribe((parametros) => {
      this.idcampeon = parametros['idCampeon'];
    });

    this._ritoService.getCampeonbyName(this.idcampeon).subscribe((resp) => {
      this.campeon = resp[this.idcampeon];
      console.log(this.campeon);
      this.loading = false;
    });
  }
}
