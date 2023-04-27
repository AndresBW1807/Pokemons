import {Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PokemonsService} from "../../Services/pokemons.service";
import {Pokemons} from "../../models/Pokemons";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  @Input() title!: string;
  @Input() idPokemon!: number;
  @Output() enviar = new EventEmitter<boolean>();
  pokemonCreate: FormGroup;
  pokemon!: Pokemons;

  constructor(private formBuilder: FormBuilder,
              private pokemonService: PokemonsService) {
    this.pokemonCreate = this.formBuilder.group({
      name: ['', [Validators.required]],
      image: [],
      attack: [100],
      defense: [100]
    })
  }

  ngOnInit() {
    this.pokemonCreate.patchValue(this.pokemonService.getPokemon(this.idPokemon)!);
  }

  onsubmit() {
    this.pokemon = this.pokemonCreate.value
    if (this.idPokemon) {
      this.pokemon.id = this.idPokemon;
      this.pokemonService.updatePokemon(this.pokemon)
    } else {
      this.pokemonService.addPokemon(this.pokemon)
    }
    this.enviar.emit(true)
  }

  cancel(){
    this.enviar.emit(true)
  }
}
