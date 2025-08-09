<script lang="ts">
  import { Card } from "$lib/components";
	import type { Snippet } from "svelte";

  type Props = {
    repo: string,
    name: string,
    img?: string,
    children?: Snippet,
  }
  let { repo, name, img, children }: Props = $props();
</script>

<Card
  title={name}
  img={img}
  link={{
    type: 'external',
    href: `https://github.com/${repo}`,
    text: repo,
  }}
>
  {@render children?.()}
</Card>
