import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PokemonService } from '../pokemon.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  public action: String

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
    'future_evolve': new FormControl(null),
    'cem_cp_40': new FormControl(null),
    'cem_cp_39': new FormControl(null)
  })

  constructor(private pokemonService: PokemonService, private router: Router) {
    this.router.events.subscribe((endpoint: NavigationEnd) => {
      if (endpoint.url && endpoint.url != '/insert') {
        this.action = 'Edit'
      } else if (endpoint.url) {
        this.action = 'Insert'
      }
    })
  }

  ngOnInit() {
    var poke = this.pokemonService.getSelectedPokemon()
    if (this.action != 'Insert') {
      if (poke) {
        this.formulario.setValue(poke);
        this.formulario.disable();
      } else {
        this.router.navigateByUrl('/home');
      }
    }
    this.formulario.controls['pokedex'].disable();
  }

  actionDefine() {
    if (this.action == 'Edit') {
      this.edit();
    } else if (this.action == "Confirm" || this.action == "Insert") {
      this.insertData();
    }
  }

  edit() {
    this.action = 'Confirm'
    this.formulario.enable();
    this.formulario.controls['pokedex'].disable();
  }

  insertData() {
    this.formulario.controls['pokedex'].enable();
    if (this.action == "Insert") {
      this.pokemonService.insertPokemon(this.formulario.value)
        .subscribe(response => {
          this.formulario.value.pokedex = response.response[0]
          this.pokemonService.setSelectedPokemon(this.formulario.value);
          this.formulario.reset();
          alert('Insert successful!!')
          this.router.navigateByUrl('/detail');
        })
    } else {
      this.pokemonService.updatePokemon(this.formulario.value)
        .subscribe(response => {
          this.pokemonService.setSelectedPokemon(this.formulario.value);
          this.formulario.reset();
          this.action = 'Edit'
          alert('Update successful!!')
          this.ngOnInit();
        })
    }
  }

}
