<script>
	import { enhance } from '$app/forms';
	import Hidden from './Hidden.svelte';

	export let data;
	export let assignmentsShown;

</script>

{#if data.new_assignments.length > 0}
	{#if assignmentsShown}
		<div id="grid">
			<section id="header" on:click={() => (assignmentsShown = false)}>
				<span
					class="material-symbols-outlined"
					style="color: var(--text-color); cursor: pointer; font-size: 35px">remove</span
				>
				<h1 style="text-align: center; flex: 1; color: white;">New Assignments</h1>
			</section>

			{#each data.grades as course}
				{@const new_assignments = data.new_assignments.filter((value) => {
					return value.course_id === course.course_id;
				})}
				{#if new_assignments.length > 0}
					<div>
						<form
							method="post"
							use:enhance
							action="?/seenAssignments"
						>
							<input type="hidden" name="courseID" value={course.course_id} />
							<input type="hidden" name="new_assignments" value={new_assignments.map((value) => {return value.assignment_id}).join(",")} />
							<button class="bouncyButton" style="--pop: var(--green)">Add New Assignments To Todo</button
							>
						</form>
						<h3 style="color: var(--text-color); font-size: 2rem">
							{course.course_name.replace(/\s*\([^)]*\)$/, '').replace(/\bADV PLACEMENT\b/g, 'AP')}
						</h3>
						{#each new_assignments as assignment}<h3 style="color: var(--text-color); ">
								{assignment.text}
							</h3>
						{/each}
					</div>{/if}
			{/each}
		</div>
	{:else}
		<Hidden bind:isEnabled={assignmentsShown}
			><h1 style="text-align: center; flex: 1; color: white;">New Assignments</h1></Hidden
		>
	{/if}
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
		width: 100%;
	}
</style>
