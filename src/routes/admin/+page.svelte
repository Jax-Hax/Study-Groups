<script>
	import ClassMod from './ClassMod.svelte';
    import Sidebar from './Sidebar.svelte';
	let class_mod = true;
	let school_admin = false;
    let new_stuff = false
	export let form;
	export let data;
</script>

<body>
	<div class="content">
		<Sidebar bind:school_admin bind:class_mod bind:new_stuff {data} />
	</div>
	{#if class_mod}
		<div class="content"><ClassMod {form} {data} /></div>
	{:else if school_admin}

    {:else if new_stuff}
	{/if}</body
>

<style>
	.content {
		margin-left: 5rem;
	}
	body {
		background-color: var(--background-1-darkest);
	}
</style>
