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
    const $select = document.getElementById("hora");
   
    for (let i = $select.options.length; i >= 0; i--) {
        $select.remove(i);
    }
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/api/validarturno/"+fecha,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var horas= data['result'];
            
            $.each(horas, function (i, item) {
                const option = document.createElement('option');
                                                      
                option.value = horas[i].id_turno;
                option.text = horas[i].hora;
                option.className="op-select";
            
                $select.appendChild(option);
            });
                

        }
    });

    
}
  
 //Validar Fecha
    window.onload=function validarf() {
        
        var fec='2021-02-01';
        var fecha = new Date();
        var anio = fecha.getFullYear();
        var dia = fecha.getDate();
        var _mes = fecha.getMonth();//viene con valores de 0 al 11
        _mes = _mes + 1;//ahora lo tienes de 1 al 12
        if (_mes < 10)//ahora le agregas un 0 para el formato date
        { var mes = "0" + _mes;}
        else
        { var mes = _mes.toString;}
        if(dia<10){
          var _dia= "0"+ dia;
        }
        document.getElementById("fecha").min = anio+'-'+mes+'-'+_dia; 
        
        fecha.min = new Date().toISOString().split("T")[0];
    }


   function compromete(){
        comprotido= !comprotido
   }
    $("#AgendarCita").click(function () {

        var nombres = document.getElementById("nombres").value;
        var cedula = document.getElementById("cedula").value;
        var especialidad = document.getElementById("especialidad").value;
        var fecha = document.getElementById("fecha").value;
        var turno = document.getElementById("hora").value;
        var estado= 1;
        

        if(nombres==""||nombres==null||cedula==""||cedula==null||especialidad==null||especialidad==""||fecha==null||fecha==""||turno==null||turno==""||estado==null||estado==""||comprotido==false){
            
        }else{
            
            $.ajax({
            
                url: "http://127.0.0.1:8000/api/Cita",
                type: "Post",
                data: JSON.stringify({
                    'nombres' : nombres,
                    'cedula' : cedula,
                    'especialidad' : especialidad,
                    'fecha' : fecha,
                    'id_turno' : turno,
                    'estado': estado
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    
                alert('Registro aregado exitosamente !!!');
                },
                error: function (data)
                {
                    
                alert(data.responseText);
                }  
            });

        }
       
    });
    

