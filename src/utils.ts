import { token, list, log } from './store.ts';

const API_URL = "https://api-dev.cabd.link/api";
const get_list = async (): Promise<string> => {
    const response = await fetch(API_URL,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}
const login = ():void => {
    if (window.location.href.split('id_token=').length <= 1) {
        const client_id = "3fhjs4it7br6bmn96rk98jrs4h";
        const cognito_domain = "login-ze0zatn0ipkhxh56";
        const region = "us-east-1";
        const redirect = "https://dash.cabd.link";
        const aws_cognito_login_domain = "https://" + cognito_domain + ".auth." + region + ".amazoncognito.com";
        const cognitoUrl_fromUserPoolUI = aws_cognito_login_domain + "/login?client_id=" + client_id + "&response_type=token&scope=email+openid+phone&redirect_uri=" + redirect;
        window.location.href = cognitoUrl_fromUserPoolUI;
    }
}
const send_product = async (token:String, url:String , price_target: String):Promise<Response | void> => {
    let data1 = '[{"price_target":"'+price_target+'","url":"'+url+'"}]';
    return await fetch(API_URL,{
        method: 'POST',
        body: data1,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    }).catch((error) => {
        console.log('Error:', error);
    })
}
const check_token = ():void => {
    console.log("split:", window.location.href.split('id_token='));
    if (window.location.href.split('id_token=').length > 1) {
        let token = window.location.href.split('id_token=')[1].split('&')[0];
        console.log("access_token:", token);
        localStorage.setItem('token', token);
    }
}
const check_errors = (request:any):void => {
    if (request.message) {
        login();
    }
}
const subscribe = async (id:number, email:String, token:String):Promise<Response | void> => {
    console.log("id:",id, "email:", email);
    /*return await fetch(API_URL+'/sub',{
        method: 'POST',
        body: '[{"email":"'+email+'", "topic":"'+id+'"}]',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    }).catch((error) => {
        console.error('Error:', error);
    })*/
}
export {login, get_list, send_product, check_token, subscribe};
