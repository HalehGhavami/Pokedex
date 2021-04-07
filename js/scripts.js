// Creating an array of objects
let pokemonList = [
    {
    name :'Bulbasaur',
    height : 0.7,
    types : ['grass', 'poison']
    },
    {
    name : 'Caterpie',
    height : 0.3,
    types : ['bug']
    },
    {
    name : 'Pikachu',
    height : 0.4,
    types : ['electric']
  }
  ];

// Display the data on the page as an unordered list

document.write('<ul class="pokemon-list">');

for (let i = 0; i < pokemonList.length; i++) {

  document.write('<li class="pokemon-list__item">'+ pokemonList[i].name + '(height:'+ pokemonList[i].height + ')');

//The conditional check if the height is above a certain value
  if (pokemonList[i].height > 0.4) {
    document.write('<b>- Wow, that\'s big!</b>') ;
  }
 document.write('</li><br>');
}
document.write('<ul>');
