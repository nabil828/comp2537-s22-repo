to_add = ""

function processGetNinePokemons(data) {
    console.log(data);
    to_add += `<div class="image_container">` +
        `<a href="/profile/${data.id}"> <img src="${data.sprites.other["official-artwork"]["front_default"]}"> </a>` +
        `</div>`;
}

async function getNinePokemons() {
    for (i = 1; i <= 9; i++) {
        if (i % 3 == 1) {

            to_add += '<div class="images_group">';
        }
        x = Math.floor(Math.random() * 100) % 100 + 1

        try {
            await $.ajax({
                type: "GET",
                url: `https://pokeapi.co/api/v2/pokemon/${x}`,
                success: processGetNinePokemons
            })
        } catch (e) {
            console.log(e);
        }


        if (i % 3 == 0) {
            to_add += '</div>';
        }

    }
    $("main").html(to_add);
}


function findByName() {
    alert()
    x = $("#pokemonNameValue").val()
    $.ajax({
        type: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/${x}`,
        success: function (data) {
            $("main").html(data)
        }
    })
}
function setup() {
    // console.log("all is good")
    getNinePokemons();
    $("#findByName").click(findByName);
}

$(document).ready(setup)