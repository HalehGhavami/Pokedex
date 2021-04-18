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
    showLoadingMessage();
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
      });
    }).then(function() {
      hideLoadingMessage();
    }).catch(function(e) {
      console.error(e);
    })
    hideLoadingMessage();
  }

  // - GET the Pokémon details using the URL from the Pokémon object in the parameter.
  // - Once the GET request is complete, use .then to return a JSON response
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).then(function() {
      hideLoadingMessage();
    }).catch(function(e) {
      console.error(e);
    });
    hideLoadingMessage();
  }

  //shows the loading image
  function showLoadingMessage() {
    loadImage = document.querySelector(".loadingImage");
    loadImage.classList.add("showImg");
  }

  //hides the loading image
  function hideLoadingMessage() {
    loadImage = document.querySelector(".loadingImage");
    loadImage.classList.remove("showImg");
  }

  //execute the details of clicked pokemon on console
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      console.log(pokemon);
    });
  }


  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    LoadList: LoadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
  };

})();

//Calling the loadList function of pokemonrepository
pokemonRepository.LoadList().then(function() {
  //shows loading image in browser
  pokemonRepository.showLoadingMessage();
  //timer to simulate the time it takes to load
  setTimeout(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
    })
    pokemonRepository.hideLoadingMessage();
  }, 2000)
});
