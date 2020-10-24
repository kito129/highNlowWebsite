$(document).ready(function(){


	$.get("http://45.137.202.41:5000/formazione", function(data, status){

        var Formazione=JSON.parse(data);

        var text="";


		for(var i=0;i<3;i++){

            var _formazione = Formazione.formaziones[i];

            var data = new Date(_formazione.date);

            var img = _formazione.photoGallery[0];
            
			text = text +

                `
				<div class="col-12 col-md-6 col-lg-4 col-xl-4 card p-3 text-center item">
                    <div class="image-over">
                        <img src="${img}" alt="mia">
                    </div>
                    <div class="card-caption col-12 p-0">
                        <div class="card-body">
                            <a href="http://45.137.202.41:5000/assets/pages/articoli/singolo_formazione.html?id=${_formazione._id}">
                                <h4>${_formazione.title}</h4>
                            </a>
                        </div>
                        <div class="row card-footer align-items-center justify-content-left xs-justify-content-left sm-justify-content-left">
                            <a class="p-1 col align-items-left"><i class="icon-clock"></i>${data.getDate()}/${data.getMonth()}/${data.getFullYear()}</a>
                            <a class="p-1 col align-items-left"><i class="icon-menu"></i>${_formazione.tag}</a>
                        </div>
                    </div>
                </div>
                `;
			
        }

        $("#formazione").append(
            `

            <div class="row p-3">
                ${text}        
            </div>
            `
        );

    });


    $.get("http://45.137.202.41:5000/idea", function(data, status){

        var Idea=JSON.parse(data);
        

        var text="";


		for(var i=0;i<3;i++){

            var idea = Idea.ideas[i];

            var data = new Date(idea.date);

            var img = idea.photoGallery[0];
            
            var direction = "";

            if(idea.view =="UP"){
    
                direction = "https://ik.imagekit.io/uvbstpfvet/up_dpZskJb5Dh.png" ;
    
            } else if(idea.view =="DOWN"){
    
                direction = "https://ik.imagekit.io/uvbstpfvet/2_2yuzGWCZj.png" ;
    
            } else {
    
                direction = "https://ik.imagekit.io/uvbstpfvet/1_J_uHHzwpk_QZ.png" ;
    
            }
    
            $("#view").append(
                `     
                <img src="${direction}" class="trend-immage">
                `
                );

			text = text +

                `
				<div class="col-12 col-md-6 col-lg-4 col-xl-4 card p-3 text-center item">
                    <div class="image-over">
                        <img src="${img}" alt="mia">
                    </div>
                    <div class="card-caption col-12 p-0">
                        <div class="card-body">
                            <a href="http://45.137.202.41:5000/assets/pages/articoli/singolo_idea.html?id=${idea._id}">
                                <h4>${idea.title}</h4>
                            </a>
                        </div>
                        <div class="row card-footer align-items-center justify-content-left xs-justify-content-left sm-justify-content-left">
                            <a class="p-1 col align-items-left"><i class="icon-clock"></i>${data.getDate()}/${data.getMonth()}/${data.getFullYear()}</a>
                            <a class="p-1 col align-items-left"><i class="icon-location-pin"></i>${idea.ticker}</a>
                            <a class="p-1 col align-items-left"><img src="${direction}" class="trend-immage-small"></a>
                        </div>
                    </div>
                </div>
                `;
			
        }

        $("#idea").append(
            `

            <div class="row p-3">
                ${text}        
            </div>
            `
        );
        


    });

 
});

	