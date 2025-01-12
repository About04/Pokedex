import { showPokemonInfo } from "./pokemonInfoDialog.js";
import { PokemonColorTypes } from "./utils/PokemonColorTypes.js";



const loadMorePokemonsButtonElement = document.getElementById("load-more-pokemons-button");
let loadedPokemonCardAmount = 0;



function getPokemonTypeIcons(pokemonData) {
    const typeIcons = pokemonData.types.map(typeData => {
        const typeName = typeData.type.name;
        return `<p class="type-icon" style="--color: ${PokemonColorTypes[typeName]};">${typeName}</p>`;
    });
    return typeIcons.join("");
}



async function getPokemonDataById(id) {
    const pokemonULR = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const response = await fetch(pokemonULR);
    return response.json();
}



function generatePokemonCard(pokemonData) {
    const crieAudioId = `${pokemonData.name}-crie`;
    const pokemonListElement = document.getElementById("pokemon-list");

    const div = document.createElement("div");
    div.classList.add("pokemon-card");
    div.innerHTML = `
            <audio id="${crieAudioId}" src="${pokemonData.cries.latest}" preload="auto"></audio>
            <img src="${pokemonData.sprites.other["official-artwork"].front_default}">
            
            <div class="card-body">
                <p class="id"> Nº ${pokemonData.id.toString().padStart(4, "0")}</p>
                <h2>${pokemonData.name}</h2>
                ${getPokemonTypeIcons(pokemonData)}
            </div>
    `;

    div.addEventListener("click", () => {
        showPokemonInfo(pokemonData);
        const audioElement = div.querySelector("audio");
        audioElement.volume = 0.006;
        audioElement.play();
    });

    pokemonListElement.append(div);
}



async function generatePokemonCards(amount = 1) {
    const maxAmount = loadedPokemonCardAmount + amount + 1;
    let promises = [];

    for (let i = loadedPokemonCardAmount + 1; i < maxAmount; i++) {
        promises.push(getPokemonDataById(i));
        loadedPokemonCardAmount++;
    }


    const resolvedPromises = await Promise.all(promises);
    resolvedPromises.forEach(pokemonData => {
        if (pokemonData) {
            generatePokemonCard(pokemonData);
        }
    });
}



generatePokemonCards(32);



loadMorePokemonsButtonElement.addEventListener("click", () => {
    generatePokemonCards(16);
});