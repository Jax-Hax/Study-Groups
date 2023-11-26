<script>
	export let data;
	export let form;
</script>

<div id="grid">
		{#each data.course_data as course}
			<div>
				<h1>{course.course_name}</h1>
				{#each course.assignment_list as assignment}
                <p>{assignment.text}</p>
                <p>Due: {new Date(assignment.due_date).toLocaleString()}</p>
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
