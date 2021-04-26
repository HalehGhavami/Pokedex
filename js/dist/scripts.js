let pokemonRepository = (function () {
  let e = [],
    t = 'https://pokeapi.co/api/v2/pokemon/?limit=150',
    o = document.querySelector('#search-bar');
  function n(t) {
    'object' == typeof t && 'name' in t && 'detailsUrl' in t
      ? e.push(t)
      : console.log('pokemon is not correct');
  }
  function i(e) {
    a();
    let t = e.detailsUrl;
    return fetch(t)
      .then(function (e) {
        return e.json();
      })
      .then(function (t) {
        (e.imageUrl = t.sprites.other.dream_world.front_default),
          (e.height = t.height),
          (e.types = t.types);
      })
      .then(function () {
        s();
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function a() {
    (loadImage = document.querySelector('.loadingImage')),
      loadImage.classList.add('showImg');
  }
  function s() {
    (loadImage = document.querySelector('.loadingImage')),
      loadImage.classList.remove('showImg');
  }
  function l(e) {
    i(e).then(function () {
      let t = $('.modal-body'),
        o = $('.modal-title');
      $('.modal-header');
      o.empty(), t.empty();
      let n = $('<h1>' + e.name + '</h1>'),
        i = $('<img class="modal-img" style="width:50%">');
      i.attr('src', e.imageUrl);
      let a = $('<p>Height: ' + e.height + '</p>');
      o.append(n), t.append(i), t.append(a);
    });
  }
  return (
    o.addEventListener('input', function () {
      let e = document.querySelectorAll('.list-group-item'),
        t = o.value.toUpperCase();
      e.forEach(function (e) {
        console.log(e.innerText),
          e.innerText.toUpperCase().indexOf(t) > -1
            ? (e.style.display = '')
            : (e.style.display = 'none');
      });
    }),
    {
      getAll: function () {
        return e;
      },
      add: n,
      addListItem: function (e) {
        let t = document.querySelector('.list-group'),
          o = document.createElement('li');
        o.classList.add('list-group-item'),
          o.classList.add('list-group-item-action'),
          o.classList.add('mb-2');
        let n = document.createElement('button');
        (n.innerText = e.name),
          n.classList.add('btn'),
          n.classList.add('btn-block'),
          n.classList.add('btn-dark'),
          n.setAttribute('data-target', '#pokemonModal'),
          n.setAttribute('data-toggle', 'modal'),
          o.appendChild(n),
          t.appendChild(o),
          n.addEventListener('click', function (t) {
            l(e);
          });
      },
      loadList: function () {
        return (
          a(),
          fetch(t)
            .then(function (e) {
              return e.json();
            })
            .then(function (e) {
              e.results.forEach(function (e) {
                n({ name: e.name, detailsUrl: e.url });
              });
            })
            .then(function () {
              s();
            })
            .catch(function (e) {
              console.error(e);
            })
        );
      },
      loadDetails: i,
      showDetails: l,
      showLoadingMessage: a,
      hideLoadingMessage: s,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.showLoadingMessage(),
    setTimeout(function () {
      pokemonRepository.getAll().forEach(function (e) {
        pokemonRepository.addListItem(e);
      }),
        pokemonRepository.hideLoadingMessage();
    }, 2e3);
});
