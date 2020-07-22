<script>
  export let post;
  let contents = post.content;
</script>

<style>
  .box {
    width: 80%;
  }
</style>

<div class="box">
  <h1>{post.title}</h1>
  <!-- <img src={post.imageUrl} alt="" /> -->
  <div class="content">
    {#each contents as content}
      {#if content.type === 'embed'}
        <iframe
          title="Youtube"
          width={content.data.width}
          height={content.data.height}
          src={content.data.embed} />
        <p>{content.data.caption}</p>
      {:else if content.type === 'paragraph'}
        <p>
          {@html content.data.text}
        </p>
      {:else if content.type === 'header'}
        {#if content.data.level === 1}
          <h1>{content.data.text}</h1>
        {:else if content.data.level === 2}
          <h2>{content.data.text}</h2>
        {:else if content.data.level === 3}
          <h3>{content.data.text}</h3>
        {/if}
      {:else if content.type === 'code'}
        <pre>{content.data.code}</pre>
      {:else if content.type === 'quote'}
        <blockquote cite="http://www.worldwildlife.org/who/index.html">
          {content.data.text}
          <p>{content.data.caption}</p>
        </blockquote>
      {:else if content.type === 'image'}
        <img src={content.data.file.url} alt="HALO DUNIA" />
      {/if}
      <!-- {JSON.stringify(content.type)}
{JSON.stringify(content.data)} -->
    {/each}
  </div>
</div>
