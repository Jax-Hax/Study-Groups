<script>
	import { enhance } from '$app/forms';

	export let dashboard;
	export let todo;
	export let new_stuff;
	export let data;
</script>

<div id="sidebar">
	<div
		class="icon" style="margin-top: 0.5em"
		on:click={() => {
			dashboard = true;
			todo = false;
			new_stuff = false;
		}}
	>
		<span class="material-symbols-outlined">home</span>
		<div class="sidebar-tooltip">Dashboard</div>
	</div>
	<div
		class="icon"
		on:click={() => {
			todo = true;
			dashboard = false;
			new_stuff = false;
		}}
	>
		{#if todo}
			<div class="enabled">test</div>
		{/if}
		<span class="material-symbols-outlined">lists</span>
		<div class="sidebar-tooltip">To-Do List</div>
	</div>
	<div
		class="icon"
		on:click={() => {
			todo = false;
			dashboard = false;
			new_stuff = true;
		}}
	>
		{#if new_stuff}
			<div class="enabled">test</div>
		{/if}
		<span>{data.new_assignments.length}</span>
		<div class="sidebar-tooltip">New</div>
	</div>
	<form method="POST" style="margin-top: auto;" use:enhance action="?/signout">
		<button class="icon" style="padding: 2.5em">
			<span class="material-symbols-outlined">logout</span>
			<div class="sidebar-tooltip">Sign out</div>
		</button>
	</form>
</div>

<style>
	#sidebar {
		position: fixed;
		top: 0px;
		left: 0px;
		height: 100vh;
		width: 5rem;
		display: flex;
		flex-direction: column;
		background-color: var(--background-2);
		color: white;
		box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); /*tailwinds shadow-lg*/
	}
	.icon {
		border: none;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 3rem;
		width: 3rem;
		margin: 0 auto;
		background-color: var(--background-5);
		border-radius: 50%;
		cursor: pointer;
		color: var(--text-color);
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
		margin-bottom: 1em;
		padding: 0.5em;
	}
	.icon:hover {
		border-radius: 1em;
		background-color: var(--pop);
	}
	.icon span {
		color: inherit;
		font-size: 30px;
	}
	.sidebar-tooltip {
		position: absolute;
		width: auto;
		padding: 0.5rem;
		margin: 0.5rem;
		min-width: max-content;
		left: 4.5rem;
		color: var(--text-color);
		background-color: var(--background-2);
		border-radius: 0.75em;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 100ms;
		transform-origin: left;
		scale: 0;
	}
	.enabled {
		position: absolute;
		width: auto;
		padding: 0.5rem;
		margin: 0.5rem;
		min-width: max-content;
		left: 9rem;
		color: var(--text-color);
		background-color: var(--background-2);
		border-radius: 0.75em;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 100ms;
		transform-origin: left;
		scale: 0;
	}
	.icon:hover div {
		scale: 1;
	}
</style>
