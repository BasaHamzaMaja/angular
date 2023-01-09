import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {KorisnikService} from "../servisi/korisnik.service";

@Component({
  selector: 'app-recenzija',
  templateUrl: './recenzija.component.html',
  styleUrls: ['./recenzija.component.css']
})
export class RecenzijaComponent implements OnInit {

  recenzija:any;
  id:number;
  sub:any;
  novaRecenzija:any = null;
  korisnici:any;

  constructor(private httpKlijent : HttpClient, private ruter : ActivatedRoute, private jwtHelper : JwtHelperService) { }

  ngOnInit(): void {
      this.sub = this.ruter.params.subscribe((res:any) =>{
        this.id = +res['id'];
        this.loadRecenzije();
      });
      this.loadKorisnik();
  }

  loadRecenzije(){
    this.httpKlijent.get("https://localhost:7025/Recenzija/GetRecenzije/" + this.id).subscribe((res:any) =>{
      this.recenzija = res;
    })
  }

  loadKorisnik(){
    this.httpKlijent.get("https://localhost:7025/Recenzija/GetKorisnike/").subscribe((x:any)=>{
      this.korisnici = x;
    })
  }

  dodajRecenziju(){
    this.novaRecenzija = {
      id:this.id,
      opis:"",
      ocjena:"",
      korisnik:""
    };
  }

  recenziraj(){
    this.httpKlijent.post("https://localhost:7025/Recenzija/Recenziraj/" + this.id, this.novaRecenzija).subscribe((res:any) =>{
      this.novaRecenzija = null;
    })
  }

  public GetUserName = (): string => {
    const token = localStorage.getItem("token");
    const decodedToken = this.jwtHelper.decodeToken(token);
    const name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname']
    return name;
  }
}
