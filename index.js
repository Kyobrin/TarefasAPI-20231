const handleSearch = async (event) => {
  event.preventDefault();

  //EXIBIR MENSAGEM DE CARREGAMENTO//
  const message = document.querySelector('#message');
  message.innerHTML = 'buscando...';


  const listaDeSeries = document.querySelector('#shows');
  listaDeSeries.innerHTML = '';

  const busca = document.querySelector('#query');
  const textoASerBuscado = busca.value;

  const url = `https://api.tvmaze.com/search/shows?q=${textoASerBuscado}`;


  const resposta = await fetch(url);
  const series = await resposta.json();

  if (series.length == 0) {

    message.innerHTML = 'nenhum resultado encontrado.';
    return;
  }

  message.innerHTML = '';
  series.forEach((series) => {
    const titulo = series?.show?.name || '';
    const imagem = series?.show?.image.medium || '';

    listaDeSeries.insertAdjacentHTML(
      'beforeend',
      `
  <li>
    <img class="poster" src="${imagem}">
    <span class="show-name">${titulo}</span>
  </li>
  `
    );
  });
};

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#search-form')
    .addEventListener('submit', handleSearch);
});