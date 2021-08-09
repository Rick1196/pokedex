import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counter-slice';
import pokemonReducer from './features/pokemon/pokemon-slice';
export const store =  configureStore({
  reducer: {
    counter: counterReducer,
    pokemons: pokemonReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;