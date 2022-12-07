<script>
  import { onMount } from "svelte";
  import { token, list, log} from './store.js';

  $list = [...$list]

  onMount(async () => {
    if (window.location.href.split('=').length <= 1) {
        const client_id = "2cct9b33ba202phg61fspdppho";
        const cognito_domain = "login-ze0zatn0ipkhxh56";
        const region = "us-east-1";
        const redirect = "https://dash.cabd.link";
        const aws_cognito_login_domain = "https://" + cognito_domain + ".auth." + region + ".amazoncognito.com";
        const cognitoUrl_fromUserPoolUI = aws_cognito_login_domain + "/login?client_id=" + client_id + "&response_type=token&scope=email+openid+phone&redirect_uri=" + redirect;
        window.location.href = cognitoUrl_fromUserPoolUI;
    } else {
        const tokenx = window.location.href.split('=')[1].split('&')[0];
        console.log("access_token:", tokenx);
        token.set(tokenx);
        await get_list();
    }
  });

  const get_list = async () => {
    const response = await fetch('https://api-dev.cabd.link/api2',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    $list = await response.json();
    console.log("list:",$list);
  };
  const send_list = async () => {
      console.log("token",$token)
      let data1 = '[{"text": "mushoku","price":"20.01","symbol":"R$","url":"localhost","type":"kindle"},{"text": "mushoku1","price":"20.01","symbol":"R$","url":"localhost","type":"kindle"}]';
      const response = await fetch('https://api-dev.cabd.link/api2',{
          method: 'POST',
          body: data1,
          headers: {
            'Authorization': $token,
            'Content-Type': 'application/json'
          }
      });
      $log = [...$log, await response.json()]
      console.log("log:",$log);
  };

</script>
<main>
  <h1>List</h1>
  <button on:click={send_list}>Click me</button>
  <ul>
    {#each $log as item}
      <li>
        {item.count} - {item.list}
      </li>
    {/each}
  </ul>
  <ul>
    {#each $list as item}
      <li>
        {item.text} - {item.price} - {item.symbol} - {item.url} - {item.type}
      </li>
    {/each}
  </ul>
</main>
<style>
</style>