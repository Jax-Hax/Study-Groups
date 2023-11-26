<script>
	import NewAssignments from "./NewAssignments.svelte";
import NewGrades from "./NewGrades.svelte";

	export let data;
	export let form;
	let gradesShown = false;
	let assignmentsShown = false;
</script>
<NewGrades {form} {data} bind:gradesShown/>
<NewAssignments {form} {data} bind:assignmentsShown />
