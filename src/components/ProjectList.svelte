<script>
  export let project;
  import { goto } from "@sapper/app";
  async function goToPorto(params) {
    await goto(`/project/${project.slug}`);
  }
</script>

<style>
  .card {
    margin-top: 10px;
    width: 300px;
    min-height: 270px;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    border-radius: 10px;
    margin-right: 10px;
  }

  .img-card {
    width: 100%;
    height: 150px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .content-post {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    cursor: pointer;
  }

  .title-content {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    width: 80%;
  }

  .title-content h2 {
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 1rem;
    line-height: 1.5;
    margin-top: 5px;
    margin-bottom: 10px;
  }

  @media (max-width: 780px) {
    .content-post {
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      width: 100vw;
    }

    .card {
      width: 300px;
      /* max-width: 90%; */
    }

    .img-card {
      width: 100%;
      height: 100%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }
</style>

<div class="content-post" on:click={goToPorto}>
  <div class="card">
    <img class="img-card" src={project.imgUrl} alt="" />
    <div class="title-content">
      <h2>{project.title}</h2>
      <div class="tags">
        {#each project.tags as tag}
          <span class="tag">{tag}</span>
        {/each}
      </div>
    </div>
  </div>
</div>
