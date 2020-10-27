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
    var idIdea=getUrlParameterValue(self.location.href,"id");

	$.get("https://www.highnlow.it/idea/" + idIdea, function(data, status){

        var Idea=JSON.parse(data);
        var _idea = Idea.idea;

        $("#titleMain").text(_idea.title);
        $("#title").text(_idea.title);
        $("#ticker").text(_idea.ticker);

        console.log(_idea.photoGallery)

        // PHOTO GALLERY TEXT
     
        const element = _idea.photoGallery[0];

        $("#photoGallery").append(
            `     
            <div class="gallery p-3">
                <a href="${element}">
                    <img src="${element}" class="w-100">
                </a>
            </div>
            `
        );
       


        var data = new Date(_idea.date);

        $("#posted").text( `${data.getDate()}/${data.getMonth()}/${data.getFullYear()} `);

        var direction = "";

        if(_idea.view =="UP"){

            direction = "https://ik.imagekit.io/uvbstpfvet/up_dpZskJb5Dh.png" ;

        } else if(_idea.view =="DOWN"){

            direction = "https://ik.imagekit.io/uvbstpfvet/2_2yuzGWCZj.png" ;

        } else {

            direction = "https://ik.imagekit.io/uvbstpfvet/1_J_uHHzwpk_QZ.png" ;

        }

        $("#view").append(
            `     
            <img src="${direction}" class="trend-immage">
            `
            );

        $("#immageMain").append(
            `     
            <img src="${_idea.photoGallery[0]}" class="full-image" data-mask="50">
            `
            );
        


        $("#graph").append(
            `
            <!-- TradingView Widget BEGIN -->
            <div id="tv-idea-preview-${_idea.tradingviewLink}"></div>
            <script type="text/javascript">
                new TradingView.IdeaWidget({
                "container_id": "tv-idea-preview-${_idea.tradingviewLink}",
                "width": "100%",
                "height": "100%",
                "idea": "${_idea.tradingviewLink}",
                "locale": "it",
                "colorTheme": "dark",
                "isTransparent": true,
                });
            </script>
            <!-- TradingView Widget END -->
            `
        );
    });
    

    
    document.addEventListener("DOMContentLoaded", function(event) {
        document.body.innerHTML += str;
    });
});

	