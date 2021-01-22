<script lang="ts">
import { fly } from 'svelte/transition'
import type { JokeType } from '../Interfaces/Joke'

export let joke: JokeType
export let index: number
export let searchedTerm: string
export let wasSearched: boolean
export let highlight: Function
</script>

<li in:fly="{{ y: 20, duration: 400, delay: index * 120}}" class:error={joke.error}>
  {#if wasSearched}
    {@html highlight(joke.joke, searchedTerm)}
  {:else}
    {joke.joke}
  {/if}
</li>


<style>
.error {
  color: var(--orange);
  font-weight: bold;
}

li {
  margin-bottom: 1em;
  padding-bottom: 1em;
  border-bottom: 1px solid #ccc;
}
</style>