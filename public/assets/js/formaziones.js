$(document).ready(function(){


	$.get("http://localhost:5000/idea", function(data, status){

        var Formazione=JSON.parse(data);
        

        var text="";


		for(var i=0;i<Formazione.fomraziones.length;i++){

            var formazione = Formazione.fomraziones[i];

            var data = new Date(formazione.date);

            var img = formazione.photoGallery[0];
            
            var direction = "";

            if(formazione.view =="UP"){
    
                direction = "https://ik.imagekit.io/uvbstpfvet/up_dpZskJb5Dh.png" ;
    
            } else if(formazione.view =="DOWN"){
    
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
				<div class="col-12 col-md-6 col-lg-4 col-xl-3 card p-3 text-center item">
                    <div class="image-over">
                        <img src="${img}" alt="mia">
                    </div>
                    <div class="card-caption col-12 p-0">
                        <div class="card-body">
                            <a href="http://localhost:5000/assets/pages/articoli/singolo_idea.html?id=${formazione._id}">
                                <h4>${formazione.title}.</h4>
                            </a>
                        </div>
                        <div class="row card-footer align-items-center justify-content-left xs-justify-content-left sm-justify-content-left">
                            <a class="p-1 col align-items-left"><i class="icon-clock"></i>${data.getDate()}/${data.getMonth()}/${data.getFullYear()}</a>
                            <a class="p-1 col align-items-left"><i class="icon-location-pin"></i>${formazione.ticker}</a>
                        </div>
                    </div>
                </div>
                `;
			
        }

        console.log(text);

        $("#card").append(
            `

            <div class="row p-3">
                ${text}        
            </div>
            `
        );
        


    });

    $("#card").enhanceWithin();
    
 
});

	