<script>
  let username = "";
  let password = "";

  function loginPost(event) {
    let payload = {
      username,
      password
    };
    event.preventDefault();
    console.log(payload, "payload");

    fetch("login.json", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ payload })
    });
  }
</script>

<div class="container">
  <form on:submit={event => loginPost(event)}>
    <input bind:value={username} type="text" />
    <input bind:value={password} type="password" />
    <input type="submit" name="" id="" />
  </form>
</div>
