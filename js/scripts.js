//IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  // let modalContainer = document.querySelector('#modal-container');
  let searchInput = document.querySelector('#search-bar');

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    if (typeof item === 'object' && 'name' in item && 'detailsUrl' in item) {
      pokemonList.push(item);
    } else {
      console.log('pokemon is not correct');
    }
  }

  //creating lists and button in the DOM
  function addListItem(pokemon) {
    let container = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.classList.add('list-group-item-action');

    //pokemon names on the buttons
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn');
    button.classList.add('btn-block');
    button.setAttribute('data-target', '#pokemonModal');
    button.setAttribute('data-toggle', 'modal');
    listItem.appendChild(button);
    container.appendChild(listItem);
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  //fetch to GET the complete list of Pokémon
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          //add each Pokémon from the results to my pokemonList variable.

          add(pokemon);
        });
      })
      .then(function () {
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
      });
    hideLoadingMessage();
  }

  // - GET the Pokémon details using the URL from the Pokémon object in the parameter.
  // - Once the GET request is complete, use .then to return a JSON response
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .then(function () {
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
      });
    hideLoadingMessage();
  }

  //shows the loading image
  function showLoadingMessage() {
    loadImage = document.querySelector('.loadingImage');
    loadImage.classList.add('showImg');
  }

  //hides the loading image
  function hideLoadingMessage() {
    loadImage = document.querySelector('.loadingImage');
    loadImage.classList.remove('showImg');
  }

  //execute the details of clicked pokemon on console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');
      let modalHeader = $('.modal-header');
      modalTitle.empty();
      modalBody.empty();
      let pokemonName = $('<h1>' + pokemon.name + '</h1>');
      let pokemonImage = $('<img class="modal-img" style="width:50%">');
      pokemonImage.attr('src', pokemon.imageUrl);
      let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');
      modalTitle.append(pokemonName);
      modalBody.append(pokemonImage);
      modalBody.append(pokemonHeight);
    });
  }

  searchInput.addEventListener('input', function () {
    let pokemonList = document.querySelectorAll('.list-group-item');
    let filterValue = searchInput.value.toUpperCase();

    pokemonList.forEach(function (pokemon) {
      console.log(pokemon.innerText);
      if (pokemon.innerText.toUpperCase().indexOf(filterValue) > -1) {
        pokemon.style.display = '';
      } else {
        pokemon.style.display = 'none';
      }
    });
  });

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
  };
})();

//Calling the loadList function of pokemonrepository
pokemonRepository.loadList().then(function () {
  //shows loading image in browser
  pokemonRepository.showLoadingMessage();
  //timer to simulate the time it takes to load
  setTimeout(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
    pokemonRepository.hideLoadingMessage();
  }, 2000);
});
