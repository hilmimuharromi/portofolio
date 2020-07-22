<script>
  export let segment;
  import { onMount, afterUpdate } from "svelte";
  import { goto } from "@sapper/app";
  async function goToPorto(params) {
    await goto(`/project/${project.slug}`);
  }

  onMount(async () => {
    let token = localStorage.getItem("token");

    if (token) {
      if (token !== "sayahilmi") {
        goto(`/login`);
      } else {
        console.log(token);
      }
    } else {
      await goto(`/login`);
    }
  });
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    /* background-color: white; */
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<main>
  <slot />
</main>
