// Sélectionner le bouton et le champ de texte
let boutonDeRecherche = document.getElementById("searchButton");
let champDeTexte = document.getElementById("pokemonName");

// Ajouter un écouteur d’événement pour le clic sur le bouton
boutonDeRecherche.addEventListener("click", function() {
    let nomDuPokemon = champDeTexte.value.toLowerCase().trim(); // Récupérer et nettoyer le texte
    if (nomDuPokemon) { // Vérifier que le champ n'est pas vide
        fetchPokemonData(nomDuPokemon); // Appeler la fonction fetchPokemonData
    }
});

// Fonction pour récupérer les données du Pokémon depuis l'API
function fetchPokemonData(nomOuId) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nomOuId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("pokémon non trouvé");
            }
            return response.json();
        })
        .then(data => affichePokemon(data)) // Appeler affichePokemon si les données sont trouvées
        .catch(error => {
            console.error("erreur de recherche :", error);
            afficherErreur("pokémon non trouvé. Veuillez réessayer avec un nom ou un ID valide.");
        });
}

// Fonction pour afficher les données du Pokémon
function affichePokemon(data) {
    let conteneurAffichage = document.getElementById("pokemonDisplay");
    conteneurAffichage.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${data.sprites.front_default}" alt="Image de ${data.name}">
        <p>Type : ${data.types.map(type => type.type.name).join(', ')}</p>
        <p>Taille : ${data.height / 10} m</p>
        <p>Poids : ${data.weight / 10} kg</p>
    `;
}

// Fonction pour afficher un message d'erreur
function afficherErreur(message) {
    let conteneurAffichage = document.getElementById("pokemonDisplay");
    conteneurAffichage.innerHTML = `<p style="color: red;">${message}</p>`;
}
