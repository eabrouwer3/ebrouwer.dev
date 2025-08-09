<script lang="ts">
  import { Card, CustomLink } from "$lib/components";
	import type { Snippet } from "svelte";

  type Props = {
    page: string,
    name: string,
    img?: string,
    children?: Snippet,
  }
  let { page, name, img, children }: Props = $props();
</script>

<Card
  title={name}
  img={img}
  link={{
    type: 'internal',
    href: page,
  }}
>
  {@render children?.()} <CustomLink data-sveltekit-noscroll href={page}>Read More...</CustomLink>
</Card>
