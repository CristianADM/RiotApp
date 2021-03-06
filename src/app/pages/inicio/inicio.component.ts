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
  page: number;

  constructor(private _ritoService: RiotServiceService, 
              private router: Router) {
  }

  ngOnInit(): void {
    this.loading = true;

    this._ritoService.getCampeones().subscribe((data)=>{
      console.log(data);
      this.campeones = data;
    });

    this.loading = false;
  }

  verCampeon(idCampeon: string){
    this.router.navigate(["/campeon", idCampeon]);
  }

}
