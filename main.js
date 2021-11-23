const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner");
const reload = document.getElementById('reload');

reload.addEventListener('click', _ => { 
    location.reload();
});

/*Pedimos la información del pokemon*/
function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
      createPokemon(data);
      spinner.style.display = "none";
    });
}

/*Se generan las ids de los pokemons que se muestran*/
function fetchPokemons() {
  spinner.style.display = "block";
  for (let i = 1 ; i <= 6; i++) {
    let id = Math.floor(Math.random() * ( 898 - 1 ) + 1);
    fetchPokemon(id);
  }
}
/*Se crea la carta con la informacion */
function createPokemon(pokemon) {
  const flipCard = document.createElement("div");
  flipCard.classList.add("flip-card");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  flipCard.appendChild(cardContainer);

  const card = document.createElement("div");
  card.classList.add("pokemon-block");

  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("img-container");

  const sprite = document.createElement("img");
  sprite.src = pokemon.sprites.front_default;

  spriteContainer.appendChild(sprite);

  const number = document.createElement("p");
  number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

  const name = document.createElement("p");
  name.classList.add("text");
  name.textContent = pokemon.name;

  const type = document.createElement("p");
  type.classList.add("text");
  type.textContent=pokemon.types.map( element => element.type.name );;
 

  card.appendChild(spriteContainer);
  card.appendChild(number);
  card.appendChild(name);
  card.appendChild(type);

  const cardBack = document.createElement("div");
  cardBack.classList.add("pokemon-block-back");

  

  cardContainer.appendChild(card);
  cardContainer.appendChild(cardBack);
  pokemonContainer.appendChild(flipCard);
}

fetchPokemons();
