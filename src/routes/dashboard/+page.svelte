<script>
	import Dashboard from "./Dashboard.svelte";
import Sidebar from "./Sidebar.svelte";
	let dashboard = true;
    let todo = false;
	export let form;
	export let data;
</script>
<div class="content">
<Sidebar bind:dashboard bind:todo/></div>
{#if dashboard}
<div class="content"><Dashboard {form} {data}/></div>
{:else if todo}
heeeysdaasdasdsadasdsd
{/if}
<style>
	.content {
		margin-left: 5rem
	}
</style>