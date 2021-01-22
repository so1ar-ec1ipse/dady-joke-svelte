<script lang="ts">
	import Loader from './Components/Loader.svelte'
	import Footer from './Components/Footer.svelte'
	import Heading from './Components/Heading.svelte'
	import RandomJokeButton from './Components/RandomJokeButton.svelte'
	import Joke from './Components/Joke.svelte'
	import type { JokeType } from './Interfaces/Joke'
	
	let searchTerm: string = ''
	let wasSearched: boolean  = false
	let searchedTerm: string = ''
	let strictSearch: boolean = false
	let loading: boolean = false
	let jokes: JokeType[] = []
	const jokeError: JokeType[] = [{ joke: "No matching jokes found.", error: true }]
	
	$: invalidSearch = searchTerm.length < 2
	
	const searchJokes = (term: string): void => {
		loading = true
		wasSearched = true
		searchedTerm = term
		jokes = []
		fetch(`/.netlify/functions/search-jokes?term=${term}`)
			.then(res => res.json())
			.then(json => {
				if (json.data.results.length) {
					jokes = [...json.data.results]
					if (strictSearch) {
						const matchesWholeWord = new RegExp(` ${term} `, "i")
						jokes = [...jokes.filter(joke => matchesWholeWord.test(joke.joke))]
						if (!jokes.length) jokes = jokeError
					}
				} else {
					jokes = jokeError
				}
				loading = false
			})
	}
	
	const getRandomJoke = (): void => {
		wasSearched = false
		loading = true
		jokes = []
		fetch('/.netlify/functions/random-joke')
			.then(res => res.json())
			.then(json => {
				if(json.data) {
					jokes = [json.data]
				} else {
					jokes = jokeError
				}
				loading = false
			})
	}
	
	const highlight = (joke: string, searchTerm: string): string => {
		const terms = [...searchTerm.trim().split(/\s/)]

		terms.forEach(term => {
			const matches = new RegExp(term, 'i')
			//TODO: this can sometimes cause unexpected HTML
			joke = joke.split(matches).join(`<b class="highlight">${term}</b>`)
		})
		return joke
	}
</script>

<main>
	<div class="container">
		<Heading />
		
		<RandomJokeButton {getRandomJoke}/>
		
		<p class="or">or</p>
		
		<form on:submit|preventDefault={() => searchJokes(searchTerm)}>
			<div class="flex">
				<input bind:value={searchTerm} type="text" id="search-term">
				<button disabled={invalidSearch}>
					<span aria-hidden="true">🔍</span>
					Search Jokes
				</button>
			</div>
			
			<div class="flex">
				<input type="checkbox" id="whole-word" bind:checked={strictSearch}>
				<label for="whole-word">Strict search<i>&nbsp;(match whole words and order)</i></label>
			</div>
		</form>
		
		{#if loading}
			<Loader />
		{/if}
		
		<ul>
			{#each jokes as joke, index}
				<Joke {joke} {index} {searchedTerm} {wasSearched} {highlight}/>
			{/each}
		</ul>
	</div>
</main>

<Footer />



<style>
	main {
		text-align: center;
		padding: 2rem 1rem;
		margin: 0 auto;
	}
	
	.flex input[type="text"] {
		margin: 0 .5em 0 0;
		flex: 1 1 auto;
	}
	
	.flex button {
		flex: 0 1 auto;
	}
	
	.flex input[type="checkbox"] {
		margin: 0 .5rem 0 0;
	}
	
	.or {
		font-size: 1.5rem;
		font-weight: bold;
		margin: 2rem auto;
	}
	
	.or:before, .or:after {
		content: '—';
		margin: 0 .25em;
		color: var(--darkergray);
	}
	
	input[type="checkbox"] {
		position: absolute;
		left: -100vw;
		width: 1px;
		height: 1px;
		opacity: 0;
	}
	
	input[type="checkbox"] + label {
		font-size: .9rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		color: var(--lightgray);
	}
	
	input[type="checkbox"]:checked + label {
		color: var(--darkestgray);
	}
	
	input[type="checkbox"] + label:before {
		content: '⬜';
		font-size: 1.4rem;
		margin-right: .25rem;
	}
	
	input[type="checkbox"]:checked + label:before {
		content: '✅'
	}
	
	button {
		margin: 0;
	}
	
	ul {
		text-align: left;
		list-style-type: none;
		margin: 3rem auto;
		padding: 0;
	}
</style>
