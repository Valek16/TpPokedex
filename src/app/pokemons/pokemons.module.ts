import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import {AppModule} from "../app.module";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterModule} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import { TeamComponent } from './team/team.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [

    PokedexComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    TeamComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatGridListModule,
    MatIconModule,
    InfiniteScrollModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSidenavModule,
    RouterModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
  ]
})
export class PokemonsModule { }
