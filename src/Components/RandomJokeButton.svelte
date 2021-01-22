<script lang="ts">
  export let getRandomJoke: Function

</script>

<button type="button" on:click|preventDefault={() => getRandomJoke()}>
  <span aria-hidden="true">❓</span>
  Get a random joke
</button>