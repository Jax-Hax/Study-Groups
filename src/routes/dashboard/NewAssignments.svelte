<script>
	import Hidden from './Hidden.svelte';

	export let data;
	export let assignmentsShown;
</script>

{#if assignmentsShown}
	<div id="grid">
		<section id="header" on:click={() => (assignmentsShown = false)}>
			<span
				class="material-symbols-outlined"
				style="color: var(--text-color); cursor: pointer; font-size: 35px"
				>remove</span
			>
            <h1 style="text-align: center; flex: 1; color: white;">New Assignments</h1>
        </section>

		
			{#each data.new_assignments as assignment}
				<div>
					<button
						class="addBtn"
						on:click={() => {}}><span class="material-symbols-outlined plus">add</span></button
					>
					<h3 style="color: var(--text-color)">{assignment.text}</h3>
				</div>
			{/each}
	</div>
{:else}
	<Hidden bind:isEnabled={assignmentsShown}
		><h1 style="text-align: center; flex: 1; color: white;">New Assignments</h1></Hidden
	>
{/if}

<style>
	#grid {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		padding: 1em;
		background-color: var(--background-2);
		padding: 2em;
		margin: 2em;
		border-radius: 3em;
	}
	#grid div {
		background-color: var(--background-4);
		padding: 2em;
		color: var(--text-color);
		border-radius: 16px;
		font-size: 1.25em;
		border-radius: 16px;
		text-align: center;
		cursor: pointer;
	}
	.addBtn {
		background-color: var(--green);
		border: none;
		color: white;
		padding: 0.5em;
		border-radius: 50%;
		text-align: center;
		cursor: pointer;
	}
	.addBtn:hover {
		background-color: var(--dark-green);
	}
	#grid div:hover {
		background-color: var(--background-6);
	}
	p {
		color: inherit;
	}
	#header {
		cursor: pointer;
		display: flex;
		align-items: center;
        width: 100%
	}
</style>
