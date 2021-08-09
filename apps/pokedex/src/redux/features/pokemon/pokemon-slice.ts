import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PokemonListI } from '../../../interfaces/pokemonI';
import { getPokemons } from '../../../services/pokemons';

export interface PokemonsStateI {
  pokemons: PokemonListI | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

const initialState: PokemonsStateI = {
  pokemons: null,
  status: 'idle',
  error: null,
};

export const fetchPokemons = createAsyncThunk(
  'pokemons/fetchPokemons',
  async () => {
    const response = await getPokemons(20, 200);
    return response;
  }
);

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.fulfilled, (state, { payload }) => {
      state.pokemons = payload;
      state.status = 'succeeded';
    });
    builder.addCase(fetchPokemons.pending, (state, { payload }) => {
      state.status = 'loading';
    });
    builder.addCase(fetchPokemons.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default pokemonsSlice.reducer;

export const selectAllPokemons = (state: PokemonsStateI) => state.pokemons?.results;
