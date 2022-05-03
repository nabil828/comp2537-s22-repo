
to_add = ''

function processPokeResp(data){
    // console.log(data)
     // 3- process the reponse and extract the img
     to_add += ` ${data.name}
      <div class="image_container">
      <a href="/profile/${data.id}">  
      <img src="${data.sprites.other["official-artwork"].front_default}">
      </a>
      </div>`
}

async function loadNineImages() {
    for (i = 1; i <= 9; i++) { // Nine times
        if (i % 3 == 1) { // only when i= 1, 4, 7
            to_add += `<div class="images_group">`
        }
        
        // 1- generate randome numebers 
        x =  Math.floor(Math.random() * 100) + 1

        // 2- init a AJAX request to pokeapi.co
        await $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${x}/`,
            success: processPokeResp
        })

       

        if (i % 3 == 0) { // only when i= 3, 6, 9
            to_add += `</div>`
        }
    }
    jQuery("main").html(to_add)
}

function setup() {
    loadNineImages();
    // events handlers
}

jQuery(document).ready(setup)