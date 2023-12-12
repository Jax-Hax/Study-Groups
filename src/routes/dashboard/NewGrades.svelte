<script>
	import { enhance } from '$app/forms';
	import Hidden from './Hidden.svelte';

	export let data;
	export let gradesShown;
</script>

{#if data.grades.reduce((total, course) => total + (course.new_assignments.length > 0 ? course.new_assignments.length : 0), 0) > 0}
	{#if gradesShown}
		<div id="grid">
			<section id="header" on:click={() => (gradesShown = false)}>
				<span
					class="material-symbols-outlined"
					style="color: var(--text-color); cursor: pointer; font-size: 35px">remove</span
				>
				<h1 style="text-align: center; flex: 1; color: white;">New Grades</h1>
			</section>
			{#each data.grades as course}
				{#if course.new_assignments.length > 0}
					{@const grade_id_list = course.new_assignments.map((value) => value.GradebookID)}
					<div>
						<form
							method="post"
							use:enhance
							style="margin-left: auto; margin-right: 3em"
							action="?/seenGrades"
						>
							<input type="hidden" name="courseID" value={course.course_id} />
							<input type="hidden" name="grade_id_list" value={grade_id_list.join(',')} />
							<button class="addBtn"><span class="material-symbols-outlined plus">add</span></button
							>
						</form>

						<h3 style="color: var(--text-color)">
							{course.course_name.replace(/\s*\([^)]*\)$/, '').replace(/\bADV PLACEMENT\b/g, 'AP')}
						</h3>
						{#each course.new_assignments as assignment}
							<p>
								{@html assignment.Measure} - {assignment.Score.replace(/0+$/, '').replace(
									/\.$/,
									''
								)}
							</p>
						{/each}
					</div>{/if}
			{/each}
		</div>
	{:else}
		<Hidden bind:isEnabled={gradesShown}
			><h1 style="text-align: center; flex: 1; color: white;">New Grades</h1></Hidden
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
