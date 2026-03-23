<script lang="ts">
  import { Skeleton } from "$lib/components/ui/skeleton";
  import GameServerCard from "./GameServerCard.svelte";
  import { listGameServers } from "./games.remote";
</script>

<h1 class="text-2xl font-bold">Game Servers</h1>
<svelte:boundary>
  {#each await listGameServers() as gameServer}
    <GameServerCard {...gameServer} />
  {/each}

  {#snippet pending()}
		<div class="flex py-4 mb-2.5">
			<div class="grow py-1.5">
				<Skeleton class="h-6 w-1/4 mb-2" />
				<Skeleton class="h-6 w-1/2 mb-2" />
				<Skeleton class="h-10 w-1/2" />
			</div>
		</div>

		<div class="flex py-4 mb-2.5">
			<div class="grow py-1.5">
				<Skeleton class="h-6 w-1/4 mb-2" />
				<Skeleton class="h-6 w-1/2 mb-2" />
				<Skeleton class="h-10 w-1/2" />
			</div>
		</div>
  {/snippet}

  {#snippet failed()}
    <p>Failed to load game servers</p>
  {/snippet}
</svelte:boundary>
