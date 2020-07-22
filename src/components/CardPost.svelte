<script>
  export let post;
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  dayjs.extend(relativeTime);
  console.log(dayjs().from(dayjs("2020-01-16T01:39:02.000+00:00")), "day js");
  import { goto } from "@sapper/app";
  async function goToDetail(params) {
    await goto(`/blog/${post.slug}`);
  }

  // function goToDetail(slug) {
  //   console.log(slug);
  // }
</script>

<style>
  .card {
    margin-top: 10px;
    max-width: 209px;
    min-height: 128px;
    min-width: 360px;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    border-radius: 10px;
    margin-right: 10px;
    cursor: pointer;
  }

  .img-card {
    width: 128px;
    height: 128px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .title-content {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: flex-start;
    justify-content: center;
    margin-left: 5px;
    width: 100%;
  }

  .title-content h2 {
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 1rem;
    line-height: 1.5;
  }

  @media (max-width: 780px) {
    .card {
      max-width: 209px;
      max-width: 90%;
    }
  }
</style>

<div class="card" on:click={() => goToDetail(post.slug)}>
  <img class="img-card" src={post.imageUrl} alt="" width="128" height="128" />
  <div class="title-content">
    <h5>{post.title}</h5>
    <!-- <p>{post.metaDescription}</p> -->
    <div class="tags">
      {#each post.tags as tag}
        <span class="tag">{tag}</span>
      {/each}
    </div>
    <p>{dayjs().from(dayjs(post.date))}</p>
  </div>
</div>
