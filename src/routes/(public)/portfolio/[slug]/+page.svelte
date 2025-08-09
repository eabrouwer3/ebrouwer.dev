<script lang="ts">
  import type { PageProps } from './$types';
  import Pdf from './Pdf.svelte';
  import SlideDeck from './SlideDeck.svelte';

  let { data }: PageProps = $props();

  const portfolioItem = data;
</script>

<div class="flex pb-6 pt-12">
  <div class="flex flex-col justify-center grow">
    <h1 class="font-header text-4xl tracking-widest block">{portfolioItem.title}</h1>
  </div>
</div>
<div class="flex justify-center">
  <div class="grow">
    {#if portfolioItem.type === 'pdf'}
      <Pdf url={portfolioItem.document} title={portfolioItem.title} />
    {:else}
      <SlideDeck title={portfolioItem.title} url={portfolioItem.url} />
    {/if}
  </div>
</div>
