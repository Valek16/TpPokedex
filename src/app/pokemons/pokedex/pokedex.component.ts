import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  idPokemon = 1;
  nomPokemon = "";

  constructor() { }

  ngOnInit(): void {
  }

  getIdPokemon(id: number) {
    console.log("parent " + id)
    this.idPokemon = id
  }

}
