<script>
	import { createEventDispatcher } from 'svelte';

	export let isEnabled;
</script>

<div on:click={() => isEnabled = true} id="hidden">
	<span id="expand" class="material-symbols-outlined">add</span>
	<slot />
</div>

<style>
	#hidden {
		background-color: var(--background-2);
		padding: 2em;
		margin: 2em;
		border-radius: 3em;
		cursor: pointer;
		display: flex;
		align-items: center;
	}
	#expand {
		color: white;
		font-size: 35px;
		user-select: none;
	}
</style>