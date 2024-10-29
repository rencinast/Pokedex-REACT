import './App.css';
import { useState } from 'react';

//JSON cargado localmente para pruebas, despues se cambiara por la info de PokeAPI
const pokemons = [
  {id: "636", name: "Larvesta", description:"Se dice que nació del sol.", type: "Insecto",habilities: "Swarm", height: "1.1m",weight: "28.8kg"},
  {id: "317", name: "Swalot", description: "Se traga cualquier cosa", type: "Poison", habilities: "Guttony", height: "1.7m", weight: "80kg"},
  {id: "638", name: "Cobalion", description: "Posee un cuerpo y corazon de acero", type: "Steel", habilities: "Justified", height: "2.1m", weight: "250kg"},
  {id: "481", name: "Mesprit", description: "Se le conoce como el ser", type: "Psychic", habilities: "Levitate", height: "0.3m", weight: "0.3kg"},
  {id: "742", name: "Cutiefly", description: "Se alimenta de néctar y polen", type: "", habilities: "Honey-gather", height: "0.1m", weight: "0.2kg"},
  {id: "233", name: "Porygon2", description: "La investigacion mejoro", type: "Normal", habilities: "Trace", height: "0.6m", weight: "32.5kg"},
  {id: "39", name: "Jigglypuff", description: "Cautiva con la mirada", type: "Normal", habilities: "Cute-charm", height: "0.5m", weight: "5.5kg"},
  {id: "367", name: "Huntail", description: "Vive en los abismos", type: "Water", habilities: "Water-veil", height: "1.7m", weight: "27kg"},
  {id: "85", name: "Dodrio", description: "Mas vale no perder de vista sus cabezas", type: "Normal", habilities: "Run-away", height: "1.8m", weight: "85.2kg"},
  {id: "539", name: "Sawk", description: "Para lograr dominar las tecnicas", type: "Fighting", habilities: "Breaker", height: "1.4m", weight: "51kg"},
  {id: "875", name: "Eiscue", description: "La corriente lo ha transportado", type: "Ice", habilities: "Ice-face", height: "1.4m", weight: "89kg"},
  {id: "818", name: "Inteleon", description: "Esconde algunos trucos", type: "Water", habilities: "Torrent", height: "1.9m", weight: "45.2kg"}
]

function IdName({pokemonIdName}) {
  return(
    <div>
      <h2>Informacion del pokemon</h2>
      {pokemonIdName ? (
        <>
          <p>{pokemonIdName.name}</p>
          <p>{pokemonIdName.id}</p>
        </>
        ) :
        <h2>Ingresa un nombre para buscar</h2> 
      }
    </div>
  );
}

function Pokedex ({pokemon}) {
  return(
    <>
      <div>
        <IdName pokemonIdName={pokemon}/>
      </div>
      <div>
        <Description pokemonDescription={pokemon} />
        <Characteristics pokemonCharacteristics={pokemon}/>
      </div>
    </>
  );
}

function Characteristics({pokemonCharacteristics}) {
 return(
  <div>
    <h2>Caracteristicas</h2>
    {pokemonCharacteristics ? (
        <>
          <div>
            <p>{pokemonCharacteristics.type}</p>
            <p>{pokemonCharacteristics.habilities}</p>
          </div>
          <div>
            <p>{pokemonCharacteristics.weight}</p>
            <p>{pokemonCharacteristics.height}</p>
          </div>
        </>
        ) :
        <h2>Ingresa un nombre para buscar</h2> 
      }
  </div>
 );
}

function Description({pokemonDescription}) {
  return(
    <div>
      <h2>Caracteristicas</h2>
      {pokemonDescription ? (
        <p>{pokemonDescription.description}</p>
      ) : (
        <p>No se ha seleccionado ningún Pokémon. Ingresa un nombre para buscar.</p>
      )}
    </div>
   );
}

function SearchBar({searchValue, setSearchValue, buscar, buscarSugerencias}) {
  const handleChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    // Actualiza las sugerencias en tiempo real
    buscarSugerencias(value); 
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>Poké-info</label>
      <input type="search" placeholder="Buscar" value={searchValue} onChange={handleChange} />
      <button type="button" onClick={buscar}>Buscar</button>
    </form>
  );
}

function Sugerencias({sugerencias, seleccionarPokemon}) {
  return(
    <ul>
      {sugerencias.length > 0 ? (
        sugerencias.map(pokemon => 
          <li key={pokemon.id} onClick={() => seleccionarPokemon(pokemon)}>
            {pokemon.name}
          </li>
        )) : (
        <></>
      )}
    </ul>
  );
}

function MyApp() {
  const [pokemon, setPokemon] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [sugerencias, setSugerencias] = useState([]);

  const buscar = () => {
    const trimValue = searchValue.trim();
    if (trimValue.length < 1) {
      //Si el input esta vacio y se realiza una busqueda muestra un error
      setPokemon(null);
      alert("Ingresa un nombre para buscar")
      return;
    }

    // Busca el Pokémon que coincide exactamente con el nombre ingresado
    const encontrado = pokemons.find(pokemon =>
      pokemon.name.toLowerCase() === trimValue.toLowerCase()
    );

    //Validar si un pokemon existe, si no muestra un error
    if (!encontrado) {
      alert(`El Pokémon ${trimValue} no existe. Por favor, intenta de nuevo.`);
    }

    // Establece el Pokémon encontrado o null si no se encuentra
    setPokemon(encontrado || null);
  };

  const seleccionarPokemon = (pokemonSeleccionado) => {
    // Actualiza el input con el nombre seleccionado
    setSearchValue(pokemonSeleccionado.name); 
    setSugerencias([]);
  };

  const buscarSugerencias = (value) => {
    if (value.length < 1) {
      setSugerencias([]);
      return;
    }

    const coincidencias = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(value.toLowerCase())
    );
    setSugerencias(coincidencias);
  };

  return (
    <>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} buscar={buscar} buscarSugerencias={buscarSugerencias} />
      <Sugerencias sugerencias={sugerencias} seleccionarPokemon={seleccionarPokemon} />
      <Pokedex pokemon={pokemon} />
    </>
  )
}

export default MyApp;