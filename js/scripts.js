// Creating an array of objects
let pokemonList = [
  {
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

// Display the data on the page as an unordered list
document.write('<ul class="pokemon-list">');

//move the function declaration passed to forEach() to make things clearer
function pokemonLoopFunction(pokemon) {
  document.write('<li class="pokemon-list__item"><b>' + pokemon.name + '</b> (height: ' + pokemon.height + ')');
  //The conditional check if the height is above a certain value
  if (pokemon.height > 0.4) {
    document.write('<b>- Wow, that\'s big!</b>');
  }
  document.write('</li><br>');
};

//forEach Loop iterates each pokemon name and height.
pokemonList.forEach(pokemonLoopFunction);

document.write('<ul>');
