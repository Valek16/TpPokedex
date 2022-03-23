import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { PagedData } from '../models/paged-data';
import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  @Input() search?: string;

  pokemons?: PagedData<Pokemon>;
  nbPokemonPokedex : number = 151;

  @Output() idPokemonEvent = new EventEmitter<number>();
  @Output() searchEvent = new EventEmitter<string>();



  constructor(private pokemonService : PokemonService) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  /***
   * Recupere les 10 premiers pokemons + les 10 suivants
   */
  getPokemon(){
    this.pokemonService.getPokemons().subscribe(data =>{
      this.pokemons=data;
      this.pokemons!.offset += this.pokemons!.limit;
    })
    this.getMorePokemon(10,10)
  }

  /***
   * Recupere des pokemons en fonction de l'offset et de la limite
   * @param limit
   * @param offset
   * @private
   */
  private getMorePokemon(limit : number, offset ?: number): void {
    this.pokemonService.getMorePokemon(limit, offset).subscribe(data => {
      this.pokemons!.data = this.pokemons!.data.concat(data.data);
      this.pokemons!.offset += limit;
    })
  }

  /***
   * Recupere les 10 pokemons suivants à chaque scroll
   */
  onScroll(){
    console.log('scrolled!!');
    if(this.pokemons!.offset<151)
    {
      this.getMorePokemon(10, this.pokemons!.offset as number);
      //console.log("Offset Onscroll " + this.pokemons?.offset)
    }
  }

  /***
   * Transmet l'id du pokemon au parent
   * @param id
   */
  idToParent(id: number) {
    this.idPokemonEvent.emit(id);
  }

  /***
   * De base la requête ne retourne que 10 pokémons correspondant à la string de recherche,
   * je l'ai donc modifié pour récupérer tous les pokémons correspondant à la recherche
   * @param nom
   */
  searchPokemon(nom : string){
    if(nom.length){
      let limit:number = this.nbPokemonPokedex
      let offset:number = 0
      let params:string = "offset="+offset + "&limit="+limit + "&search=" + nom
      this.pokemonService.getPokemonsWithSearch(params).subscribe(data => {
        this.pokemons!.data = data.data;
        this.pokemons!.offset += data.limit;
      })
    }
  else{
      this.getPokemon();
    }
  }
}
