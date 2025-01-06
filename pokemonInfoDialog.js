const pokemonInfoDialog = document.getElementById("pokemon-info-dialog");
const pokemonInfoElement = pokemonInfoDialog.querySelector("#pokemon-info");
const closeButton = pokemonInfoDialog.querySelector("#close-button");
closeButton.addEventListener("click", () => pokemonInfoDialog.close());



async function getPokemonSpecie(pokemonId) {
    const pokemonSpecieURL = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`;
    const reponse = await fetch(pokemonSpecieURL);
    return reponse.json();
}



async function showPokemonInfo(pokemonData) {
    const pokemonSpecieData = await getPokemonSpecie(pokemonData.id);
    const pokemonName = (
        pokemonSpecieData.names.find(({ language }) => language.name === navigator.language) ??
        pokemonSpecieData.names.find(({ language }) => language.name === "en")
    ).name;

    const pokemonFlavorText = (
        pokemonSpecieData.flavor_text_entries.find(({ language }) => language.name === navigator.language) ??
        pokemonSpecieData.flavor_text_entries.find(({ language }) => language.name === "en")
    ).flavor_text;

    console.log(pokemonFlavorText);


    const infoTitleElement = pokemonInfoElement.querySelector(".pokemon-title");
    const pokemonImage = pokemonInfoElement.querySelector("img");
    const pokemonDescription = pokemonInfoElement.querySelector(".pokemon-description");


    infoTitleElement.textContent = pokemonName;
    pokemonImage.src =pokemonData.sprites.other["official-artwork"].front_default;
    pokemonDescription.textContent = pokemonFlavorText;

    pokemonInfoDialog.showModal();
}



export {
    showPokemonInfo
};

