<script>
	import { enhance } from '$app/forms';
	import CourseConfirm from './CourseConfirm.svelte';
	/**
	 * @type {{ courseOptions: any; courseNameData: string | any[]; courseData: { [x: string]: any; }; }}
	 */
	export let form;
	let courses = form.courseOptions;
	/**
	 * @type {any[]}
	 */
	let selectedCourses = [];
	let courseConfirm = false;
	courses.forEach((courseToFind) => {
		selectedCourses.push({
			hex: '#000000'.replace(/0/g, function () {
				return (~~(Math.random() * 16)).toString(16);
			}),
			course_level: get_course_level(courseToFind),
			course_name: form.courseOptions[form.courseOptions.indexOf(courseToFind)]
		});
	});
	function get_course_level(courseToFind) {
		let index = form.courseNameData.indexOf(courseToFind)
		console.log(index)
		if (index > -1) {
			return form.courseData[index].type_of_class
		}
		return "HON"
	}
</script>

<div class="dialog">
	<div style="display: flex; justify-content: flex-end;">
		<h1 style="text-align: center;margin: auto">Class selection</h1>
		<button class="bouncyButton" on:click={() => (courseConfirm = true)}>Next</button>
	</div>
	<br>

	{#each selectedCourses as course}
		<div class="courseDiv">
			<p class="course">{course.course_name}</p>
			<div>
				{#if form.courseNameData}
					{#if form.courseNameData.includes(course.course_name)}
						<p class="fakeButton">Class is already in database</p>
					{:else}
					<select name="assignment_type" bind:value={course.course_level}>
						<option value="HON">Honors</option>
						<option value="C">C Level</option>
						<option value="AP">AP/DE/IB</option>
					</select>
					{/if}
				{/if}
			</div>
		</div>
	{/each}
</div>
{#if courseConfirm}
	<CourseConfirm {selectedCourses} {form} bind:courseConfirm />
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
	.courseDiv {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1em;
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
