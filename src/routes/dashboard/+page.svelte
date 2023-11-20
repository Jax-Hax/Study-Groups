<script>
	import Dashboard from "./Dashboard.svelte";
import Sidebar from "./Sidebar.svelte";
	let dashboard = true;
    let todo = false;
	export let form;
	export let data;
</script>
<Sidebar bind:dashboard bind:todo/>
{#if dashboard}
<Dashboard {form} {data}/>
{:else if todo}
heeeysdaasdasdsadasdsd
{/if}