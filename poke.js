// Sélectionner les éléments DOM
let boutonDeRecherche = document.getElementById('searchButton');
let champTextPoke = document.getElementById('pokemonName');

// Ajouter un événement de clic sur le bouton de recherche
boutonDeRecherche.addEventListener("click", function() {
    let nomDuPokemon = champTextPoke.value.toLowerCase().trim();
    if (nomDuPokemon) {
        fetchPokemonData(nomDuPokemon); // Appelle la fonction pour récupérer et afficher le Pokémon
    }
});

// Fonction pour récupérer les données du Pokémon
function fetchPokemonData(nomOuId) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nomOuId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon non trouvé :( ');
            }
            return response.json();
        })
        .then(data => {
            affichePokemon(data); // Afficher les données du Pokémon recherché
            afficherPokemonAleatoires(5); // Afficher 5 Pokémon aléatoires
        })
        .catch(error => {
            console.error('Erreur de recherche : ', error);
            afficherErreur('Pokémon non trouvé. Veuillez réessayer avec un nom ou un ID valide.');
        });
}

// Fonction pour afficher les informations du Pokémon
function affichePokemon(data) {
    let conteneurAffichage = document.getElementById('pokemonDisplay');
    conteneurAffichage.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${data.sprites.front_default}" alt="Image de ${data.name}">
        <p>Type : ${data.types.map(type => type.type.name).join(', ')}</p>
        <p>Taille : ${data.height / 10} m</p>
        <p>Poids : ${data.weight / 10} kg</p>
    `;
}

// Fonction pour afficher des Pokémon aléatoires
function afficherPokemonAleatoires(nombre) {
    const randomPokemonId = [];
    for (let i = 0; i < nombre; i++) {
        randomPokemonId.push(Math.floor(Math.random() * 1000) + 1); // Crée des IDs aléatoires entre 1 et 1000
    }

    const promises = randomPokemonId.map(id =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
    );

    Promise.all(promises)
        .then(pokemonData => {
            const conteneurAffichage = document.getElementById('randomPokemonDisplay');
            conteneurAffichage.innerHTML = ""; // Vider la section avant d'afficher les nouveaux Pokémon
            
            pokemonData.forEach(pokemon => {
                conteneurAffichage.innerHTML += `
                    <div>
                        <h3>${pokemon.name}</h3>
                        <img src="${pokemon.sprites.front_default}" alt="Image de ${pokemon.name}">
                        <p>Type : ${pokemon.types.map(type => type.type.name).join(', ')}</p>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error("Erreur avec les Pokémon aléatoires : ", error);
        });
}

// Fonction pour afficher un message d'erreur
function afficherErreur(message) {
    const conteneurErreur = document.getElementById('pokemonDisplay');
    conteneurErreur.innerHTML = `<p style="color: red;">${message}</p>`;
}

// Appel automatique pour afficher des Pokémon aléatoires dès le chargement de la page
window.onload = function() {
    afficherPokemonAleatoires(5); // Affiche 5 Pokémon aléatoires dès le début
};
