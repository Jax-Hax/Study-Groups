<script>
	import CourseSelection from './CourseSelection.svelte';
import StudentVueAuth from './StudentVueAuth.svelte';
	export let form;
	export let data;
	let showStudentvue = true;
	let showCourses = false;
	$: if (form?.success == true) {showCourses = true; showStudentvue = false;}
</script>

<body> 
	<form method="post" action="?/signout">
		<button class="bouncyButton" style="margin: 1em">Sign out</button>
	</form>
	<h1 style="color: var(--text-color); text-align: center; margin-top: -1em">Welcome to __!</h1>
	{#if showStudentvue}
	<StudentVueAuth {form} {data} />
	{/if}
	{#if showCourses}
	<CourseSelection {form} {data} />
	{/if}
</body>

<style>
	body {
		background-color: var(--background-2);
	}
</style>
