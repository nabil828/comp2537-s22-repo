firstCard = undefined
secondCard = undefined

firstCardHasBeenFlipped = false

function setup() {
    $(".card").on("click", function () {
        $(this).toggleClass("flip")

        if (!firstCardHasBeenFlipped) {
            // the first card
            firstCard = $(this).find(".front_face")[0]
            // console.log(firstCard);
            firstCardHasBeenFlipped = true
        } else {
            // this is the 2nd card
            secondCard = $(this).find(".front_face")[0]
            firstCardHasBeenFlipped = false
            console.log(firstCard, secondCard);
            // ccheck if we have match!
            if (
                $(`#${firstCard.id}`).attr("src")
                ==
                $(`#${secondCard.id}`).attr("src")
            ) {
                console.log("a match!");
                // update the game state
                // disable clicking events on these cards
                $(`#${firstCard.id}`).parent().off("click")
                $(`#${secondCard.id}`).parent().off("click")
            } else {
                console.log("not a match");
                // unflipping
                setTimeout(() => {
                    $(`#${firstCard.id}`).parent().removeClass("flip")
                    $(`#${secondCard.id}`).parent().removeClass("flip")
                }, 1000)
            }
        }
    })
}

$(document).ready(setup)