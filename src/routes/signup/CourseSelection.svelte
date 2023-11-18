<script>
	import { enhance } from '$app/forms';
	import CourseConfirm from './CourseConfirm.svelte';
	export let form;
	let courses = form.courseOptions;
	let selectedCourses = [];
	let courseConfirm = false;
</script>

<div class="dialog">
	<div style="display: flex; justify-content: flex-end;">
		<h1 style="text-align: center;margin: auto">Class selection</h1>
		<button class="bouncyButton" on:click={() => courseConfirm = true}>Next</button>
		
	</div>
	
	<p style="text-align: center; margin-bottom: 1em">Add the classes you would like to be a part of!</p>
	<p style="text-align: center; margin-bottom: 1em">"Not available" means that no one has taken over the job of moderating the class, but you can apply if you want to!</p>
	
	
	{#each courses as course}
		<div class="courseDiv">
			<p class="course">{course}</p>
			<div>{#if form.courseData}
				{#if form.courseData.includes(course)}
					<button class="addBtn" on:click={() => {selectedCourses.push(course);const index = courses.indexOf(course);
						if (index > -1) {
							courses.splice(index, 1);
							courses = courses;
						}}}><span class="material-symbols-outlined plus">add</span></button>
					
				
				{:else}
				<p class="fakeButton">Not available</p>
				{/if}
			{/if}
		</div>
		</div>
	{/each}
</div>
{#if courseConfirm}
	<CourseConfirm {selectedCourses} {form} bind:courseConfirm/>
{/if}
<style>
	.course {
		font-size: 25px;
	}
	.fakeButton {
		background-color: var(--grayed-pop);
		border: none;
		color: white;
		padding: 0.5em 1em;
		border-radius: 19px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 0.75rem;
	}
	.courseDiv{
		display: flex; 
		justify-content: space-between;
		align-items: center;
		padding: 1em
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
	.dialog {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 3em;
		width: 60vw;
		max-width: 700px;
		border: none;
		border-radius: 1em;
		background-color: var(--background-5);
	}
	h1,
	p {
		color: var(--text-color);
	}
</style>
