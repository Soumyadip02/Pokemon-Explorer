import React from 'react';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <img 
        src={pokemon.sprites.front_default} 
        alt={pokemon.name} 
        className="pokemon-image"
      />
      <h3 className="pokemon-name">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <p className="pokemon-id">#{pokemon.id.toString().padStart(3, '0')}</p>
      <div className="pokemon-types">
        {pokemon.types.map((type, index) => (
          <span 
            key={index} 
            className={`type-badge type-${type.type.name}`}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;