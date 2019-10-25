

function efetuarLogin(){
    localStorage.usuarioLogado = document.getElementById('usuario').value;
   
    $.ajax({
        url: 'http://0.0.0.0:5000/api/users/'+document.getElementById('usuario').value+'/'+document.getElementById('senha').value,
        type: 'GET',
        success: function (resp) {    
           
            console.log(resp);
            console.log('resp.photo_link: '+resp.photo_link);
            alert(resp);
            window.location="/principal";
        },

        error: function (e) {
            alert( 'Usuario ou senha inválidos.' );
            console.log(e.status);
        }
    });
}


function buscarPontos(){
    //alert(localStorage.usuarioLogado);
    $.ajax({
    
        url: 'http://0.0.0.0:5000/api/users/'+localStorage.usuarioLogado,
            
        type: 'GET',
    
        success: function (resp) {
            delete resp.password
            console.log(resp);
            console.log('points: '+resp.points);    
            if(resp.points == '' || resp.points == undefined || resp.points == null){
                resp.points = 0;
            }    
            document.getElementById("pontos").innerHTML = resp.points;
            document.getElementById("usuarioNome").innerHTML = localStorage.usuarioLogado;
            
            document.getElementById("usuarioImagem").src=''+resp.photo_link;

    },
        error: function (e) {
            alert( 'Erro' );
            console.log(e.status);
        }
    });
    $.ajax({
    
        url: 'http://0.0.0.0:5000/api/products',
            
        type: 'GET',
    
        success: function (resp) {
            var html = '';
            for(var i = 0 ; i < resp.length ; i++){
                html += ''+
                '<div class="col-lg-8 col-xs-15">'+
        
                '<div class="row">'+
                  '<div class="col-lg-6 col-xs-15">'+
              
                    '<div class="small-box bg-green">'+
                      '<div class="inner">'+
                          '<p>'+resp[i].product_name+'</p>'+
                          '<img src="'+resp[i].product_photo_link+'" class="card-img-top" alt="almoco" width=”100” height= "100"/>'+
                        '<p onclick="inserirPontos('+-resp[i].points+')">Para o almoço é necessário '+resp[i].points+' Pontos</p>'+
                      '</div>'+
                   '</div>'+
                  '</div>';

                 
            }
            document.getElementById("listaProdutos").innerHTML = html;
            console.log(resp);
            
    
    },
        error: function (e) {
            alert( 'Erro' );
            console.log(e.status);
        }
    });
}




    


function inserirPontos(pontos){
//alert(localStorage.usuarioLogado);
console.log(localStorage.usuarioLogado);
//console.log(document.getElementById('pontosAdd').value);
$.ajax({

url: 'http://0.0.0.0:5000/api/users/'+localStorage.usuarioLogado+'/pontos',
data: JSON.stringify({										
"points_to_update": pontos              							
}),    
type: 'PUT',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
success: function (resp) {

console.log(resp);
buscarPontos();

},
error: function (e) {
alert( 'Erro' );
console.log(e.status);
}
});
}


function cadastrar(){
var usuario = document.getElementById("usuario").value;
var senha = document.getElementById("senha").value;
var senha2 = document.getElementById("senha2").value;
var linkImagem = document.getElementById('linkImagem').value;
console.log("Usuario: "+usuario);
console.log("senha: "+senha);
console.log("senha2: "+senha2);
console.log("linkImagem: "+linkImagem);

if(senha != senha2){
alert("As senhas devem ser iguais");
return;
}else{
//alert(localStorage.usuarioLogado);
$.ajax({            
url: 'http://0.0.0.0:5000/api/users',                    
        
data: JSON.stringify({										                    
        "login": ""+usuario,
        "password": ""+senha,
        "photo_link": linkImagem                 						
    }),
    type: 'POST', 
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
success: function (resp) {   
    console.log(resp);  
    alert("Usuario criado com sucesso");                                                    
    window.location="/";                  
},
error: function (e) {
    alert( 'Erro' );
}
});
}


}