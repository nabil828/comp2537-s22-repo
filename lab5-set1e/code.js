hasFlippedCard = false
firstCard = undefined
secondCard = undefined

function setup(){
    $(".card").on('click', function (){
        $(this).toggleClass("flip");

        if(!hasFlippedCard){
            // this is the first card flipped
            firstCard = $(this).find('.front_face')[0]
            // console.log(firstCard);
            hasFlippedCard = true;
        }else{
            // oh , there is a card flipped and this is the 2nd one
            secondCard = $(this).find('.front_face')[0]
            // console.log(firstCard, secondCard);

            if(
                $(`#${firstCard.id}`).attr("src") 
                == 
                $(`#${secondCard.id}`).attr("src")
            )
            {
                console.log("a Match!");
            }else{
                console.log("not a match!");
            }
        }

        
    }) 

   
    


    
}


$(document).ready(setup)