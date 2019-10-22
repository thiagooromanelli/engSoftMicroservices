function efetuarLogin(){
$.ajax({

    url: 'http://0.0.0.0:5000/api/users/'+document.getElementById('usuario').value+'/'+document.getElementById('senha').value,

    
    type: 'GET',

    success: function (resp) {
        alert(resp);
        console.log(resp);
        window.location="/inicial";

    },
    error: function (e) {
        alert( 'Usuario ou senha inválidos.' );
        console.log(e.status);
    }
});
}
