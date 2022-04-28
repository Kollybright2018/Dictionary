window.addEventListener("load", (event) => {
    const statusDisplay = document.getElementById("status");
    statusDisplay.textContent = navigator.onLine ? "Online" : "OFFline";
    console.log(statusDisplay);
});

function getid(id, display) {
    id = document.getElementById(id)
    id.innerHTML = display
}

let no = 0;

let p = '<audio  control class=""> <source src="images/here.mp3" type="audio/ogg">  <source src="images/here.mp3" type="audio/mpeg"> </audio>'
function play(link, id) {
    id = document.getElementById(id);
    id.innerHTML = '<audio  style="display:none" controls autoplay  > <source src="' + link + ' " type="audio/ogg">  <source src="' + link + '" type="audio/mpeg"> </audio>'
}

// element
let span = "";
let sub = document.getElementById('sub');
// form data
let form = document.getElementById("search_form");
let text = form['search_text']
console.log(text.value)
async function dictionary(input) {
    let url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + input.value;
    let response = await fetch(url)
    let data = await response.json()
        .catch(function (error) {
            console.log(error);
        })


    // console.log(url)
    getid('word', text.value)
    // Check weather the input word is Available
    if (data.length == 0 || data.length == undefined) {
        let message = data['message'];
        let title = data['title']
        getid('message', message);
        getid('title', title);
    } else {
        for (let i = 0; i < data.length; i++) {

            span += "<p>" + data[i]['word'] + "<br>" + "<span> <b> " + data[i]['meanings'][0]['partOfSpeech'] + "</b><br>";
            getid('text', span)
            for (let p = 0; p < data[i]['phonetics'].length; p++) {
                if ('text' in data[i]['phonetics'][p] && 'audio' in data[i]['phonetics'][p]) {
                    // span += "<span>" + data[i]['phonetics'][p]['text'] + "  " +  '<i class="fas fa-volume-up"></i>'  + "  " + "</span>"         
                    if (data[i]['phonetics'][p]['text'] != ' ') {
                        span += "<span class='text-danger'>" + data[i]['phonetics'][p]['text'] + "  "
                        if (data[i]['phonetics'][p]['audio'] != '') {
                            span += '<button onclick=' + ' "play(' + " ' " + data[i]["phonetics"][p]["audio"] + " ' " + " ,'play'" + '  )" ' +
                                'class="btn btn-light btn-sm fas fa-volume-up" id="play" > </button>' + "  " + "</span>"
                         }
                    }
                }
            } // Phonetics loop
            for (let m = 0; m < data[i]['meanings'].length; m++) {
                span += "<br> <b>" + data[i]['meanings'][m]['partOfSpeech'] + "</b>"
                for (let d = 0; d < data[i]['meanings'][m]['definitions'].length; d++) {
                    no++
                    span += "<br> <b class='text-info'>" + no + " Defination </b><br>" + '' + " <span>" + data[i]['meanings'][m]['definitions'][d]['definition'] + "</span> "
                    if ('example' in data[i]['meanings'][m]['definitions'][d]) {
                        span += "<br><br> <span> <i> Example: " + data[i]['meanings'][m]['definitions'][d]['example'] + " </i></span> <br>"
                    }
                }  // Defination for

                if ('synonyms' in data[i]['meanings'][m]) {

                    if (data[i]['meanings'][m]['synonyms'].length !=0) {
                        let synonmys = data[i]['meanings'][m]['synonyms'].join(' , ');
                        span += "<br><br> <span> <b>   Synonyms: <br>  </b> " + synonmys + " </i></span> <br>"

                    }
                }

                //  for Antonyms
                if ('antonyms' in data[i]['meanings'][m]) {
                    if (data[i]['meanings'][m]['antonyms'].length != 0) {
                           let antonyms = data[i]['meanings'][m]['antonyms']
                        antonyms.join(', ')
                        span += "<br><br> <span> <b>   Antonmys: <br>  </b> " + antonyms + " </i></span> <br>"
                    }
                }
            } //meanings loo

            span += "</p>" // Closing of first p tag

        } // i for
        // getid('display', span)

    } // else (if word found)

}

// console.log(text);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    dictionary(text);

    // sub.addEventListener('click', () => {
    //     span = '';
    //     window.location.reload()
    //     //   dictionary(text);
    // })
    // fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+text.value, {
    //     method: "GET"
    // })
    // .then(response =>{
    //     return response.json();
    // })

    // .then(data =>{
    // console.log(data.length);

    // for(let i=0; data[0].array.length; i++){

    // }
    // console.log(data);
}) //then

// })

