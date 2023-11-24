<script>
	export let data;
	export let form;
	let courseAssignmentCounts;
	$: {
		courseAssignmentCounts = data.new_assignments.reduce((acc, { course_id }) => {
			acc[course_id] = (acc[course_id] || 0) + 1;
			return acc;
		}, {});
	}
	let showGpa = false;
	let showGrades = false;
</script>

{#if form?.gpa}
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<div id="gpa">
		<h1>GPA:</h1>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<p class:textshadow={!showGpa} on:click={() => (showGpa = !showGpa)}>
			{#if showGpa}{form.gpa}{:else}Show{/if}
		</p>
		<p>Includes all of your classes, even if they aren't part of the app</p>
	</div>{/if}
<div id="grid">
	{#if form?.grades}
		{#each form.grades as course}
			<div>
				<h1>{course.course_name}</h1>
				{#if courseAssignmentCounts[course.course_id]}
					<p>{courseAssignmentCounts[course.course_id]} new assignment(s)</p>
				{:else}
					<p>0 new assignment(s)</p>
				{/if}
				<p>_ new grades</p>
				<p>Grade:</p>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<p class:textshadow={!showGrades} on:click={() => (showGrades = !showGrades)}>
					{#if showGrades}{course.grade}{:else}Show{/if}
				</p>
			</div>
		{/each}
	{:else}
		{#each data.course_data as course}
			<div>
				<h1>{course.course_name}</h1>
				{#if courseAssignmentCounts[course.course_id]}
					<p>{courseAssignmentCounts[course.course_id]} new assignment(s)</p>
				{:else}
					<p>0 new assignment(s)</p>
				{/if}
			</div>
		{/each}
	{/if}
</div>

<style>
	#grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		align-items: center;
		padding: 1em;
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
	#gpa {
		background-color: var(--background-4);
		padding: 2em;
		color: var(--text-color);
		border-radius: 16px;
		font-size: 1.25em;
		margin: 1rem 1rem 0rem 1rem;
		border-radius: 16px;
		text-align: center;
		cursor: pointer;
	}
	#grid div:hover {
		background-color: var(--background-6);
	}
	h1,
	p {
		color: inherit;
	}
	.textshadow {
		color: transparent;
		text-shadow: 0 0 5px var(--text-blur);
	}
</style>
