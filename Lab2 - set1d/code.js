to_add = ""
function processPokeAPIResp(data) {
    // console.log(data)
    to_add += `  <div class="image_container">`
    to_add += `     <img  src="${data.sprites.other["official-artwork"].front_default}">`
     to_add += `  </div>`
}

async function loadPokemons() {
    for (i = 1; i <= 9; i++) {
        if(i % 3 == 1) // i= 1, 4, 7
            to_add += `<div class="images_group">`
        x = Math.floor(Math.random() * 99) + 1
        await $.ajax(
            {
                "url": `https://pokeapi.co/api/v2/pokemon/${x}`,
                "type": "get",
                "success": processPokeAPIResp
            }
        )
        if(i % 3 == 0) // i= 3, 6, 9
            to_add += `</div>`
    }
    $("main").html(to_add)
}


function setup() {
    loadPokemons()
}


$(document).ready(setup)