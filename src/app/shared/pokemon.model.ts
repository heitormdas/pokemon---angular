class Pokemon {
    constructor(
        public pokedex: Number,
        public name: String,
        public generation: Number,
        public evolution_stage: Number,
        public evolved: Boolean,
        public family_id: Number,
        public cross_gen: Boolean,
        public type_one: String,
        public type_two: String,
        public weather_one: String,
        public weather_two: String,
        public stat_total: Number,
        public atack: Number,
        public defense: Number,
        public stamina: Number,
        public legendary: Boolean,
        public aquireable: Number,
        public spawns: Boolean,
        public regional: Boolean,
        public raidable: Number,
        public hatchable: Number,
        public shiny: Boolean,
        public nest: Boolean,
        public newpok: Boolean,
        public not_gettable: Boolean,
        public future_evolve: Boolean,
        public cem_cp_40: String,
        public cem_cp_39: String
    ) { }
}

export { Pokemon }