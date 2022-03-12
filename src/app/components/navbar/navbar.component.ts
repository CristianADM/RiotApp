import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RiotServiceService } from 'src/app/services/riot-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _riotService: RiotServiceService,
              private router: Router) { }

  ngOnInit(): void {
  }

  buscarInvocador(nombreInvocador: string){

    nombreInvocador = nombreInvocador.trim();

    if(nombreInvocador.length === 0){
      return;
    }

    this._riotService.getInvocadorByNombre(nombreInvocador).subscribe((resp) => {
      this.router.navigate(["/invocador", resp.id]);
    });

  }

}
