<<<<<<< HEAD
<script>
	import Loader from './Components/Loader.svelte'
	import Footer from './Components/Footer.svelte'
	import { fly } from 'svelte/transition'

	let searchTerm = ''
	let wasSearched = false
	let searchedTerm = ''
	let strictSearch = false
	let loading = false
	let jokes = []
	const jokeError = [{joke: "No matching jokes found.", error: true}]

	$: invalidSearch = searchTerm.length < 2

	const searchJokes = (term) => {
=======
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
>>>>>>> Added TypeScript and componentized
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
<<<<<<< HEAD
		})
	}

	const randomJoke = () => {
		wasSearched = false
		loading = true
		jokes = []
		const res = fetch('/.netlify/functions/random-joke')
=======
			})
	}
	
	const getRandomJoke = (): void => {
		wasSearched = false
		loading = true
		jokes = []
		fetch('/.netlify/functions/random-joke')
>>>>>>> Added TypeScript and componentized
			.then(res => res.json())
			.then(json => {
				if(json.data) {
					jokes = [json.data]
				} else {
					jokes = jokeError
				}
				loading = false
			})
<<<<<<< HEAD
		}

		const highlight = (joke, searchTerm) => {
			const terms = [...searchTerm.trim().split(/\s/)]
			terms.forEach(term => {
				const matches = new RegExp(term, 'i')
				joke = joke.split(matches).join(`<b class="highlight">${term}</b>`)
			})
			return joke
		}
=======
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
>>>>>>> Added TypeScript and componentized
</script>

<main>
	<div class="container">
<<<<<<< HEAD
		<h1>
			<img src="svelte-logo-mark.svg" alt="">
			Dad Joke API
		</h1>


		<button type="button" on:click|preventDefault={randomJoke}>
			<span aria-hidden="true">❓</span>
			Get a random joke
		</button>

		<!-- <p class="or">Search for jokes</p> -->
		<p class="or">or</p>

		<form on:submit|preventDefault={searchJokes(searchTerm)}>
=======
		<Heading />
		
		<RandomJokeButton {getRandomJoke}/>
		
		<p class="or">or</p>
		
		<form on:submit|preventDefault={() => searchJokes(searchTerm)}>
>>>>>>> Added TypeScript and componentized
			<div class="flex">
				<input bind:value={searchTerm} type="text" id="search-term">
				<button disabled={invalidSearch}>
					<span aria-hidden="true">🔍</span>
					Search Jokes
				</button>
			</div>
<<<<<<< HEAD

=======
			
>>>>>>> Added TypeScript and componentized
			<div class="flex">
				<input type="checkbox" id="whole-word" bind:checked={strictSearch}>
				<label for="whole-word">Strict search<i>&nbsp;(match whole words and order)</i></label>
			</div>
<<<<<<< HEAD

		</form>



		{#if loading}
			<Loader />
		{/if}

		<ul>
			{#each jokes as joke, index}
				<li in:fly="{{ y: 20, duration: 400, delay: index * 120}}" class:error={joke.error}>
					{#if wasSearched}
						{@html highlight(joke.joke, searchedTerm)}
					{:else}
						{joke.joke}
					{/if}
				</li>
=======
		</form>
		
		{#if loading}
			<Loader />
		{/if}
		
		<ul>
			{#each jokes as joke, index}
				<Joke {joke} {index} {searchedTerm} {wasSearched} {highlight}/>
>>>>>>> Added TypeScript and componentized
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
<<<<<<< HEAD

=======
	
>>>>>>> Added TypeScript and componentized
	.flex input[type="text"] {
		margin: 0 .5em 0 0;
		flex: 1 1 auto;
	}
<<<<<<< HEAD

	.flex button, .flex input[type="submit"] {
		flex: 0 1 auto;
	}

	.flex input[type="checkbox"] {
		margin: 0 .5rem 0 0;
	}

	.error {
		color: var(--orange);
		font-weight: bold;
	}

=======
	
	.flex button {
		flex: 0 1 auto;
	}
	
	.flex input[type="checkbox"] {
		margin: 0 .5rem 0 0;
	}
	
>>>>>>> Added TypeScript and componentized
	.or {
		font-size: 1.5rem;
		font-weight: bold;
		margin: 2rem auto;
	}
<<<<<<< HEAD

=======
	
>>>>>>> Added TypeScript and componentized
	.or:before, .or:after {
		content: '—';
		margin: 0 .25em;
		color: var(--darkergray);
	}
<<<<<<< HEAD

	h1 {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 4rem;
	}

	h1 img {
		max-width: 1em;
		margin-right: .25em;
	}

=======
	
>>>>>>> Added TypeScript and componentized
	input[type="checkbox"] {
		position: absolute;
		left: -100vw;
		width: 1px;
		height: 1px;
		opacity: 0;
	}
<<<<<<< HEAD

=======
	
>>>>>>> Added TypeScript and componentized
	input[type="checkbox"] + label {
		font-size: .9rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		color: var(--lightgray);
	}
<<<<<<< HEAD

	input[type="checkbox"]:checked + label {
		color: var(--darkestgray);
	}

=======
	
	input[type="checkbox"]:checked + label {
		color: var(--darkestgray);
	}
	
>>>>>>> Added TypeScript and componentized
	input[type="checkbox"] + label:before {
		content: '⬜';
		font-size: 1.4rem;
		margin-right: .25rem;
	}
<<<<<<< HEAD

	input[type="checkbox"]:checked + label:before {
		content: '✅'
	}

	button {
		margin: 0;
	}

=======
	
	input[type="checkbox"]:checked + label:before {
		content: '✅'
	}
	
	button {
		margin: 0;
	}
	
>>>>>>> Added TypeScript and componentized
	ul {
		text-align: left;
		list-style-type: none;
		margin: 3rem auto;
		padding: 0;
	}
<<<<<<< HEAD

	li {
		margin-bottom: 1em;
		padding-bottom: 1em;
		border-bottom: 1px solid #ccc;
	}
=======
>>>>>>> Added TypeScript and componentized
</style>
