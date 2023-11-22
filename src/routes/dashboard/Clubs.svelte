<script>
	import AddClubPopup from "./AddClubPopup.svelte";
	export let data;
	export let form;
	let courseAssignmentCounts;
	$: {
		courseAssignmentCounts = data.new_assignments.reduce((acc, { course_id }) => {
			acc[course_id] = (acc[course_id] || 0) + 1;
			return acc;
		}, {});
	}
    let showNewClub=false;
</script>
{#if showNewClub}
	<AddClubPopup {form} {data} bind:showNewClub />
{/if}
<h1 style="text-align:center; color: var(--text-color)">Clubs</h1>

<div id="grid">
    <button
		class="bouncyButton"
		on:click={() => (showNewClub = true)}
		style="padding: 0.5em 0; font-size: 30px">Create New Club</button
	>
	{#each data.club_data as club}
		<div>
			<h1>{club.name}</h1>
            <p>Next meeting time: _</p>
            <p>At: {club.location}</p>
            <p>Sponsor: </p>
            <p>_ new announcements</p>
		</div>
	{/each}
</div>

<style>
	#grid {
		display: grid;
		gap: 1rem;
		align-items: center;
		padding: 1em;
	}
	#grid div {
		background-color: var(--background-4);
		padding: 2em;
		color: var(--text-color);
		border-radius: 16px;
		font-size: 1.25em;
		border-radius: 16px;
		text-align: center;
		cursor: pointer;
	}
	#grid div:hover {
		background-color: var(--background-6);
	}
	h1,
	p {
		color: inherit;
	}
</style>
