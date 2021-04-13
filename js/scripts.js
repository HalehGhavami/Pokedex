//Wrapped pokemonList array in an IIFE to avoid accidentally accessing the global state.
//create a new pokemonRepository variable to hold what my IIFE will return
let pokemonRepository = (function() {
  let pokemonList = [{
      name: 'Bulbasaur',
      height: 0.7,
      types: ['grass', 'poison']
    },
    {
      name: 'Caterpie',
      height: 0.3,
      types: ['bug']
    },
    {
      name: 'Pikachu',
      height: 0.4,
      types: ['electric']
    }
  ];

  //The IIFE return an object with the following public functions assigned as keys:

  // add the Pokémon referred to with item to the pokemonList array +  datatype check
  function add(pokemon) {
    if (typeof pokemon === 'object' && typeof pokemon !== null) {
      pokemonList.push(pokemon);
    } else {
      alert('type of parameter is not an object');
    }
  }

  //return the pokemonList array
  function getAll() {
    return pokemonList;
  }

  return {
    getAll: getAll,
    add: add
  };

})();

//add the correct type of data to pokemonList array
pokemonRepository.add({
  name: 'Raichu',
  height: 0.8,
  type: ['electric']
});

document.write('<ul class="pokemon-list">');

//move the function declaration passed to forEach() to make things clearer
function myLoopFunction(pokemon) {
  document.write('<li class="pokemon-list__item"><b>' + pokemon.name + '</b> (height: ' + pokemon.height + ')');
  if (pokemon.height > 0.4) {
    document.write('<b>- Wow, that\'s big!</b>');
  }
  document.write('</li><br>');
};

//forEach Loop iterates each pokemon name and height.
pokemonRepository.getAll().forEach(myLoopFunction);





document.write('<ul>');
