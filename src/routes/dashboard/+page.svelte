<script>
	import Clubs from "./Clubs.svelte";
	import Dashboard from "./Dashboard.svelte";
	import New from "./New.svelte";
	import Sidebar from "./Sidebar.svelte";
	import ToDo from "./ToDo.svelte";
	let dashboard = true;
    let todo = false;
	let new_stuff = false;
	let clubs = false;
	export let form;
	export let data;
</script>
<body>
<div class="content">
<Sidebar bind:dashboard bind:todo bind:new_stuff {data} {form} bind:clubs/></div>
{#if dashboard}
<div class="content"><Dashboard {form} {data}/></div>
{:else if todo}
<div class="content"><ToDo {form} {data}/></div>
{:else if new_stuff}
<div class="content"><New {data}/></div>
{:else if clubs}
<div class="content"><Clubs {form} {data}/></div>
{/if}</body>
<style>
	.content {
		margin-left: 5rem
	}
	body {
		background-color: var(--background-1-darkest);
	}
</style>