<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  let props: SVGAttributes<SVGElement> = $props();
</script>

<svg fill="none" viewBox="0 0 24 24" {...props}>
  <circle cx="12" cy="12" r="7.25" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle>
</svg>
