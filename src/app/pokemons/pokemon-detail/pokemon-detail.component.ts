import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../models/pokemon';
import {Location} from "@angular/common";
import { TeamComponent } from '../team/team.component';


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  constructor( private pokemonService : PokemonService, private route : ActivatedRoute ,  private location : Location) { }

  pokemon?: Pokemon;
  @Input() idPokemon = 1 ;
  @ViewChild(TeamComponent)
  private TeamComponent ?: TeamComponent;

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(){
    const id = this.idPokemon;
    this.pokemonService.getPokemon(id).subscribe(pokemon=>{this.pokemon=pokemon; console.log(pokemon)});
  }

  playPokemonSound(id ?: number){
    let audio = new Audio();
    audio.src = `../assets/audio/${id}.mp3`
    audio.load();
    audio.play();
  }

  ngOnChanges(id : number){
    console.log(id)
    this.getPokemon();
  }

  addPokemonToTeam(id: number): void{
    this.TeamComponent?.addPokemonById(id)
  }

}
