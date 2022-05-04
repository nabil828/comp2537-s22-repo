

type_g = ""

function processPokemonResp(data) {
    // for each, check if the poke has the grass a type
    for (i = 0; i < data.types.length; i++) {
        if (data.types[i].type.name == type_g)
            $("main").append("<p>"+data.id+"</p>")
    }
}


function display(type_) {
    $("main").empty()
    type_g = type_
    // iterate over all the pokemons
    for (i = 1; i <= 100; i++) {
        $.ajax({
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${i}`,
            success: processPokemonResp
        })
    }

}


function setup() {
    display($("#poke_type option:selected").val())


    $("#poke_type").change(() => {
        poke_type = $("#poke_type option:selected").val();
        display($("#poke_type option:selected").val())

    })
}




$(document).ready(setup)