
$(function() {
    
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$(window).load(function() {
    $(".loader").fadeOut("slow");
    cargarEspecialidades();
});

var comprotido=false;


//Animacion Footer
$(document).ready(function() {
	
	// INITIATE THE FOOTER
  siteFooter();
	// COULD BE SIMPLIFIED FOR THIS PEN BUT I WANT TO MAKE IT AS EASY TO PUT INTO YOUR SITE AS POSSIBLE
	$(window).resize(function() {
		siteFooter();
	});
	
	function siteFooter() {
		var siteContent = $('#site-content');
		var siteContentHeight = siteContent.height();
		var siteContentWidth = siteContent.width();

		var siteFooter = $('#site-foot');
		var siteFooterHeight = siteFooter.height();
		var siteFooterWidth = siteFooter.width();

		console.log('Content Height = ' + siteContentHeight + 'px');
		console.log('Content Width = ' + siteContentWidth + 'px');
		console.log('Footer Height = ' + siteFooterHeight + 'px');
		console.log('Footer Width = ' + siteFooterWidth + 'px');

		siteContent.css({
			"margin-bottom" : siteFooterHeight + 50
		});
	};

});

//Validar cédula

function validarC() {
	var valido=document.getElementById("vcedula");
	
	var cedula = document.getElementById("cedula").value;
  var num = 0;
 array =cedula.split(""); num=array.length; if( num==10) { total=0; digito=(array[9]*1); for(i=0;i<(num-1);i++) { if((i%2)!=0)
{ total=total+(array[i]*1); } else { mult=array[i]*2; if(mult>9) total=total+(mult-9); else total=total+mult; } } decena=total/10; decena=Math.floor(decena); decena=(decena+1)*10; final=(decena-total); if((final==10 && digito==0)||(final==digito)) { console.log('la cedula:' + cedula + ' es correcta');
    valido.className = "fa fa-check fa-2x";
    valido.style.color="#69ca27";
    valido.style.visibility="visible"; } else {  console.log('la cedula:' + cedula + ' es incorrecta');
    valido.className = "fa fa-times fa-2x";
    valido.style.color="red";
    valido.style.visibility="visible";     
          } }
 else {  console.log('la cedula:' + cedula + ' es incorrecta');
    valido.className = "fa fa-times fa-2x";
    valido.style.color="red";
    valido.style.visibility="visible";     
          } 
         
  }

  function cargar(){
    var fecha = document.getElementById("fecha").value;
    var tipo = document.getElementById("especialidad").value;
    const $select = document.getElementById("hora");
    
    for (let i = $select.options.length; i >= 0; i--) {
        $select.remove(i);
    }
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/api/validarturno/"+fecha+"/"+tipo,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var horas= data['result'];

            
            if(data['code']=="202"){
                  swal(
                    '¡Lo sentimos..!',
                    'No existen citas disponibles en esta fecha.',
                    'error'
                  )

                document.getElementById("fecha").setCustomValidity('No hay turno para esta fecha!');
                document.getElementById("fecha").reportValidity();
            }else{
                $.each(horas, function (i, item) {
                    const option = document.createElement('option');
                                                          
                    option.value = horas[i].id_turno;
                    option.text = horas[i].hora;
                    option.className="op-select";
                
                    $select.appendChild(option);
                });
            }  

        }
    });

    
}
function LimpiarTurnos(){
    document.getElementById("fecha").value="";
    const $select = document.getElementById("hora");
               
    for (let i = $select.options.length; i >= 0; i--) {
        $select.remove(i);
    }
}
  
 //Validar Fecha
   
    /*Restringo Fecha de anteriores a la de hoy */
/*var today = new Date().toISOString().split('T')[0];
document.getElementsByName("fecha")[0].setAttribute('min', today);*/

