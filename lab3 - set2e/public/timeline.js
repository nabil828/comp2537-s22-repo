

function loadEventsToMainDiv() {
    $.ajax({
        url: "http://localhost:5000/timeline/getAllEvents",
        type: "get",
        success: (r)=>{
            console.log(r)
            for( i = 0 ; i < r.length; i++  ){
                $("main").append(`
                    <p> Event Text -  ${r[i].text} </p>
                    
                    <p> Event Time - ${r[i].time} </p>
                    
                    <p> Event Hits - ${r[i].hits} </p>
                    <button class="likeButtons" id="${r[i]["_id"]}"> Like! </button> 

                    `)         
            }
           
        }
    })
}

function increaseHits(){
    x = this.id
    $.ajax({
        url: `http://localhost:5000/timeline/inscreaseHits/${x}`,
        type: "get",
        success: function (x){
            console.log(x)
        }
    })
}
function setup(){
    loadEventsToMainDiv()


    $("body").on("click", ".likeButtons", increaseHits)
}



$(document).ready(setup)