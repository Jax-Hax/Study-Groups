<script>
    export let data;
    export let form;
</script>
<div id="grid">
	{#each data.course_data as course}
		<div>
			<h1>{course.course_name}</h1>
			<p>_ new assignments</p>
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
    h1,p {
        color: inherit
    }
</style>