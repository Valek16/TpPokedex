import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import { PagedData } from './models/paged-data';
import { Pokemon } from './models/pokemon';
import {environment} from "../../environments/environment";
import {Auth} from "./models/Auth";


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemonApi : string = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io';

  constructor(private http : HttpClient) { }

  getPokemons(): Observable<PagedData<Pokemon>>{
    return this.http.get<PagedData<Pokemon>>(this.pokemonApi+'/pokemons')
  }

  getPokemon(id : number): Observable<Pokemon>{
    const url = `${this.pokemonApi}/pokemons/${id}`
    //console.log("Get Pokemon à : " + url)
    return this.http.get<Pokemon>(url)
  }

  getMorePokemon( limit : number, offset ?: number): Observable<PagedData<Pokemon>>{
    return this.http.get<PagedData<Pokemon>>(this.pokemonApi+'/pokemons?offset='+ offset + '&limit='+ limit)
  }

  getPokemonsWithSearch(query: string): Observable<PagedData<Pokemon>>{
    return this.http.get<PagedData<Pokemon>>(this.pokemonApi+"/pokemons?search="+query).pipe(
      catchError(this.handleError<PagedData<Pokemon>>('getPokemonsWithSearch', {} as PagedData<Pokemon>))
    )
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  postLogin():Observable<Auth>{
    const body = {
      email : environment.login,
      password : environment.mdp
    }
    return this.http.post<Auth>(this.pokemonApi+"/auth/login", body)
      .pipe(
      catchError(this.handleError<Auth>('Login', {} as Auth ))
      )
  }

  getTeam(header : HttpHeaders): Observable<number[]>{
    return this.http.get<number[]>(this.pokemonApi+"/trainers/me/team", {headers : header})
  }


  putTeam(body: number[], header: HttpHeaders): Observable<any> {
    return this.http.put<string>(this.pokemonApi + "/trainers/me/team", body, {headers: header}).pipe(
      catchError(this.handleError<string>("putTeam", {} as string))
    )
  }

}
