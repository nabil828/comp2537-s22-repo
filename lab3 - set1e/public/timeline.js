function loadTimeline() {
    $.ajax({
        type: "get",
        url: "http://localhost:5000/timeline/getAll",
        data: " ",
        success: (data) => {
            console.log(data)
            for (i = 0; i < data.length; i++) {

                $("main").append(`
                    <p> Text: ${data[i].text}</p>
                    <p> Time: ${data[i].time}</p>
                    <p> Hits: ${data[i].hits}</p>       
                    <button class="likeButtons" id="${data[i]["_id"]}"> Like! </button>     
                `)
            }
        }
    })
}
function increaseHitUpdateRequest () {
    x = this.id
    $.ajax({
        'url': `/timeline/update/${x}`,
        'type': "get",
        'success': (r) => {console.log(r)},
    })
}

function setup() {
    loadTimeline()
    $("body").on('click', '.likeButtons', increaseHitUpdateRequest )
}

$(document).ready(setup)