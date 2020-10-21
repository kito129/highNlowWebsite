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
    var idFormazone=getUrlParameterValue(self.location.href,"id");

	$.get("http://localhost:5000/formazione/" + idFormazone, function(data, status){

        var Formazione=JSON.parse(data);
        var _formazione = Idea.idea;

        $("#titleMain").text(_formazione.title);
        $("#title").text(_formazione.title);
       

    });
    

    
    document.addEventListener("DOMContentLoaded", function(event) {
        document.body.innerHTML += str;
    });
});

	