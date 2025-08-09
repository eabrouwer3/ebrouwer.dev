<script lang="ts">
  import CustomLink from "./CustomLink.svelte";
  import type { Snippet } from "svelte";
  import type { SvelteHTMLElements } from "svelte/elements";

  type Props = {
    children?: Snippet;
  } & SvelteHTMLElements['a']

  let { children, ...props }: Props = $props();
</script>

<CustomLink external={true} {...props}>
  {@render children?.()}
</CustomLink>
