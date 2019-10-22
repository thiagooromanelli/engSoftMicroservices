var proxy = 'https://cors-anywhere.herokuapp.com/';
var client_secret = '470FF50BEB7766F1AB002083BB24E8E60C66C8684C09659336C06591E6D116B9';
var client_id = '3MVG9_XwsqeYoueI4DwNKGVnLuZlJwG9WOcrRcPqLbIs9SaQO3MSO5EyPiDcNB1p9Lw3QvrUf4.JZGy4C_n24';
var username = 'murillocuervot@wingsit.com';
var password = '1.Yhibgoom';
var userToken = 'saItBZA913NUx3FNPqkhxsJf1';
var REDIRECT_URI = 'https://murillo-website/_callback/services/oauth2/success';				
var data = 'client_secret='+client_secret+'&grant_type=password&client_id='+client_id+'&redirect_uri='+REDIRECT_URI+'&username='+username+'&password='+password+userToken;
var token;

$.ajax({
    url: proxy+'https://login.salesforce.com/services/oauth2/token',
    data: data,
    type: 'POST',
    useDefaultXhrHeader: false,
    success: function (resp) {
        console.log('Token: ' + resp.access_token); 
        //alert('Token: ' + resp.access_token);				
        token = resp.access_token
        
        return;
    },
    error: function (e) {
        console.log('deu erro');
        
        console.log(e);
    }
});
function efetuarLogin(){
	//window.location="/Users/muril/Desktop/Tela%20de%20Login/Login_v8/inicial.html";

$.ajax({
    url: proxy + 'https://na114.salesforce.com/services/apexrest/SalesforceAPI/login',
    data: JSON.stringify({										
                            "username": document.getElementById('usuario').value,
                            "password": document.getElementById('senha').value							
                            }),
    
    type: 'POST',
    beforeSend: function (xhr) {                        
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);// + resp.access_token);
        xhr.setRequestHeader('Content-Type', 'application/json');
    },
    success: function (resp) {
        console.log(resp);
        alert(resp.Message);
		if(resp.Message.includes('invali')){
		}else{
			window.location="/Users/muril/Desktop/Tela%20de%20Login/Login_v8/inicial.html";
		}
    },
    error: function (e) {
        console.log(e);
    }
});
}
