<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  let props: SVGAttributes<SVGElement> = $props();
</script>

<svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...props}>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4.75 5.75H19.25"></path>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4.75 18.25H19.25"></path>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4.75 12H19.25"></path>
</svg>
