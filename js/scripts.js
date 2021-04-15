//Wrapped repository array in an IIFE to avoid accidentally accessing the global state.
//create a new pokemonRepository variable to hold what my IIFE will return
let pokemonRepository = (function() {
  let repository = [{
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

  // add the Pokémon referred to with item to the repository array +  datatype check
  function add(pokemon) {
    if (typeof pokemon === 'object' && typeof pokemon !== null) {
      repository.push(pokemon);
    } else {
      alert('type of parameter is not an object');
    }
  }

  //return the repository array
  function getAll() {
    return repository;
  }

  //creating lists and button in the DOM
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');

    //pokemon names on the buttons
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');

    //append the butten und the list to thier parents
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

  }

  //execute the details of clicked pokemon on console
    function showDetails(pokemon){
        console.log(pokemon);}


  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails:showDetails,
  };

})();

//add the correct type of data to repository array
pokemonRepository.add({
  name: 'Raichu',
  height: 0.8,
  types: ['electric']
});


//forEach Loop iterates each pokemon name in a button in an unorderd list
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);});
