<script>
  export let segment;
  export let open = false;
  import { fade } from "svelte/transition";
  let name = "< hilmimuharromi />";
  export let darkMode;
</script>

<style>
  nav {
    font-weight: 200;
    font-size: 14px;
    /* padding-top: 15px; */
    padding-right: 10px;
    background-color: #20222600;
    width: 100%;
    z-index: 20;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    text-align: center;
    content: "";
    height: 2px;
    background-color: rgb(238, 238, 238);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    display: block;
    font-size: 1.4em;
  }

  svg {
    min-height: 24px;
    transition: transform 0.3s ease-in-out;
  }

  svg line {
    stroke: currentColor;
    stroke-width: 3;
    transition: transform 0.3s ease-in-out;
  }

  .navbar-item {
    z-index: 20;
  }
  button:hover {
    color: gray;
  }

  .open svg {
    transform: scale(0.7);
  }

  .open #top {
    transform: translate(6px, 0px) rotate(45deg);
  }

  .open #middle {
    opacity: 0;
  }

  .open #bottom {
    transform: translate(-12px, 9px) rotate(-45deg);
  }

  aside {
    right: 10%;
    position: fixed;
    top: 5;
    display: flex;
    flex-direction: column;
    z-index: 15;
    width: 15%;
    padding-top: 1%;
    padding-bottom: 1%;
  }
  aside a {
    margin: 5px;
    text-align: center;
  }

  .open {
    right: 0%;
  }

  .navbar-brand {
    padding-left: 10%;
  }

  .navbar-end {
    padding-right: 10%;
  }

  @media (max-width: 780px) {
    .navbar {
      display: flex;
      justify-content: space-between;
    }

    aside {
      right: 0;
      top: 5;
      position: fixed;
      display: flex;
      flex-direction: column;
      z-index: 15;
      width: 50%;
    }
    svg {
    }
  }
</style>

<nav class="navbar">
  <div class="navbar-brand">
    <a class="navbar-item" href=".">
      <!-- <img
        src="https://bulma.io/images/bulma-logo.png"
        alt="Bulma: a modern CSS framework based on Flexbox" /> -->
      <span>{name}</span>

    </a>
  </div>
  <div class="navbar-end">
    <div class="navbar-item">
      <a
        class="button is-outlined"
        class:is-dark={darkMode === false}
        class:is-light={darkMode === true}
        class:open
        on:click={() => (open = !open)}>
        <svg width="32" height="24">
          <line id="top" x1="0" y1="2" x2="32" y2="2" />
          <line id="middle" x1="0" y1="12" x2="24" y2="12" />
          <line id="bottom" x1="0" y1="22" x2="32" y2="22" />
        </svg>
      </a>
    </div>
  </div>
</nav>

{#if open === true}
  <aside transition:fade>
    <a aria-current={segment === undefined ? 'page' : undefined} href=".">
      home
    </a>
    <a
      rel="prefetch"
      aria-current={segment === 'blog' ? 'page' : undefined}
      href="blog">
      blog
    </a>
    <a aria-current={segment === 'project' ? 'page' : undefined} href="project">
      Project
    </a>
    <a aria-current={segment === 'about' ? 'page' : undefined} href="about">
      about
    </a>
  </aside>
{/if}
