<script>
  import { onMount, afterUpdate } from "svelte";
  let editor;
  let title = "judul";
  let imageUrl;
  let tagsTemp = [];
  let tags = [];
  let tagInput;
  let slug;
  let contents = [];
  let contentData = [];
  let dataSaved = [
    {
      type: "image",
      data: {
        file: {
          url: "https://i.ibb.co/VtcSZzQ/undraw-react-y7wq.png"
        },
        caption: "",
        withBorder: false,
        stretched: false,
        withBackground: false
      }
    },
    {
      type: "header",
      data: {
        text: "Halo rest polka",
        level: {
          $numberInt: "2"
        }
      }
    }
  ];
  onMount(async () => {
    editor = new EditorJS({
      holderId: "editorjs",
      tools: {
        header: {
          class: Header,
          inlineToolbar: ["link"],
          config: {
            placeholder: "Header",
            levels: [1, 2, 3],
            defaultLevel: 2
          },
          shortcut: "CMD+SHIFT+H"
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile(file) {
                let formData = new FormData();
                formData.append("image", file);
                const reader = new FileReader();
                reader.onload = function(e) {
                  console.log(e.target.value, "form====");
                };

                return fetch(
                  "https://api.imgbb.com/1/upload?key=767c1b05763de4a87cc7fd24cab766bb",
                  {
                    method: "post",
                    body: formData
                  }
                )
                  .then(response => response.json())
                  .then(result => {
                    console.log(result, "hasil");

                    return {
                      success: 1,
                      file: {
                        url: result.data.url
                      }
                    };
                  })
                  .catch(error => {
                    return "Upload failed";
                    console.error("Error:", error);
                  });
              },
              uploadByUrl(url) {
                console.log(url);
                return fetch("blog.json", {
                  method: "post",
                  body: url
                }).then(result => {
                  return {
                    success: 1,
                    file: {
                      url: url
                    }
                  };
                });
              }
            }
          }
        },
        list: {
          class: List,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+L"
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author"
          },
          shortcut: "CMD+SHIFT+O"
        },
        warning: Warning,
        marker: {
          class: Marker,
          shortcut: "CMD+SHIFT+M"
        },
        code: {
          class: CodeTool,
          shortcut: "CMD+SHIFT+C"
        },
        delimiter: Delimiter,
        inlineCode: {
          class: InlineCode,
          shortcut: "CMD+SHIFT+C"
        },
        linkTool: LinkTool,
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              coub: true
            }
          }
        },
        table: {
          class: Table,
          inlineToolbar: true,
          shortcut: "CMD+ALT+T"
        }
      },
      data: {
        time: 1552744582955,
        blocks: dataSaved
      }
    });
  });

  afterUpdate(() => {
    tags = tagsTemp;
  });

  function savingData() {
    console.log("masuk");
    editor.save().then(outputData => {
      console.log(outputData, "artikel");
      // localStorage.setItem('content', outputData.blocks)
      contents = outputData;
      contentData = outputData.blocks;
    });
  }

  async function SubmitPost() {
    let payload = {
      imageUrl: imageUrl,
      tags: tags,
      title: title,
      slug: slug,
      content: contents
    };
    console.log(payload, "payload");

    const res = await fetch("blog.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ payload })
    });
    const json = await res.json();
    let result = JSON.stringify(json);
    console.log(result, "resul;t");
  }

  function genSlug() {
    let str = title;
    console.log(str, "asuuup");

    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes
    slug = str;
    console.log(slug, "dapet slug");
    // return slug = str;
  }

  function tagPush(event) {
    event.preventDefault();
    tagsTemp.push(tagInput);
    tagInput = "";
    console.log(tags);
  }

  function deleteTag(tag) {
    tagsTemp = tags.filter(newTag => newTag !== tag);
    tags = tagsTemp;
    console.log(tagsTemp);
  }
</script>

<style>
  h1,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  /* figure {
		margin: 0 0 1em 0;
	} */

  img {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
    text-align: justify;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }

  #editorjs {
    background-color: rgb(216, 216, 216);
    overflow: scroll;
    height: 40vh;
    padding: 0;
  }

  pre {
    background-color: black;
    color: white;
    box-shadow: 10px 10px;
  }
  ::placeholder {
    color: rgb(0, 0, 0);
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: red;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: red;
  }
  input {
    width: 100%;
    border: none;
    font-size: 1em;
  }

  .tag {
    margin: 5px;
  }
</style>

<svelte:head>
  <title>medium</title>
</svelte:head>

<h1>MEDIUM ya</h1>
<label for="">Judul</label>
<input bind:value={title} />
<button on:click={genSlug}>Generate Slug</button>
<label for="">Slug</label>
<input bind:value={slug} />
<label for="">imageUrl</label>
<input bind:value={imageUrl} />
<div>
  <h1>Tags</h1>
  {#each tags as tag}
    <span class="tag">
      {tag}
      <button on:click={() => deleteTag(tag)} class="delete is-small" />
    </span>
  {/each}
</div>
<form on:submit={event => tagPush(event)}>
  <input bind:value={tagInput} />
</form>

<div id="editorjs" />

<button on:click={savingData}>save post</button>
<button on:click={SubmitPost}>Submit Post</button>
<div class="content">
  {#each contentData as content}
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
      <img src={content.data.file.url} alt={content.data.caption} />
      <p>{content.data.caption}</p>
    {/if}
    <!-- {JSON.stringify(content.type)}
{JSON.stringify(content.data)} -->
  {/each}
</div>
