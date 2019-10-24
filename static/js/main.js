

function efetuarLogin(){
    localStorage.usuarioLogado = document.getElementById('usuario').value;
    $.ajax({
        url: 'http://0.0.0.0:5000/api/users/'+document.getElementById('usuario').value+'/'+document.getElementById('senha').value,
        type: 'GET',
        success: function (resp) {    
            alert(resp);
            console.log(resp);
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
        },
        error: function (e) {
            alert( 'Erro' );
            console.log(e.status);
        }
    });
    }

    function inserirPontos(){
        //alert(localStorage.usuarioLogado);
        console.log(localStorage.usuarioLogado);
        console.log(document.getElementById('pontosAdd').value);
        $.ajax({
            
            url: 'http://0.0.0.0:5000/api/users/'+localStorage.usuarioLogado+'/pontos',
            data: JSON.stringify({										
                "points_to_update": document.getElementById('pontosAdd').value               							
                }),    
            type: 'PUT',
            
            success: function (resp) {

                console.log(resp);

                
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
            console.log("Usuario: "+usuario);
            console.log("senha: "+senha);
            console.log("senha2: "+senha2);

            if(senha != senha2){
                alert("As senhas devem ser iguais");
                return;
            }else{
                //alert(localStorage.usuarioLogado);
                $.ajax({            
                url: 'http://0.0.0.0:5000/api/users',                    
                       
                data: JSON.stringify({										                    
                        "login": ""+usuario,
                        "password": ""+senha                      						
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