// Creating an array of objects
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

// Display the data on the page as an unordered list

document.write('<ul class="pokemon-list">');

for (let i = 0; i < pokemonList.length; i++) {

  //Used + string concatenation instead of ${} (string interpolation)

  document.write('<li class="pokemon-list__item"><b>' + pokemonList[i].name + '</b> (height: ' + pokemonList[i].height + ')');

  /* Used this ECMAScript 6 feature that is named "template string literal" to be able to make bold just the names of pokemon-list__items and styling <span> tag by css*/

  //  document.write(`
  //  <li class="pokemon-list__item">
  //  <span>${pokemonList[i].name}</span> (height: ${pokemonList[i].height})
  //  `);


  //The conditional check if the height is above a certain value
  // using <b> tag to bold part of a string display on page
  if (pokemonList[i].height > 0.4) {
    document.write('<b>- Wow, that\'s big!</b>');
  }
  document.write('</li><br>');
}
document.write('<ul>');
