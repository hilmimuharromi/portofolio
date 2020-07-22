<script context="module">
  export async function preload({ params, query }) {
    const resProjects = await this.fetch(`project.json?limit=3`);
    const projects = await resProjects.json();
    return { projects };
  }
</script>

<script>
  export let projects;
  import PortoCard from "../../components/ProjectList.svelte";
  console.log(projects, "halo projects");
</script>

<style>
  .layout-card-project {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 780px) {
    .layout-card-project {
      display: flex;
      flex-direction: column;
      /* width: 90%; */
      background-color: aqua;
    }
  }
</style>

<svelte:head>
  <title>Portfolio</title>
</svelte:head>

<div class="container">
  <h1>My Portofolio</h1>
  <div class="layout-card-project">
    {#each projects as project}
      <PortoCard {project} />
    {/each}
  </div>
</div>
