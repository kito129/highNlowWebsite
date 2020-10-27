$(document).ready(function(){


	$.get("https://www.highnlow.it/idea", function(data, status){

        var Idea=JSON.parse(data);
        

        var text="";


		for(var i=0;i<Idea.ideas.length;i++){

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
				<div class="col-12 col-md-6 col-lg-4 col-xl-3 card p-3 text-center item">
                    <div class="image-over">
                        <img src="${img}" alt="mia">
                    </div>
                    <div class="card-caption col-12 p-0">
                        <div class="card-body">
                            <a href="https://www.highnlow.it/assets/pages/articoli/singolo_idea.html?id=${idea._id}">
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

        $("#card").append(
            `

            <div class="row p-3">
                ${text}        
            </div>
            `
        );
        


    });
    
 
});

	