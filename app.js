window.addEventListener('DOMContentLoaded', () => {
  const galleryContainer = document.querySelector('.galery'),
    form = document.querySelector('.header__form'),
    inputSearch = document.querySelector('.header__search');

  inputSearch.focus();

  let url =
    'https://api.unsplash.com/search/photos?query=red&per_page=21&orientation=landscape&client_id=GZMkaL0fZ1GjuaSCOAuvpkj41VpS_B61lfSiN6L5BhE';

  async function getData() {
    try {
      const res = await fetch(url);
      const data = await res.json();

      showData(data);
    } catch (error) {
      console.log(`Произошла ошибка при запросе данных: ${error.message}`);
    }
  }
  getData();

  function showData(data) {
    galleryContainer.innerHTML = '';
    data.results.forEach((element) => {
      const img = `<img class="gallery-img" src="${element.urls.regular}" alt="image">`;
      galleryContainer.insertAdjacentHTML('beforeend', img);
    });
  }

  let shouldClearField = true;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const word = inputSearch.value;

    url = `https://api.unsplash.com/search/photos?query=${word}&per_page=21&orientation=landscape&client_id=GZMkaL0fZ1GjuaSCOAuvpkj41VpS_B61lfSiN6L5BhE`;

    getData();

    if (shouldClearField) {
      form.reset();
    }
  });

  inputSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      shouldClearField = false;
    }
  });

  form.addEventListener('submit', () => {
    shouldClearField = true;
  });
});
