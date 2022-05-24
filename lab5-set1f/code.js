secondCard = undefined
firstCard = undefined

cardHasBeenFlipped = false

function setup() {
    $(".card").on("click", function () {
        $(this).toggleClass("flip")

        if (!cardHasBeenFlipped) {
            //captured first card
            firstCard = $(this).find(".front_face")[0]
            // console.log(firstCard);
            cardHasBeenFlipped = true
        } else {
            secondCard = $(this).find(".front_face")[0]
            console.log(firstCard, secondCard);
            cardHasBeenFlipped = false;

            // check if you have match
            if (
                $(`#${firstCard.id}`).attr("src")
                ==
                $(`#${secondCard.id}`).attr("src")
            ) {
                console.log("A Match!");
                $(`#${firstCard.id}`).parent().off("click")
                $(`#${secondCard.id}`).parent().off("click")
            } else {
                console.log("not a Match!");
                setTimeout(() => {
                    $(`#${firstCard.id}`).parent().removeClass("flip")
                    $(`#${secondCard.id}`).parent().removeClass("flip")
                }, 1000)

            }
        }



        // reset 
        // firstCard = undefined
        // secondCard = undefined

    })
}



$(document).ready(setup)