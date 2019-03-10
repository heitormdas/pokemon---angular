import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { URL_BACK } from './util/url';
import { Pokemon } from './shared/pokemon.model';

@Injectable()
export class PokemonService {

    private selectedPokemon: Pokemon

    constructor(private http: HttpClient) { }

    public setSelectedPokemon(selectedPokemon): void {
        window.localStorage.poke = JSON.stringify(selectedPokemon);
        this.selectedPokemon = selectedPokemon;
    }

    public getSelectedPokemon(): Pokemon {
        return this.selectedPokemon;
    }

    public getPokemons(filters, paginate): Observable<Object> {
        if (!paginate) {
            return this.http.post(`${URL_BACK}/listpokemon`, {filters})
                .pipe(
                    map((response: Object) => response)
                )
        } else {
            return this.http.post(`${URL_BACK}${paginate}`, { filters: null })
        }
    }

    public insertPokemon(pokemon): Observable<any> {
        return this.http.post(`${URL_BACK}/pokemon`, { pokemon })
            .pipe(
                map((response: Object) => response)
            )
    }

    public updatePokemon(pokemon): Observable<any> {
        return this.http.put(`${URL_BACK}/pokemon`, { pokemon })
            .pipe(
                map((response: Object) => response)
            )
    }
}