<script>
	export let data;
	export let form;
</script>

<div id="grid">
	{#each data.course_data as course}
		<div class="class">
			<h1>{course.course_name}</h1>
			{#each course.assignment_list as assignment}
				<div class="assignment">
					<div style="color: inherit; text-align: left">
						<p>{assignment.text}</p>
						<p>Due: {new Date(assignment.due_date).toLocaleString()}</p>
					</div>
						<button class="bouncyButton" style="--pop: var(--red); padding: 0.5em 1em; margin: 0.5em; margin-left: auto; margin-right: 0">Remove Post</button>
						<button class="bouncyButton" style="--pop: var(--dark-red); padding: 0.5em 1em; margin: 0.5em;">Ban User</button>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	#grid {
		display: flex;
		gap: 1rem;
		flex-direction: column;
		align-items: center;
		padding: 1em;
	}
	.class {
		background-color: var(--background-4);
		padding: 2em;
		color: var(--text-color);
		border-radius: 16px;
		font-size: 1.25em;
		border-radius: 16px;
		text-align: center;
	}
	h1,
	p {
		color: inherit;
	}
	.assignment {
		color: var(--text-color);
		background-color: var(--background-6);
		padding: 1em;
		border-radius: 1em;
		margin: 1em;
		display: flex;
	}
</style>