/*Restringo Fecha de selección hasta 180 días después de la fecha actual */



   function compromete(){
        comprotido= !comprotido
   }

   function cargarEspecialidades(){
  
    const $select = document.getElementById("especialidad");
    
    for (let i = $select.options.length; i >= 0; i--) {
        $select.remove(i);
    }

    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/api/cargarRoles",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var espe= data['result'];

            
            if(data['code']=="202"){
                  swal(
                    '¡Lo sentimos..!',
                    'No hay especialidades disponibles por ahora.',
                    'warning'
                  )

                document.getElementById("fecha").setCustomValidity('No hay turno para esta fecha!');
                document.getElementById("fecha").reportValidity();
            }else{
                $.each(espe, function (i, item) {
                    const option = document.createElement('option');
                                                          
                    option.value = espe[i].rol;
                    option.text = espe[i].rol;
                    option.className="op-select";
                
                    $select.appendChild(option);
                });
            }  

        }
    });
   }
   function cambio( id){
    
    if(document.getElementById(id).value!=""){
        document.getElementById(id).className = "form-control  form-input";
        document.getElementById("label-"+id).className = "label-co";
        if(id=="cedula"){
            document.getElementById("basic-addon1").className = "input-group-addon";
        }else if(id=="fecha"){
            document.getElementById(id).className = " form-control fecha";
        }else if(id=="certi"){
            document.getElementById(id).className = "";
        }


    }else{
       
        document.getElementById(id).className = "input-inco form-control  form-input";
        document.getElementById("label-"+id).className = "label-inco label-co";
        if(id=="cedula"){
            document.getElementById("basic-addon1").className = "input-inco input-group-addon";
        }else if(id=="fecha"){
            document.getElementById(id).className = "input-inco form-control fecha";
        }else if(id=="certi"){
            document.getElementById(id).className = "";
        }
        document.getElementById(id).setCustomValidity('Complete este campo!');
        document.getElementById(id).reportValidity();
    }

   }
    $("#AgendarCita").click(function () {
       
        event.preventDefault();
        
        var nombres = document.getElementById("nombres").value;
        var cedula = document.getElementById("cedula").value;
        var especialidad = document.getElementById("especialidad").value;
        var fecha = document.getElementById("fecha").value;
        var turno = document.getElementById("hora").value;
        var estado= 1;
        var abono="ADZF-BAML-DOLM";

        if(nombres==""||nombres==null||cedula==""||cedula==null||especialidad==null||especialidad==""||fecha==null||fecha==""||turno==null||turno==""||estado==null||estado==""||comprotido==false){
            
            if(nombres==""||nombres==null){
               
                document.getElementById("nombres").className = "input-inco form-control  form-input";
                document.getElementById("nombres").setCustomValidity('Complete este campo!');
                document.getElementById("nombres").reportValidity();
                document.getElementById("label-nombres").className = "label-inco label-co";
            }
            if(cedula==""||cedula==null){
                document.getElementById("cedula").className = "input-inco form-control  form-input";
                document.getElementById("label-cedula").className = "label-inco label-co";
                document.getElementById("basic-addon1").className = "input-inco input-group-addon";
                document.getElementById("cedula").setCustomValidity('Complete este campo!');
                document.getElementById("cedula").reportValidity();
           
            }
            if(fecha==null||fecha==""){
                document.getElementById("fecha").className = "input-inco form-control fecha";
                document.getElementById("label-fecha").className = "label-inco label-co";
                document.getElementById("fecha").setCustomValidity('Complete este campo!');
                document.getElementById("fecha").reportValidity();
            }
            if(turno==null||turno==""){
                document.getElementById("hora").className = "input-inco form-control  form-input";
                document.getElementById("label-hora").className = "label-inco label-co";
                document.getElementById("hora").setCustomValidity('Complete este campo!');
                document.getElementById("hora").reportValidity();
            }
            if(comprotido==false){
                document.getElementById("certi").className = "input-inco ";
                document.getElementById("label-certi").className = "label-inco label-co";
                document.getElementById("certi").setCustomValidity('Complete este campo!');
                document.getElementById("certi").reportValidity();
            }

        }else{
            
            $.ajax({
                type: "GET",
                url: "http://127.0.0.1:8000/api/validarcita/"+cedula+"/"+fecha,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) { 
                    
                    if(data ['code'] == '201'){
                        swal(
                            '¡Error!',
                            'El usuario ya cuenta con una cita en esta fecha.',
                            'error'
                          )
                      }else{
                        const fechaA = new Date();
                        const fechaActual = fechaA.getFullYear()+"-"+(fechaA.getMonth() + 1)+"-"+fechaA.getDate();                      
                        $.ajax({
            
                            url: "http://127.0.0.1:8000/api/Cita",
                            type: "Post",
                            data: JSON.stringify({
                                'nombres' : nombres,
                                'cedula' : cedula,
                                'fecha' : fecha,
                                'id_turno' : turno,
                                'estado': estado,
                                'abono': abono,
                                'fecha_actual':fechaActual,
                            }),
                            contentType: 'application/json; charset=utf-8',
                            success: function (data) {
                                if(data['code']=='201'){
                                    document.getElementById("nombres").value="";
                                    document.getElementById("cedula").value="";
                                    document.getElementById("fecha").value="";
                                    document.getElementById("nombres").value="";
                                    document.querySelector("#certi").checked = false;
                                    const $select = document.getElementById("hora");
                    
                                    for (let i = $select.options.length; i >= 0; i--) {
                                        $select.remove(i);
                                    }
                                    var valido=document.getElementById("vcedula");
                                    valido.className = "fa fa-times fa-2x";
                                    valido.style.visibility="hidden";   
                                    cedula="";
                                    fecha="";
                                    turno="";
                                    comprotido=false;
                                    swal(
                                        '¡Cita Agendada..!',
                                        'La cita médica fue agendada correctamente.',
                                        'success'
                                    );
                                }else{
                                    swal(
                                        '¡Turno agendado..!',
                                        'El turno ya se encuentra agendado.',
                                        'error'
                                      );
                                      document.getElementById("fecha").value="";
                                      const $select = document.getElementById("hora");
                                      for (let i = $select.options.length; i >= 0; i--) {
                                        $select.remove(i);
                                    }
                                }
                                
                            
                            },
                            error: function (data)
                            {
                                swal(
                                    '¡Error!',
                                    'Error de servidor, lo sentimos.',
                                    'error'
                                  )
                            }  
                        });
                      }
        
                }
            });
           

        }
       
    });


    
