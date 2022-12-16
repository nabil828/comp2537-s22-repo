

function loadEvents() {
    $.ajax({
        url: "http://localhost:5000/timeline/getAllEvents",
        type: "get",
        success: (x) => {
            console.log(x)
            for (i = 0; i < x.length; i++) {

                $("main").append(
                    `
                <p> 
                    Event  Text - ${x[i].text}
                <br> 
                    Event  time - ${x[i].time}
                <br> 
                    Event  Hits - ${x[i].hits}

                <br> 
                    <button class="LikeBuuton" id="${x[i]["_id"]}"> Like! </button>
                </p>

                
                `
                )
            }
        }
    })
}


function increamentHitsByOne(){
    x = this.id
    $.ajax({
        url:`http://localhost:5000/timeline/inreaseHits/${x}`,
        type:"get",
        success: (e)=>{console.log(e)}
    })

    // reload the main div
}
function setup() {
    loadEvents()

    $("body").on('click', '.LikeBuuton', increamentHitsByOne)
}

$(document).ready(setup)