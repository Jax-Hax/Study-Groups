<script>
	import { enhance } from '$app/forms';

	export let dashboard;
	export let todo;
	export let new_stuff;
	export let data;
	export let form;
	export let clubs;
</script>

<div id="sidebar">
	<div
		class="icon"
		style="margin-top: 0.5em"
		class:enabled={dashboard}
		on:click={() => {
			dashboard = true;
			todo = false;
			new_stuff = false;
			clubs = false;
		}}
	>
		<span class="material-symbols-outlined">home</span>
		<div class="sidebar-tooltip">Dashboard</div>
	</div>
	<div
		class="icon"
		class:enabled={todo}
		on:click={() => {
			todo = true;
			dashboard = false;
			new_stuff = false;
			clubs = false;
		}}
	>
		<span class="material-symbols-outlined">lists</span>
		<div class="sidebar-tooltip">To-Do List</div>
	</div>
	<!--<div
		class="icon"
		style="margin-top: 0.5em"
		class:enabled={clubs}
		on:click={() => {
			dashboard = false;
			todo = false;
			new_stuff = false;
			clubs = true;
		}}
	>
		<span class="material-symbols-outlined">sports_tennis</span>
		<div class="sidebar-tooltip">Clubs</div>
	</div>-->
	{#if data.new_assignments.length + data.grades.reduce((count, obj) => count + obj.new_assignments.length, 0) > 0}
		<div
			class="icon"
			class:enabled={new_stuff}
			on:click={() => {
				todo = false;
				dashboard = false;
				new_stuff = true;
				clubs = false;
			}}
		>
			<span class="material-symbols-outlined" style="margin-left: 0.8em"> inbox </span>
			<span
				style="font-size: 0.75rem; margin-top: auto; background-color: var(--red); border-radius: 50%; padding: 0.3em 0.7em;"
				>{data.new_assignments.length +
					data.grades.reduce((count, obj) => count + obj.new_assignments.length, 0)}</span
			>
			<div class="sidebar-tooltip">New</div>
		</div>{/if}
	<form method="POST" style="margin-top: auto;" use:enhance action="?/switchToAdmin">
		<button class="icon" style="padding: 2.5em">
			<span class="material-symbols-outlined">admin_panel_settings</span>
			<div class="sidebar-tooltip">Switch to Admin Dashboard</div>
		</button>
	</form>
	<form method="POST" use:enhance action="?/signout">
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
		user-select: none;
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
		background-color: var(--grayed-pop);
	}
	.icon:hover div {
		scale: 1;
	}
</style>
