<script lang="ts">
	import { page } from '$app/state';
	import GameInstanceDetails from './GameInstanceDetails.svelte';

	const instanceName = page.params.instanceName;
</script>

<div class="flex">
	<div class="grow">
		<svelte:boundary>
			<GameInstanceDetails instanceName={instanceName} />

			{#snippet pending()}
				<p>Loading...</p>
			{/snippet}

			{#snippet failed()}
				<p>Failed to load content.</p>
			{/snippet}
		</svelte:boundary>
	</div>
</div>
