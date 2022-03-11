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
  @Output() idPokemonEvent = new EventEmitter<number>();
  @Output() searchEvent = new EventEmitter<string>();

  constructor(private pokemonService : PokemonService) { }

  ngOnInit(): void {
    this.getPokemon();
    this.getMorePokemon(15,10);
  }

  getPokemon(){
    this.pokemonService.getPokemons().subscribe(data =>{
      this.pokemons=data;
      this.pokemons!.offset += this.pokemons!.limit;
    })
  }

  private getMorePokemon(limit : number, offset ?: number): void {
    this.pokemonService.getMorePokemon(limit, offset).subscribe(data => {
      this.pokemons!.data = this.pokemons!.data.concat(data.data);
      this.pokemons!.offset += this.pokemons!.limit;
    })
  }

  onScroll(){
    console.log('scrolled!!');
    this.getMorePokemon(10, this.pokemons?.offset as number);
  }

  idToParent(id: number) {
    this.idPokemonEvent.emit(id);
  }

  tellSearchQueryToParent(search : string){
    this.searchPokemon(search);
  }
  searchPokemon(nom : string){
    if(nom.length){
      this.pokemonService.getPokemonsWithSearch(nom).subscribe(data => {
        this.pokemons!.data = data.data;
        this.pokemons!.offset += this.pokemons!.limit;
      })
    }
  else{
      this.getPokemon();
    }
  }
}
