<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements'
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
    external?: boolean;
  } & SvelteHTMLElements['a']

  let { children, external, ...props }: Props = $props();
</script>

<a
  class="text-link no-underline focus:text-link focus:no-underline visited:text-link visited:no-underline hover:text-hover-link hover:no-underline"
  rel={external ? 'noopener noreferrer' : undefined}
  target={external ? '_blank' : undefined}
  {...props}
>
  {@render children?.()}
</a>
