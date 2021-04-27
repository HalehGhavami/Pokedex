//IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let searchInput = document.querySelector('#search-bar');

  //retrives pokemon data
  function getAll() {
    return pokemonList;
  }

  function add(item) {
    if (typeof item === 'object' && 'name' in item && 'detailsUrl' in item) {
      pokemonList.push(item);
    } else {
      /* eslint-disable no-console */
      console.log('pokemon is not correct');
    }
  }

  //creating lists and button in the DOM
  function addListItem(pokemon) {
    let container = $('.list-group');
    let listItem = $(
      '<div class="list-group-item col-lg-6 col-md-8 col-sm-12 mx-auto mb-2"></div>'
    );

    //pokemon names on the buttons
    let button = $('<button></button>');
    button.text(pokemon.name);
    button.addClass('btn btn-block btn-dark');
    button.attr('data-target', '#pokemonModal');
    button.attr('data-toggle', 'modal');
    listItem.append(button);
    container.append(listItem);
    button.on('click', function () {
      showDetails(pokemon);
    });
  }

  //fetch to GET the complete list of Pokémon
  async function loadList() {
    showLoadingMessage();
    try {
          const response = await fetch(apiUrl);
          const json = await response.json();
          json.results.forEach(function(item) {
              let pokemon = {
                  name: item.name,
                  detailsUrl: item.url,
              };
              //add each Pokémon from the results to my pokemonList variable.
              add(pokemon);
          });
          hideLoadingMessage();
      }
      catch (e) {
          /* eslint-disable no-console */
          console.error(e);
      }
  }

  // - GET the Pokémon details using the URL from the Pokémon object in the parameter.
  // - Once the GET request is complete, use .then to return a JSON response
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return (
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (details) {
          item.imageUrl = details.sprites.other.dream_world.front_default;
          item.height = details.height;
        })
        .then(function () {
          hideLoadingMessage();
        })
        /* eslint-disable no-console */
        .catch(function (e) {
          console.error(e);
        })
    );
  }

  //shows the loading image
  function showLoadingMessage() {
    loadImage = $('.loadingImage');
    loadImage.addClass('showImg');
  }

  //hides the loading image
  function hideLoadingMessage() {
    loadImage = $('.loadingImage');
    loadImage.removeClass('showImg');
  }

  //execute the details of clicked pokemon on modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');
      //clear existing content of the modal
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

  //Search function
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
