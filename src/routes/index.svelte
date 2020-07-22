<script context="module">
  export async function preload({ params, query }) {
    const resPost = await this.fetch(`blog.json?limit=2`);
    const resProjects = await this.fetch(`project.json?limit=3`);
    const posts = await resPost.json();
    const projects = await resProjects.json();
    return { posts, projects };
  }
</script>

<script>
  import { isLogin } from "../stores.js";
  import CardPost from "../components/CardPost.svelte";
  import PortoCard from "../components/ProjectList.svelte";
  export let posts;
  let newPosts = posts.reverse();
  export let projects;
</script>

<style>
  h1 {
    text-align: left;
    font-size: 2.8em;
    font-weight: 700;
    font-family: "MuseoModerno", cursive;
  }

  h2 {
    font-size: 1.1em;
    font-weight: 700;
    margin: 0.5em 0 0.5em 0;
  }

  blockquote {
    /* font-size: 1.1em;
    font-weight: 700;
    margin: 0.5em 0 0.5em 0; */
    /* font-family: "Dancing Script", cursive;
    font-family: "MuseoModerno", cursive; */
  }
  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }

  @media (max-width: 780px) {
    .home-layout {
      display: flex;
      flex-direction: column;
      height: 100%;
      align-content: center;
      align-items: center;
    }
    .layout-card-project {
      display: flex;
      text-align: center;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      align-items: center;
    }
    .column {
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      justify-content: center;
    }

    .layout-card-post {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      width: 70%;
      /* background-color: aqua; */
    }
  }

  .home-layout {
    display: flex;
    flex-direction: column;
    min-height: 90vh;
  }

  .lc-layout {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .left-content {
    border: 5px solid;
    border-radius: 20px;
    height: 400px;
    width: 343px;
    padding: 50px 20px 50px 20px;
  }

  .left-content h1 {
    font-size: 96px;
  }
  .left-content h2 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 29px;
  }
  .left-content blockquote {
    /* color: #fff; */
    text-align: center;
    border-left: 2px solid;
  }
  hr {
    width: 70%;
    text-align: left;
    margin: 0;
    margin-bottom: 5px;
  }

  .layout-card-post {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    width: 70%;
  }

  .layout-card-project {
    display: flex;
    text-align: center;
    justify-content: center;
    align-content: center;
    align-items: center;
  }

  .bottom-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .bottom-layout hr {
    width: 70%;
    text-align: center;
    margin: 0;
    margin-top: 10px;
    margin-bottom: 5px;
  }
</style>

<svelte:head>
  <title>Hilmi Muharromi</title>
</svelte:head>

<div class="container home-layout">
  <div class="columns">
    <div class="column lc-layout">
      <div class="left-content">
        <h1>Hi.</h1>
        <!-- <h2>I'am Hilmi Muharromi</h2> -->
        <hr />
        <h2>Wellcome to my homework.</h2>
        <blockquote>
          “what do you see here,
          <br />
          what can I give”
        </blockquote>
      </div>
    </div>
    <div class="column">
      <div class="right-content">
        <h2>Last Post</h2>
        <hr />
        <div class="layout-card-post">
          {#each newPosts as post}
            <CardPost {post} />
          {/each}
        </div>
      </div>
    </div>
  </div>
  <div class="bottom-layout">
    <h2>Selected Projects</h2>
    <hr />
    <div class="layout-card-project">
      {#each projects as project}
        <PortoCard {project} />
      {/each}
    </div>
  </div>
</div>
