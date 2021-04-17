//IIFE
let pokemonRepository = (function() {
  //Empty array will be filld with pokemon objects from an API
  let pokemonList = [];
  // load data from an external source
  // defined the API url in a variable
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === 'object' && typeof pokemon !== null) {
      pokemonList.push(pokemon);
    } else {
      alert('pokemon is not correct');
    }
  }

  function getAll() {
    return pokemonList;
  }

  //creating lists and button in the DOM
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');

    //creat delete button on the buttons of pokemon list
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
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

  }

  //fetch to GET the complete list of Pokémon
  function LoadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        //add each Pokémon from the results to my pokemonList variable.
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  // - GET the Pokémon details using the URL from the Pokémon object in the parameter.
  // - Once the GET request is complete, use .then to return a JSON response
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
      // now second .then, assign some of the details we got from the response to the Pokémon in the pokemonList
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e) {
      console.error(e);
    });
  }



  //execute the details of clicked pokemon on console
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      console.log(item);
    });
  }


  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    LoadList: LoadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };

})();

//Calling the loadList function of pokemonrepository
pokemonRepository.LoadList().then(function() {
  //Executed the getAll function
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
