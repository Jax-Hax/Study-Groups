<script>
	import NewAssignments from "./NewAssignments.svelte";
import NewGrades from "./NewGrades.svelte";

	export let data;
	let gradesShown = false;
	let assignmentsShown = false;
</script>
<NewGrades {data} bind:gradesShown/>
<NewAssignments {data} bind:assignmentsShown />
