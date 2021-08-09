import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './redux/features/counter/counter-slice';
import { RootState } from './redux/store';
import {
  fetchPokemons,
  selectAllPokemons,
} from './redux/features/pokemon/pokemon-slice';
import { BasicPokemonI } from './interfaces/pokemonI';
import { useEffect } from 'react';
function App() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state: RootState) => state.pokemons.pokemons?.results);
  console.log('list ', pokemons);
  const postStatus = useSelector((state: RootState) => state.pokemons.status);
  const error = useSelector((state: RootState) => state.pokemons.error);
  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPokemons());
    }
  }, [postStatus, dispatch]);
  const renderPokemonsList = () => {
    console.log(pokemons);
    return pokemons?.map((pokemon: BasicPokemonI, index: number) => {
      return <div key={index}>{pokemon.name}</div>;
    });
  };
  return (
    <div>
      {postStatus === 'loading' ? <span>Loading</span> : null}
      {postStatus === 'succeeded' ? renderPokemonsList() : null}
      {postStatus === 'failed' ? <span>Error</span> : null}
    </div>
  );
}
export default App;
