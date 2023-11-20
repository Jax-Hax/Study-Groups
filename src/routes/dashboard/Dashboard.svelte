<script>
	export let data;
	export let form;
	let courseAssignmentCounts;
	$: {courseAssignmentCounts = data.new_assignments.reduce((acc, { course_id }) => {
  acc[course_id] = (acc[course_id] || 0) + 1;
  return acc;
}, {}); console.log(courseAssignmentCounts)}


</script>

<div id="grid">
	{#each data.course_data as course}
		<div>
			<h1>{course.course_name}</h1>
			{#if courseAssignmentCounts[course.course_id]}
			<p>{courseAssignmentCounts[course.course_id]} new assignments</p>
			{:else}
			<p>0 new assignments</p>
			{/if}
			<p>_ new grades</p>
		</div>
	{/each}
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
	#grid div:hover {
		background-color: var(--background-6);
	}
	h1,
	p {
		color: inherit;
	}
</style>
