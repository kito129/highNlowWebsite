function getUrlParameterValue(url, parameter) {
    var questionSplit = url.split('?');
    questionSplit.shift();
    var onlyParameters = questionSplit.join('?');
    var splittedParameters = onlyParameters.split('&');
    var found = false;
    var value = null;
    for (var c = 0; c < splittedParameters.length; c++) {
        var parts = splittedParameters[c].split('=');
        if (parts[0] == parameter) {
            value = parts[1];
            if (value.trim()== '') {
                found = false;
            } else {
                found = true;
            }
        }
        if (found) {
            return value;
        }
    }
    if (!found) {
        return false;
    }
}

$(document).ready(function(){


    //ARTIST
    var idFormazione=getUrlParameterValue(self.location.href,"id");

	$.get("http://45.137.202.41:5000/formazione/" + idFormazione, function(data, status){

        var Formazione=JSON.parse(data);
        var _formazione = Formazione.formazione;

        // TEXT
        $("#mainTitle").text(_formazione.title);
        $("#title").text(_formazione.title);
        $("#imgTitle").text(_formazione.title);
        $("#subtitle").text(_formazione.subtitle);
        $("#paragraph").append(_formazione.paragraph);

        // TAG
        for (let i = 0; i < _formazione.tag.length; i++) {
            const element = _formazione.tag[i];

            $("#tag").append(
                `     
                <span class="badge tag m-0 active"">${element}</span>
                `
            );
            
        }

        // DATE
        var data = new Date(_formazione.date);

        $("#posted").text( `${data.getDate()}/${data.getMonth()}/${data.getFullYear()} `);

        var today = new Date();

        // To calculate the time difference of two dates 
        var Difference_In_Time = today.getTime() - data.getTime(); 
        
        // To calculate the no. of days between two dates 
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
        Difference_In_Days = Math.round(Difference_In_Days);
        var esplated = Difference_In_Days.toString() +" giorni fa";

        $("#timeEsp").append(esplated);

        // MAIN IMMAGE
        $("#immageMain").append(
            `     
            <img src="${_formazione.photoGallery[0]}" class="full-image" data-mask="50">
            `
            );


        // PHOTO GALLERY TEXT
        for (let j = 0; j < _formazione.photoGallery.length; j++) {
            const element = _formazione.photoGallery[j];

            $("#immage").append(
                `     
                <!-- Image ${j} -->
                <div class="gallery p-3">
                    <img src="${element}" class="w-100">
                </div>
                `
            );
            
        }

         // IMMAGE GALLY WIDGET GALLERY TEXT
         for (let j = 0; j < _formazione.photoGallery.length; j++) {
            const element = _formazione.photoGallery[j];

            $("#photoGallery").append(
                `     
                <a class="col-6 item" href="${element}">
                    <img src="${element}" class="w-100">
                </a>
                `
            );
            
        }
        

    });
    

    
    document.addEventListener("DOMContentLoaded", function(event) {
        document.body.innerHTML += str;
    });
});

	