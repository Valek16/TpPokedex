import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../pokemon.service";
import {Auth} from "../models/Auth";
import {HttpHeaders} from "@angular/common/http";
import {Pokemon} from "../models/pokemon";
import {forkJoin, Observable} from "rxjs";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  responseLogin ?: Auth;
  pokemonTeamID ?: number[];
  pokemonTeam ?: Pokemon[];


  constructor(private pokemonService : PokemonService) { }

  ngOnInit(): void {
    this.login()
  }

  login(){
    this.pokemonService.postLogin().subscribe(data => {
        if(data.access_token){
          console.log("access token ok");
          this.responseLogin = data
        }
        //console.log(this.responseLogin?.access_token)
      }
    );
  }

  getTeamFromService(){
    document.getElementById("titre")!.style.display = "block"
    let header = new HttpHeaders()
    header = header.set("Authorization", "Bearer " + this.responseLogin?.access_token);
    console.log(header.get("Authorization"))
    this.pokemonService.getTeam(header).subscribe(data => {this.pokemonTeamID=data, console.log("getTeam : " + data),this.getTeamDetails()});
  }


  getTeamDetails(): void{
    //console.log("getTeamDetails")
    let pokemonsObs: Observable<Pokemon>[] = this.pokemonTeamID!.map(id => this.pokemonService.getPokemon(id))
    forkJoin(pokemonsObs).subscribe(data => {
      this.pokemonTeam = data
      //console.log(this.pokemonTeam)
    })
  }

  putTeam(): void{
    //console.log("putTeam")
    let header = new HttpHeaders()
    header = header.set("Authorization", "Bearer " + this.responseLogin?.access_token)
    //console.log(header.get("Authorization"))
    this.pokemonService.putTeam(this.pokemonTeamID!, header).subscribe(data => {
      this.getTeamFromService()
    })
  }

  deletePokemonById(id?: number): void{
    //console.log("Delete : " + id)
    if(this.pokemonTeamID!.length > 1){
      this.pokemonTeamID?.splice(this.pokemonTeamID?.indexOf(id!), 1)
      this.putTeam()
    }
  }

  addPokemonById(id?: number): void{
    //console.log("Add : " + id)
    if(this.pokemonTeamID!.length < 6){
      this.pokemonTeamID?.push(id!)
      this.putTeam()
    }
  }


}
