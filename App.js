document.getElementById("search-button").addEventListener("click", async () => {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    
    clearPokemonInfo();

    if (query === "red") {
        alert("Pokémon not found");
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        if (!response.ok) throw new Error("Pokémon not found");
        
        const data = await response.json();
        displayPokemonInfo(data);
    } catch (error) {
        alert("Pokémon not found");
    }
});

function displayPokemonInfo(data) {
    document.getElementById("pokemon-name").textContent = data.name.toUpperCase();
    document.getElementById("pokemon-id").textContent = `#${data.id}`;
    document.getElementById("weight").textContent = `Weight: ${data.weight}`;
    document.getElementById("height").textContent = `Height: ${data.height}`;

    const stats = data.stats.reduce((acc, stat) => {
        acc[stat.stat.name] = stat.base_stat;
        return acc;
    }, {});
    document.getElementById("hp").textContent = stats.hp;
    document.getElementById("attack").textContent = stats.attack;
    document.getElementById("defense").textContent = stats.defense;
    document.getElementById("special-attack").textContent = stats["special-attack"];
    document.getElementById("special-defense").textContent = stats["special-defense"];
    document.getElementById("speed").textContent = stats.speed;

    const typesContainer = document.getElementById("types");
    typesContainer.innerHTML = "";
    data.types.forEach(typeInfo => {
        const typeElement = document.createElement("span");
        typeElement.textContent = typeInfo.type.name.toUpperCase();
        typesContainer.appendChild(typeElement);
    });

    const spriteContainer = document.getElementById("pokemon-info");
    let sprite = document.getElementById("sprite");
    if (!sprite) {
        sprite = document.createElement("img");
        sprite.id = "sprite";
        spriteContainer.appendChild(sprite);
    }
    sprite.src = data.sprites.front_default;
}

function clearPokemonInfo() {
    document.getElementById("pokemon-name").textContent = "";
    document.getElementById("pokemon-id").textContent = "";
    document.getElementById("weight").textContent = "";
    document.getElementById("height").textContent = "";
    document.getElementById("types").innerHTML = "";
    document.getElementById("hp").textContent = "";
    document.getElementById("attack").textContent = "";
    document.getElementById("defense").textContent = "";
    document.getElementById("special-attack").textContent = "";
    document.getElementById("special-defense").textContent = "";
    document.getElementById("speed").textContent = "";
    const sprite = document.getElementById("sprite");
    if (sprite) sprite.remove();
}
