type_g = ''
function processPokeResponse(data){
    for (i = 0; i < data.types.length ; i++){
        if (data.types[i].type.name == type_g)        {
            
            $("main").append("<p>" + data.id + "</p>")
            
            $("main").append(`<img src="${data.sprites.other["official-artwork"].front_default}" >`)
        }

    } 
    
}

function display(type_){
    $("main").empty()
    type_g = type_
    for (i = 1; i < 100; i++){
        // for each pokemon
        $.ajax({
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${i}`,
            success: processPokeResponse
        })
    }
  
}


function setup(){

    display($("#poke_type option:selected").val());

    $("#poke_type").change(() => {
        // alert($(this).attr("value"));
        poke_type = $("#poke_type option:selected").val();
        display(poke_type);
        
        
      })
}


$(document).ready(setup)