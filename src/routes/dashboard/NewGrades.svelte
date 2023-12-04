<script>
	import Hidden from "./Hidden.svelte";

    export let data;
    export let gradesShown;
</script>
{#if gradesShown}
<div id="grid">
	<section id="header" on:click={() => (gradesShown = false)}>
		<span
			class="material-symbols-outlined"
			style="color: var(--text-color); cursor: pointer; font-size: 35px"
			>remove</span
		>
		<h1 style="text-align: center; flex: 1; color: white;">New Grades</h1>
	</section>
		{#each data.grades as course}
			<div>
                <button
							class="addBtn"
							on:click={() => {}}><span class="material-symbols-outlined plus">add</span></button
						>
				<h3 style="color: var(--text-color)">{course.course_name}</h3>
                {#each course.new_assignments as assignment}
                    <p>{@html assignment.Measure} - {assignment.Score.replace(/0+$/,'').replace(/\.$/, '')}</p>
                {/each}
			</div>
		{/each}
</div>
{:else}
    <Hidden bind:isEnabled={gradesShown}><h1 style="text-align: center; flex: 1; color: white;">New Grades</h1></Hidden>
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
