<script>
	import NewGrades from "./NewGrades.svelte";

	export let data;
	export let form;
	let gradesShown = false;
</script>
<NewGrades {form} {data} bind:gradesShown/>

