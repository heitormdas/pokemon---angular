import { Component } from '@angular/core';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokemon';
  constructor(private pokemonService: PokemonService) {
    window.localStorage.poke ?
      this.pokemonService.setSelectedPokemon(JSON.parse(window.localStorage.poke))
      : delete window.localStorage.poke
  }
}
