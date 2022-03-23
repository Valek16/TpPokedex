import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../pokemon.service";
import {Auth} from "../models/Auth";
import {HttpHeaders} from "@angular/common/http";
import {Pokemon} from "../models/pokemon";
import {forkJoin, Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  responseLogin ?: Auth;
  pokemonTeamID ?: number[];
  pokemonTeam ?: Pokemon[];


  constructor(private pokemonService : PokemonService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.login()
  }

  /***
   * Appel la fonction de login et stocke l'access token
   */
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

  /***
   * Appel la fonction de pokemon.service permettant de récupérer les pokemons de l'équipe
   */
  getTeamFromService(){
    document.getElementById("titre")!.style.display = "block"
    let header = new HttpHeaders()
    header = header.set("Authorization", "Bearer " + this.responseLogin?.access_token);
    console.log(header.get("Authorization"))
    this.pokemonService.getTeam(header).subscribe(data => {this.pokemonTeamID=data, console.log("getTeam : " + data),this.getTeamDetails()});
    parent.document.getElementById("btnAddPokemon")!.style.display = "block"
  }


  /***
   * Recupere les details des pokemons de l'équipe via pokemon.service
   */
  getTeamDetails(): void{
    //console.log("getTeamDetails")
    let pokemonsObs: Observable<Pokemon>[] = this.pokemonTeamID!.map(id => this.pokemonService.getPokemon(id))
    forkJoin(pokemonsObs).subscribe(data => {
      this.pokemonTeam = data
      //console.log(this.pokemonTeam)
    })
  }

  /***
   * Ajoute un pokemon à l'équipe via pokemon.service
   */
  putTeam(): void{
    //console.log("putTeam")
    let header = new HttpHeaders()
    header = header.set("Authorization", "Bearer " + this.responseLogin?.access_token)
    //console.log(header.get("Authorization"))
    this.pokemonService.putTeam(this.pokemonTeamID!, header).subscribe(data => {
      this.getTeamFromService()
    })
  }

  /***
   * Supprime un pokemon de l'équipe
   * @param id
   */
  deletePokemonById(id?: number): void{
    //console.log("Delete : " + id)
    if(this.pokemonTeamID!.length > 1){
      this.pokemonTeamID?.splice(this.pokemonTeamID?.indexOf(id!), 1)
      this.putTeam()
    }else{
      this.snackBar.open("Un dresseur ne s'aventure jamais son au moins 1 pokémon",
        "",
        {duration: 4500, panelClass: ['deleteSnackBar']})
    }
  }

  /***
   * Ajoute un pokemon à l'équipe
   * @param id
   */
  addPokemonById(id?: number): void{
    //console.log("Add : " + id)
    if(this.pokemonTeamID!.length < 6){
      this.pokemonTeamID?.push(id!)
      this.putTeam()
    }else{
      this.snackBar.open("Une équipe ne peut comporter que 6 pokémons",
        "",
        {duration: 4500, panelClass: ['addSnackBar']})
    }
  }


}
