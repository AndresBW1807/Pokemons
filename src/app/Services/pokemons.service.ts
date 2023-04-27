import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {Pokemons} from "../models/Pokemons";

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  public pokemons: Pokemons[] = [
    {
      id: 0,
      name: 'pikachu',
      image: 'https://i0.wp.com/eltallerdehector.com/wp-content/uploads/2022/06/6420b-pikachu-sentado-png.png?resize=450%2C450&ssl=1',
      attack: 1,
      defense: 2,
    }
  ];
  public idNew: number = 1;
  constructor( private http: HttpClient) { }

  getPokemons(){
    return this.pokemons
  }

  getPokemon(id: number){
    let pokemon = this.pokemons.find(pokemon => {
      return  pokemon.id === id;
    })
    return pokemon
  }

  addPokemon(pokemon: any){
    pokemon.id = this.idNew
    this.pokemons.push(pokemon)
    this.idNew++
  }

  updatePokemon(pokemon: Pokemons){
    const index = this.pokemons.findIndex(poke => poke.id === pokemon.id)
    if(index !== -1){
      this.pokemons[index] = pokemon;
    }
  }

  deletePokemon(id: number){
    const index = this.pokemons.findIndex(poke => poke.id === id)
    if(index !== -1){
      this.pokemons.splice(index, 1);
    }
  }
}
