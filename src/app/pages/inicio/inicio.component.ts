import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datum } from '../../interfaces/campeones';
import { RiotServiceService } from '../../services/riot-service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  campeones: Datum[];
  loading: boolean;

  constructor(private _ritoService: RiotServiceService, 
              private router: Router) {

    this.loading = true;

    this.consultarCampeones();

    this.loading = false;
  }

  ngOnInit(): void {
  }

  consultarCampeones(){
    this._ritoService.getCampeones().subscribe((data)=>{
      console.log(data);
      this.campeones = data;
    });
  }

  verCampeon(idCampeon: string){
    this.router.navigate(["/campeon", idCampeon]);
  }

}
