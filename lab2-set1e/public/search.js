// resultIDList = []
typeGlobal = ''
function processSinglePokemonObject(data) {
    for (i = 0; i < data.types.length; i++) {

        if (data.types[i].type.name == typeGlobal) {

            $("main").append(`<p>${data.name} </p>`)

            // $("main").append(`<img src="${data.sprites.other["official-artwork"].front_default}"> `)
        }

    }
}

function display(type_) {
    $("main").empty();
    typeGlobal = type_
    for (i = 1; i <= 1000; i++) { // iterate over 100 pokemons
         $.ajax(
            {
                type: "get",
                url: `https://pokeapi.co/api/v2/pokemon/${i}`,
                success: processSinglePokemonObject
            }
        )

    }
    // alert("asdas")

    // $("main").html(resulList)

}
function setup() {
    display($("#poke_type option:selected").val()); // default value for the element

    $("#poke_type").change(() => {
        display($("#poke_type option:selected").val()); // ?
    })

}

$(document).ready(setup)