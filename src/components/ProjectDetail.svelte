<script>
  export let project;
  import Slides from "./Slides.svelte";
  import { goto } from "@sapper/app";
  async function goToPorto(params) {
    await goto(`/project`);
  }
</script>

<style>
  .slide-content {
    width: 30%;
  }
  h1 {
    /* size: 24px; */
    font-family: "MuseoModerno", cursive;
  }
</style>

<div class="container">

  <div class="box">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="content">
            <h1 class="title is-light">{project.title}</h1>
            <p>{project.description}</p>
            <div class="tags">
              Skills:
              {#each project.tags as tag}
                <div class="tag">-{tag}</div>
              {/each}
            </div>
          </div>
        </div>
        <div class="column">
          <Slides slides={project.images} />
        </div>
      </div>
      <button on:click={goToPorto}>More Projects</button>
    </div>
  </div>
</div>
