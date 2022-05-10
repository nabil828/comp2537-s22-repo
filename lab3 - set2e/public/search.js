async function init_menu() {
    $("#poke_type").empty()
    await $.ajax({
        'url': 'https://pokeapi.co/api/v2/type/',
        'type': 'get',
        'success': (data) => {
            data.results.map((obj) => {
                // $("#poke_type").append(obj.name)
                $('#poke_type').append($('<option>', {
                    value: obj.name,
                    text: obj.name
                }));
            })
        }
    })
}

async function display(type_) {
    $("main").empty()

    await $.ajax({
        type: "get",
        url: 'https://pokeapi.co/api/v2/type/',
        success: async function (data) {
            y = data.results.filter((obj) => {
                return type_ == obj.name
            })[0]
            // console.log(y)
            index = data.results.indexOf(y)

            await $.ajax({
                type: "get",
                url: `https://pokeapi.co/api/v2/type/${index + 1}`,
                success: async (data) => {
                    // console.log("data")
                    var to_add = ""
                    for (i = 0; i < data.pokemon.length; i++) {
                        await $.ajax({
                            'url': `https://pokeapi.co/api/v2/pokemon/${data.pokemon[i].pokemon.name}/`,
                            'type': 'get',
                            'success': (data) => {
                                // console.log(to_add)
                                if (i % 3 == 0) {
                                    to_add += '<div class="images_group">';
                                    console.log("O" + i)
                                }
                                // console.log("3")
                                to_add += `<div class="image_container">`
                                to_add += `<a href="/profile/${data.id}"> `
                                to_add += `<img src="${data.sprites.other["official-artwork"]["front_default"]}"> `
                                // to_add += data.name
                                to_add += `</a>`
                                // to_add += `<br>`
                                to_add += `</div>`;
                                console.log("A" + i)
                                if (i % 3 == 2) {
                                    to_add += '</div>';
                                    console.log("C" + i)
                                }

                            }
                        })

                    }

                    console.log(to_add)
                    $("main").append(to_add)
                }
            })
        }
    })

}

async function setup() {
    await init_menu();
    // display all the grass pokemon
    display($("#poke_type option:selected").val())
    $("#poke_type").change(() => {
        poke_type = $("#poke_type option:selected").val();
        display($("#poke_type option:selected").val())
    })
}

$(document).ready(setup)