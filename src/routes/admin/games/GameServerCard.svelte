<script lang="ts">
  import { listGameServers } from "./games.remote";

  type Props = Awaited<ReturnType<typeof listGameServers>>[number]

  let { name, game, subdomain, instanceName, status }: Props = $props();
</script>

<div class="flex">
  <div class="grow">
    <h2 class="font-header text-2xl mb-2">
			<a class="inline-block no-underline font-header hover:text-gray-400" href={`/admin/games/${instanceName}`}>
				{name} ({game})
			</a>
		</h2>
    <h3 class="font-header text-lg mb-2">{subdomain}.ebrouwer.dev</h3>
		{#if status === 'STOPPED' || status === 'TERMINATED' || status === 'SUSPENDED'}
			<button class="bg-red-500 text-white font-bold py-2 px-4 rounded" disabled>Server Stopped</button>
		{:else if status === 'RUNNING'}
			<button class="bg-green-500 text-white font-bold py-2 px-4 rounded" disabled>Server Running</button>
		{:else}
			<button class="bg-gray-400 text-white font-bold py-2 px-4 rounded" disabled>Bad State</button>
		{/if}
  </div>
</div>
