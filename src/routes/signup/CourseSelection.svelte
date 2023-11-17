<script>
	import { enhance } from '$app/forms';
	export let form;
	let text = 'Import from StudentVue';
	let courses = form.courseOptions;
</script>

<div class="dialog">
	<h1 style="text-align: center;">Class selection</h1>
	{#each courses as course}
		<div style="display: flex;">
			<p class="course">{course}</p>
			{#if form.courseData}
				{#if form.courseData.includes(course)}
					yah
				{:else}
					na
				{/if}
			{/if}
			<button
				on:click={() => {
					const index = courses.indexOf(course);
					if (index > -1) {
						courses.splice(index, 1);
						courses = courses;
					}
				}}>aa</button
			>
		</div>
	{/each}
</div>

<style>
	.course {
		font-size: 25px;
	}
	.dialog {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 3em;
		width: 60vw;
		max-width: 600px;
		border: none;
		border-radius: 1em;
		background-color: var(--background-5);
	}
	h1,
	p {
		color: var(--text-color);
	}
</style>
