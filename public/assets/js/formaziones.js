$(document).ready(function(){


	$.get("https://www.highnlow.it/formazione", function(data, status){

        var Formazione=JSON.parse(data);



        /*
        var text= 
        ` 
        <!--TURBO 24 IG 1-->
        <div class="col-12 col-md-6 col-lg-4 col-xl-3 card p-3 text-center item">
            <div class="image-over">
                <img src="https://ik.imagekit.io/uvbstpfvet/Artboard_17_vEtytDRvQ.png" alt="mia">
            </div>
            <div class="card-caption col-12 p-0">
                <div class="card-body">
                    <a href="https://highnlow.it/assets/pages/ig/turbo24ig1.html">
                        <h3>Special IG - Certificati Turbo24</h3>
                    </a>
                </div>
                <div class="row card-footer align-items-center justify-content-left xs-justify-content-left sm-justify-content-left">
                    <a class="p-1 col align-items-left"><i class="icon-clock"></i>03/02/2021</a>
                    <a class="p-1 col align-items-left"><i class="icon-menu"></i>Esclusivi</a>
                </div>
            </div>
        </div>
        <!--TURBO 24 IG 2-->
        <div class="col-12 col-md-6 col-lg-4 col-xl-3 card p-3 text-center item">
            <div class="image-over">
                <img src="https://ik.imagekit.io/uvbstpfvet/Artboard_18_U_cfZWI77z.png" alt="mia">
            </div>
            <div class="card-caption col-12 p-0">
                <div class="card-body">
                    <a href="https://highnlow.it/assets/pages/ig/turbo24ig2.html">
                        <h3>Special IG - Certificati Turbo24</h3>
                    </a>
                </div>
                <div class="row card-footer align-items-center justify-content-left xs-justify-content-left sm-justify-content-left">
                    <a class="p-1 col align-items-left"><i class="icon-clock"></i>04/02/2021</a>
                    <a class="p-1 col align-items-left"><i class="icon-menu"></i>Esclusivi</a>
                </div>
            </div>
        </div>
        <!--TURBO 24 IG 3-->
        <div class="col-12 col-md-6 col-lg-4 col-xl-3 card p-3 text-center item">
            <div class="image-over">
                <img src="https://ik.imagekit.io/uvbstpfvet/Artboard_19_O8ilNNk7y2QF5.png" alt="mia">
            </div>
            <div class="card-caption col-12 p-0">
                <div class="card-body">
                    <a href="https://highnlow.it/assets/pages/ig/turbo24ig3.html">
                        <h3>Special IG - CFD e Opzioni</h3>
                    </a>
                </div>
                <div class="row card-footer align-items-center justify-content-left xs-justify-content-left sm-justify-content-left">
                    <a class="p-1 col align-items-left"><i class="icon-clock"></i>05/02/2021</a>
                    <a class="p-1 col align-items-left"><i class="icon-menu"></i>Esclusivi</a>
                </div>
            </div>
        </div>

        `;

        */


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
                            <a href="https://www.highnlow.it/assets/pages/articoli/singolo_formazione.html?id=${_formazione._id}">
                                <h3>${_formazione.title}</h3>
                            </a>
                        </div>
                        <div class="row card-footer align-items-center justify-content-left xs-justify-content-left sm-justify-content-left">
                            <a class="p-1 col align-items-left"><i class="icon-clock"></i>${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}</a>
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

