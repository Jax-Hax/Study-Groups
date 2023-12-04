<script lang="ts">
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import './form.css'
	export let data

	let { supabase, session } = data
	$: ({ supabase, session } = data)

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	})
</script>
<html lang="en">
	<style>
		:root {
			--pop: #005b96;
			--grayed-pop: #28597a;
			--dark-pop: #011f4b;
            --highlight-pop: #0063a3;
			--green: #26b54c;
			--dark-green: #1d8c3b;
			--red: #ea5252;
			--dark-red: #c44343;
            --background-1-darkest: #121212;
            --background-2: #1e1e1e;
            --background-3: #232323;
            --background-4: #252525;
            --background-5: #272727;
            --background-6: #2c2c2c;
            --background-7: #2e2e2e;
            --background-8: #333333;
            --background-9: #363636;
            --background-10-lightest: #383838;
            --text-color: black;
			--text-blur: rgba(0,0,0,0.5);
		}
        @media (prefers-color-scheme: dark) {
            :root {
                /* Dark mode variables go here */
                --background-1-darkest: #121212;
                --background-2: #1e1e1e;
                --background-3: #232323;
                --background-4: #252525;
                --background-5: #272727;
                --background-6: #2c2c2c;
                --background-7: #2e2e2e;
                --background-8: #333333;
                --background-9: #363636;
                --background-10-lightest: #383838;
                --text-color: white;
				--text-blur: rgba(255, 255, 255, 0.5);
            }
        }
		* {
			margin: 0;
			padding: 0;
			font-family: 'Source Sans 3', sans-serif;
			color: black;
		}
		h1,
		h2 {
			font-family: 'Oswald', sans-serif;
		}
		h1 {
			font-size: 3.5rem;
			letter-spacing: -3px;
		}
		.bouncyButton {
			background-color: var(--pop);
			border: none;
			color: white;
			padding: 1em 2em;
			border-radius: 19px;
			text-align: center;
			text-decoration: none;
			cursor: pointer;
			display: inline-block;
			font-size: 1rem;
		}
		.bouncyButton:hover {
			background-color: white;
			box-shadow: 0 3px;
			color: var(--pop);
			transform: translateY(-0.25em);
			transition: transform 0.25s;
			border-width: 1px;
			border-style: solid;
			margin: -1px;
		}
	</style>
	<slot />
</html>
