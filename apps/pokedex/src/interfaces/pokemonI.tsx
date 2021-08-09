export interface PokemonListI {
  count: number;
  next: string;
  previous: string;
  results: BasicPokemonI[];
}

export interface BasicPokemonI {
  name: string;
  url: string;
}
