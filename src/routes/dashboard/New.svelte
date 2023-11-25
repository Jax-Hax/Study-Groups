<script>
	export let data;
	export let form;
	let showGpa = false;
	let showGrades = false;
</script>

<div id="grid">
	{#if form?.grades}
		{#each form.grades as course}
			<div>
                <button
							class="addBtn"
							on:click={() => {
								const index = courses.indexOf(course);
								if (index > -1) {
									courses.splice(index, 1);
									courses = courses;
									selectedCourses.push({"hex": "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);}), ...form.courseData[form.courseNameData.indexOf(course)] });
								}
							}}><span class="material-symbols-outlined plus">add</span></button
						>
				<h3 style="color: var(--text-color)">{course.course_name}</h3>
                {#each course.new_assignments as assignment}
                    <p>{@html assignment.Measure} - {assignment.Score.replace(/0+$/,'').replace(/\.$/, '')}</p>
                {/each}
			</div>
		{/each}
	{/if}
</div>

<style>
	#grid {
		display: flex;
        flex-direction: column;
		gap: 1rem;
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
	h1,
	p {
		color: inherit;
	}
	.textshadow {
		color: transparent;
		text-shadow: 0 0 5px var(--text-blur);
	}
</style>
