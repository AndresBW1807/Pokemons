import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PokemonsService} from "../../Services/pokemons.service";
import {FormComponent} from "../form/form.component";
import {Pokemons} from "../../models/Pokemons";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @ViewChild('inpu', {static: false}) fil!: ElementRef

  pokemons: Pokemons[] = [];
  title: string = "";
  add = false;
  update = false;
  idPokemon!: number;

  constructor(private PokemonService: PokemonsService) {
  }

  ngOnInit() {
    this.pokemons = this.PokemonService.getPokemons()
  }

  filter( event: Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();
    if(value === ''){
      this.pokemons = this.PokemonService.getPokemons()
    }
    this.pokemons = this.pokemons.filter(poke =>  {
      return poke.name.toLowerCase().includes(value);
    })
  }

  recargar( event: boolean){
    if (event){
      this.add = false;
      this.update = false;
      this.pokemons = this.PokemonService.getPokemons()
      this.fil.nativeElement.value = ""
    }
  }

  ad(){
    this.add = true;
    this.update = false;
    this.title = "Agregar Pokemon"
  }

  updt(pokemon: Pokemons){
    this.update = true;
    this.add = false;
    this.title = "Actualizar Pokemon"
    this.idPokemon = pokemon.id
  }

  del( pokemon: Pokemons){
    this.PokemonService.deletePokemon(pokemon.id)
    this.update = false;
    this.pokemons = this.PokemonService.getPokemons()
  }


  protected readonly onsubmit = onsubmit;
}
