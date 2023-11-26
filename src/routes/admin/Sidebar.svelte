<script>
	import { enhance } from '$app/forms';

	export let class_mod;
	export let school_admin;
	export let data;
</script>

<div id="sidebar">
	<div
		class="icon"
		style="margin-top: 0.5em"
		class:enabled={school_admin}
		on:click={() => {
			school_admin = true;
			class_mod = false;
		}}
	>
		<span class="material-symbols-outlined">things_to_do</span>
		<div class="sidebar-tooltip">School Admin</div>
	</div>
	<div
		class="icon"
		class:enabled={class_mod}
		on:click={() => {
			school_admin = false;
			class_mod = true;
		}}
	>
		<span class="material-symbols-outlined">local_library</span>
		<div class="sidebar-tooltip">Class Moderation</div>
	</div>
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
        <span>1</span>
		<div class="sidebar-tooltip">New</div>
	</div>
	<form method="POST" style="margin-top: auto;" use:enhance action="?/switchToSchool">
		<button class="icon" style="padding: 2.5em">
			<span class="material-symbols-outlined">school</span>
			<div class="sidebar-tooltip">Switch to School Dashboard</div>
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
