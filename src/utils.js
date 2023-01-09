import { token, list, log } from './store.js';

const get_list = async () => {
    const response = await fetch('https://api-dev.cabd.link/api',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
};
const send_product = async (token, url , price_target) => {
    let data1 = '[{"price_target":"'+price_target+'","url":"'+url+'"}]';
    const response = await fetch('https://api-dev.cabd.link/api',{
        method: 'POST',
        body: data1,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
};
const check_token = () => {
    console.log("split:", window.location.href.split('id_token='));
    if (window.location.href.split('id_token=').length > 1) {
        let token = window.location.href.split('id_token=')[1].split('&')[0];
        console.log("access_token:", token);
        localStorage.setItem('token', token);
    }
}
const login = () => {
    if (window.location.href.split('id_token=').length <= 1) {
        const client_id = "3fhjs4it7br6bmn96rk98jrs4h";
        const cognito_domain = "login-ze0zatn0ipkhxh56";
        const region = "us-east-1";
        const redirect = "https://dash.cabd.link";
        const aws_cognito_login_domain = "https://" + cognito_domain + ".auth." + region + ".amazoncognito.com";
        const cognitoUrl_fromUserPoolUI = aws_cognito_login_domain + "/login?client_id=" + client_id + "&response_type=token&scope=email+openid+phone&redirect_uri=" + redirect;
        window.location.href = cognitoUrl_fromUserPoolUI;
    } else {
        check_token();
    }
}
export {login, check_token, send_product, get_list };