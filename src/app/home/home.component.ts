import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../shared/pokemon.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pokemons: Array<Pokemon>
  public paginateData: any
  public currentPage: any = { number: 0, url: '' }

  public formulario: FormGroup = new FormGroup({
    'pokedex': new FormControl(null),
    'name': new FormControl(null),
    'generation': new FormControl(null),
    'evolution_stage': new FormControl(null),
    'evolved': new FormControl(null),
    'family_id': new FormControl(null),
    'cross_gen': new FormControl(null),
    'type_one': new FormControl(null),
    'type_two': new FormControl(null),
    'weather_one': new FormControl(null),
    'weather_two': new FormControl(null),
    'stat_total': new FormControl(null),
    'atack': new FormControl(null),
    'defense': new FormControl(null),
    'stamina': new FormControl(null),
    'legendary': new FormControl(null),
    'aquireable': new FormControl(null),
    'spawns': new FormControl(null),
    'regional': new FormControl(null),
    'raidable': new FormControl(null),
    'hatchable': new FormControl(null),
    'shiny': new FormControl(null),
    'nest': new FormControl(null),
    'newpok': new FormControl(null),
    'not_gettable': new FormControl(null),
    'future_evolve': new FormControl(null)
  })

  constructor(private pokemonService: PokemonService, private router: Router) {
    this.router.events.subscribe((endpoint: NavigationEnd) => {
      if (endpoint.url && endpoint.url == 'home') delete window.localStorage.poke;
    })
  }

  ngOnInit() {
    this.onFilter();
  }

  onFilter(page = null) {
    window.localStorage.filters = JSON.stringify(this.formulario.value)
    this.currentPage.number = page ? page.number : 1
    const url = page ? page.url : null
    this.pokemonService.getPokemons(this.formulario.value, url)
      .subscribe((response: any) => {
        this.paginateData = response
        this.currentPage = response.pages.find(x => {
          return x.number == this.currentPage.number
        })
        this.pokemons = response.pokemon
      })
  }

  nextOrPrevious(numberPage) {
    if (numberPage) {
      let page = this.paginateData.pages.find(x => {
        return x.number == numberPage
      })
      if (page) {
        this.onFilter(page)
      }
    }
  }

  detailPokemon(selectedPokemon) {
    this.pokemonService.setSelectedPokemon(selectedPokemon);
    this.router.navigateByUrl('/detail')
  }

  insertPokemon() {
    this.router.navigateByUrl('/insert')
  }

  clear(){
    delete window.localStorage.filters
    this.formulario.reset()
  }
}
