<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  export let posts;
  let newPosts;
  newPosts = posts.sort();
  console.log(newPosts);

  import CardPost from "../../components/CardPost.svelte";
</script>

<style>
  h1 {
    text-align: left;
    font-size: 2.8em;
    font-weight: 700;
  }

  h2 {
    font-size: 1.1em;
    font-weight: 700;
    margin: 0.5em 0 0.5em 0;
  }
</style>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<div class="container">
  <h1>Blog</h1>
  {#each newPosts as post}
    <CardPost {post} />
  {/each}
</div>
