import React from 'react';

const TypeFilter = ({ selectedType, setSelectedType, pokemonList }) => {
  // Extract all unique types from the pokemon list
  const allTypes = [...new Set(
    pokemonList.flatMap(pokemon => 
      pokemon.types.map(type => type.type.name)
    )
  )].sort();

  return (
    <div className="type-filter">
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="all">All Types</option>
        {allTypes.map(type => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TypeFilter;