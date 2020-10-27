$(document).ready(function(){


	$.get("https:/www.highnlow.it/formazione", function(data, status){

        var Formazione=JSON.parse(data);

        var text="";


		for(var i=0;i<Formazione.formaziones.length;i++){

            var _formazione = Formazione.formaziones[i];

            var data = new Date(_formazione.date);

            var img = _formazione.photoGallery[0];
            
			text = text +

                `
				<div class="col-12 col-md-6 col-lg-4 col-xl-3 card p-3 text-center item">
                    <div class="image-over">
                        <img src="${img}" alt="mia">
                    </div>
                    <div class="card-caption col-12 p-0">
                        <div class="card-body">
                            <a href="https:/www.highnlow.it/assets/pages/articoli/singolo_formazione.html?id=${_formazione._id}">
                                <h3>${_formazione.title}</h3>
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

        $("#card").append(
            `

            <div class="row p-3">
                ${text}        
            </div>
            `
        );

    });
 
});

	