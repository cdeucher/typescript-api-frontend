<script>
  import { onMount } from "svelte";
  import { token, list, log } from './store.js';
  import { login, check_token, send_product, get_list } from './utils.js';
  import {get} from "svelte/store";

  let user = { loggedIn: false };

  $list = [...$list]

  const logout = () => {
    localStorage.removeItem('token');
    console.log("token",get(token));
    $token = null;
    window.location.href = window.location.origin;
  }

  onMount(async () => {
    check_token();
    if (localStorage.getItem('token')) {
      user.loggedIn = true;
      $token = localStorage.getItem('token');
      $list = await get_list();
    }
    console.log('user', user)
  });

  let url = '';
  let price_target= '';
  const check_errors = (request) => {
    if (request.message) {
      login();
    }
  }
  const send_new_product = async () => {
    let request = await send_product(get(token),url, price_target);
    console.log("request",request);
    check_errors(request);
    $log = [...$log, request];
    $list = await get_list();
  }
</script>
<main>
  <h1>List</h1>

  {#if user.loggedIn}
    URL:<input style="width: 400px" bind:value={url}>
    $<input style="width: 100px" bind:value={price_target}>
    <button on:click={send_new_product}>Adicionar</button>
    <button on:click={logout}>Logout</button>
  {:else}
    <div class="col s12 m6 offset-m3 center-align">
      <a class="oauth-container btn darken-4 white black-text" href="#" on:click="{login}" style="text-transform:none">
        <div class="left">
          <img width="20px" style="margin-top:7px; margin-right:8px" alt="Google sign-in"
               src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
        </div>
        Login with Google
      </a>
    </div>
  {/if}

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
        ({item.price_target})({item.price}): {item.title}
      </li>
    {/each}
  </ul>
</main>