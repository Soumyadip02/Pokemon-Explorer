import React, { useState, useEffect } from 'react';
import './App.css';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import Loading from './components/Loading';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await response.json();
        
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );
        
        setPokemonList(pokemonDetails);
        setFilteredPokemon(pokemonDetails);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    let filtered = pokemonList;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    
    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(pokemon => 
        pokemon.types.some(type => type.type.name === selectedType)
      );
    }
    
    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemonList]);

  if (loading) return <Loading />;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="App">
      <header>
        <h1>Pokémon Explorer</h1>
      </header>
      
      <div className="filters">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TypeFilter 
          selectedType={selectedType} 
          setSelectedType={setSelectedType} 
          pokemonList={pokemonList} 
        />
      </div>
      
      {filteredPokemon.length === 0 ? (
        <div className="no-results">No Pokémon found matching your criteria.</div>
      ) : (
        <div className="pokemon-grid">
          {filteredPokemon.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;