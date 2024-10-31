
import { useEffect, useState } from 'react';
import './App.css';

const pokemons = [
  { 
    id: "636", 
    name: "Larvesta", 
    description: "Se dice que nació del sol.", 
    type: "Insecto", 
    habilities: "Swarm", 
    height: "1.1m", 
    weight: "28.8kg",
    image: "https://img.pokemondb.net/artwork/large/larvesta.jpg" 
  },
  { 
    id: "317", 
    name: "Swalot", 
    description: "Se traga cualquier cosa", 
    type: "Poison", 
    habilities: "Guttony", 
    height: "1.7m", 
    weight: "80kg",
    image: "https://img.pokemondb.net/artwork/large/swalot.jpg"
  },
  { 
    id: "638", 
    name: "Cobalion", 
    description: "Posee un cuerpo y corazon de acero", 
    type: "Steel", 
    habilities: "Justified", 
    height: "2.1m", 
    weight: "250kg",
    image: "https://img.pokemondb.net/artwork/large/cobalion.jpg"
  },
  { 
    id: "481", 
    name: "Mesprit", 
    description: "Se le conoce como el ser", 
    type: "Psychic", 
    habilities: "Levitate", 
    height: "0.3m", 
    weight: "0.3kg",
    image: "https://img.pokemondb.net/artwork/large/mesprit.jpg"
  },
  { 
    id: "742", 
    name: "Cutiefly", 
    description: "Se alimenta de néctar y polen", 
    type: "", 
    habilities: "Honey-gather", 
    height: "0.1m", 
    weight: "0.2kg",
    image: "https://img.pokemondb.net/artwork/large/cutiefly.jpg"
  },
  { 
    id: "233", 
    name: "Porygon2", 
    description: "La investigacion mejoro", 
    type: "Normal", 
    habilities: "Trace", 
    height: "0.6m", 
    weight: "32.5kg",
    image: "https://img.pokemondb.net/artwork/large/porygon2.jpg"
  },
  { 
    id: "39", 
    name: "Jigglypuff", 
    description: "Cautiva con la mirada", 
    type: "Normal", 
    habilities: "Cute-charm", 
    height: "0.5m", 
    weight: "5.5kg",
    image: "https://img.pokemondb.net/artwork/large/jigglypuff.jpg"
  },
  { 
    id: "367", 
    name: "Huntail", 
    description: "Vive en los abismos", 
    type: "Water", 
    habilities: "Water-veil", 
    height: "1.7m", 
    weight: "27kg",
    image: "https://img.pokemondb.net/artwork/large/huntail.jpg"
  },
  { 
    id: "85", 
    name: "Dodrio", 
    description: "Mas vale no perder de vista sus cabezas", 
    type: "Normal", 
    habilities: "Run-away", 
    height: "1.8m", 
    weight: "85.2kg",
    image: "https://img.pokemondb.net/artwork/large/dodrio.jpg"
  },
  { 
    id: "539", 
    name: "Sawk", 
    description: "Para lograr dominar las tecnicas", 
    type: "Fighting", 
    habilities: "Breaker", 
    height: "1.4m", 
    weight: "51kg",
    image: "https://img.pokemondb.net/artwork/large/sawk.jpg"
  },
  { 
    id: "875", 
    name: "Eiscue", 
    description: "La corriente lo ha transportado", 
    type: "Ice", 
    habilities: "Ice-face", 
    height: "1.4m", 
    weight: "89kg",
    image: "https://img.pokemondb.net/artwork/large/eiscue.jpg"
  },
  { 
    id: "818", 
    name: "Inteleon", 
    description: "Esconde algunos trucos", 
    type: "Water", 
    habilities: "Torrent", 
    height: "1.9m", 
    weight: "45.2kg",
    image: "https://img.pokemondb.net/artwork/large/inteleon.jpg"
  }
];
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: "3rem",
    textAlign: 'center'
  },

  carcontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

}

function MyApp() {
  const [pokemon, setPokemon] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [sugerencias, setSugerencias] = useState([]);

  const InformacionPokemon = () => {
    return (
      <div className=''>
        <div className=''>
          <h2>{pokemon?.name} - {pokemon?.id}</h2>
        </div>
        <div className='pokecontainer debug'>
          <div>
            <img className='' style={{width: 200, height:200}} src={pokemon?.image} alt={pokemon?.name}></img>
          </div>

          <div>
            <p> {pokemon && pokemon.description} </p>
          </div>
          <div className='caracteristicascontainer' >
            <div>
              <p>Tipo <br /> {pokemon?.type}</p>
              <p>Habilidades <br /> {pokemon?.habilities}</p>
            </div>
            <div>
              <p>Altura <br /> {pokemon?.height}</p>
              <p>Peso <br /> {pokemon?.weight}</p>
            </div>
          </div>
        </div>
      </div>
    )
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const encontrado = pokemons.find(item =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setPokemon(encontrado || null)
    setSugerencias([])
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      const sugerencias = pokemons.filter(item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSugerencias(sugerencias)
    } else {
      setSugerencias([])
    }
  }, [searchValue]);

  return (
    <div style={styles.container}>
      {/* Buscar  */}
      <form
        onSubmit={handleSubmit}
      >
        <label>Poké-info</label> <br />
        <input
          type="search"
          placeholder="Buscar"

          value={searchValue}
          style={{ width: 200 }}
          onChange={(e) => {
            setSearchValue(e.target.value.trim())
          }}
        />
        
        {sugerencias.length > 0 && (
          <ul>
            {sugerencias.map((sugerencia, index) => (
              <li
                style={{ cursor: 'pointer' }}
                key={index}
                onClick={() => {
                  setSearchValue(sugerencia.name);
                  setSugerencias([])
                }}
              >
                {sugerencia.name}
              </li>
            ))}
          </ul>
        )}

        <br />

        <button
          style={{ width: 200, marginTop: 5 }}
          type="submit"
          disabled={searchValue.trim().length < 1}
        >
          {searchValue.trim().length < 1 ? "Ingresa un nombre" : "Buscar"}
        </button>
      </form>

      {/* Informacion del Pokemon */}
      <InformacionPokemon />
    </div>
  )
}

export default MyApp;