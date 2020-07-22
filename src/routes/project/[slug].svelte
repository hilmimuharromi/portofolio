<script context="module">
  export async function preload(page, session) {
    const { slug } = page.params;

    const res = await this.fetch(`project/${slug}.json`);
    const project = await res.json();

    return { project, slug };
  }
</script>

<script>
  export let project;
  export let slug;
  import ProjectDetail from "../../components/ProjectDetail.svelte";
</script>

<ProjectDetail {project} />
