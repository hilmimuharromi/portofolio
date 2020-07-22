<script>
  import Nav from "../components/Nav.svelte";
  import NavLogin from "../components/NavLogin.svelte";
  import Headroom from "../components/Headroom.svelte";
  import Footer from "../components/Footer.svelte";
  import { afterUpdate, onMount } from "svelte";
  import { fade } from "svelte/transition";
  const onPin = () => console.log("pin");
  export let segment;
  let darkMode = false;
  let darkModeNow;
  let toggleModeClass;
  let cssUrl;

  onMount(() => {
    console.log("the component on mount");
    darkModeNow = localStorage.getItem("darkMode");
    console.log(darkModeNow, "now dark");
    if (darkModeNow === null) {
      localStorage.setItem("darkMode", false);
      cssUrl = "/stylesLight.css";
      toggleModeClass = "float-dark";
    } else if (darkModeNow === "false") {
      console.log("masuk");
      darkMode = false;
      toggleModeClass = "float-dark";
      cssUrl = "/stylesLight.css";
    } else if (darkModeNow === "true") {
      darkMode = true;
      toggleModeClass = "float-light";
      cssUrl = "/styles.css";
    }
  });

  afterUpdate(() => {
    localStorage.setItem("darkMode", darkMode);
  });

  function toggleMode() {
    console.log("masuk toggle 1", darkMode);

    darkMode = !darkMode;
    if (darkMode) {
      toggleModeClass = "float-light";
      cssUrl = "/styles.css";
    } else {
      toggleModeClass = "float-dark";
      cssUrl = "/stylesLight.css";
    }
    console.log("masuk toggle 2", darkMode);
  }
</script>

<style>
  .float-dark {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 40px;
    right: 40px;
    padding-top: 15px;
    background-color: rgb(38, 39, 39);
    color: #fff;
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px #999;
  }

  .float-light {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 40px;
    right: 40px;
    padding-top: 15px;
    background-color: rgb(214, 219, 218);
    color: rgb(38, 39, 39);
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px #999;
  }
  a {
    margin-right: 10%;
  }
</style>

<svelte:head>
  <link rel="stylesheet" href={cssUrl} />
</svelte:head>

{#if segment !== 'me'}
  <Headroom on:pin={onPin} duration="350ms" offset={30} tolerance={5}>
    <Nav {segment} {darkMode} />
  </Headroom>
{/if}
{#if segment === 'me'}
  <NavLogin {segment} />
{/if}

<main>
  <slot isLogin={true} />
  <a transition:fade on:click={toggleMode} class={toggleModeClass}>
    <a class="fas fa-adjust fa-2x" />
  </a>
</main>

<Footer />
