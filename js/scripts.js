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

  function add(pokemon) {
    if (typeof pokemon === 'object' && typeof pokemon !== null) {
      repository.push(pokemon);
    } else {
      alert('type of parameter is not an object');
    }
  }

  function getAll() {
    return repository;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');

    //creat delet button on the buttons of pokemon list
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'X';
    deleteButton.classList.add('delete-button');

    //creat edit button on the buttons of pokemon list
    let editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.classList.add('edit-button');



    //pokemon names on the buttons
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    //Event listener on click
    button.addEventListener('click', function(event) {
      showDetails(pokemon);

    });


    //append the buttons and the list to thier parents
    button.appendChild(editButton);
    button.appendChild(deleteButton);
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

  }

  //execute the details of clicked pokemon on console
  function showDetails(pokemon) {
    console.log(pokemon);
  }


  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
  };

})();

//add the correct type of data to repository array
pokemonRepository.add({
  name: 'Raichu',
  height: 0.8,
  types: ['electric']
});


//forEach Loop iterates each pokemon name in a button in an unorderd list
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
