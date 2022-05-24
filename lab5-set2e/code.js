hasFlippedCard = false;


firstCard = undefined
secondCard = undefined

function setup(){
    $(".card").on("click", function (){
        $(this).toggleClass("flip")

        if(!hasFlippedCard){
            // this is the first card
            firstCard = $(this).find('.front_face')[0]
            // console.log(firstCard);
            hasFlippedCard = true;
        }else{
            // 2nd card
            secondCard =  $(this).find('.front_face')[0]
            console.log(firstCard, secondCard);
            hasFlippedCard = false;


            if(
                $(`#${firstCard.id}`).attr("src") 
                == 
                $(`#${secondCard.id}`).attr("src")
                )
            {
                console.log("A Match!");
                // inc a global 
                // disable cards
            }else{
                console.log("Not A Match!");
                // unflip cards
            }
        }

        
    })
}


$(document).ready(setup)