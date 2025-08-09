<script lang="ts">
  import { listGameServers, manageServer } from "./games.remote";
  import hljs from 'highlight.js/lib/core';
  import yaml from 'highlight.js/lib/languages/yaml';
  import 'highlight.js/styles/atom-one-dark.css';
	import { onMount } from "svelte";

  hljs.registerLanguage('yaml', yaml);

  type Props = Awaited<ReturnType<typeof listGameServers>>[number]

  let { name, game, subdomain, instanceName, status, vmInstance }: Props = $props();

  let loading = $state(false);

  const containerDeclarations = vmInstance?.metadata?.items
    ?.filter(({ key, value }) => value && key == 'gce-container-declaration')
    .map(({ value }) => value!.trim())

  onMount(() => {
    if (containerDeclarations) {
      const codeElements = document.querySelectorAll('code.language-yaml');
      codeElements.forEach(block => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  })
</script>

<div class="flex">
  <div class="grow">
    <h2 class="font-header text-2xl mb-2">{name} ({game})</h2>
    <h3 class="font-header text-lg mb-2">{subdomain}.ebrouwer.dev</h3>

    {#if containerDeclarations}
      {#each containerDeclarations as containerDeclaration}
        {#if containerDeclaration}
          <div class="max-w-200 max-h-80 overflow-auto mb-2">
            <pre><code class="language-yaml">{containerDeclaration}</code></pre>
          </div>
        {/if}
      {/each}
    {/if}

    <form {...manageServer.enhance(async ({ submit }) => {
      loading = true;
      try {
        await submit();
      } catch (error) {
        console.error(error);
      } finally {
        loading = false;
      }
    })}>
      <input type="hidden" name="instanceName" value={instanceName} />
      <input type="hidden" name="subdomain" value={subdomain} />
      {#if status === 'RUNNING'}
        <input type="hidden" name="action" value="stop" />
        <button class="bg-red-500 hover:bg-red-700 disabled:bg-red-300 text-white font-bold py-2 px-4 rounded" disabled={loading}>Stop Server</button>
      {:else if status === 'STOPPED' || status === 'TERMINATED'}
        <input type="hidden" name="action" value="start" />
        <button class="bg-green-500 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-2 px-4 rounded" disabled={loading}>Start Server</button>
      {:else if status === 'SUSPENDED'}
        <input type="hidden" name="action" value="resume" />
        <button class="bg-green-500 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-2 px-4 rounded" disabled={loading}>Start Server</button>
      {:else}
        <button class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded" disabled>Bad State</button>
      {/if}
    </form>
  </div>
</div>
