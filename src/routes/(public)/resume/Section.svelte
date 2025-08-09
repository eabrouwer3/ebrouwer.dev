<script lang="ts">
	import { Circle } from "$lib/icons";
	import type { Component, Snippet } from "svelte";
	import type { SVGAttributes } from "svelte/elements";

  type Props = {
    IconComponent: Component<SVGAttributes<SVGElement>>;
    title: string;
    children?: Snippet;
}

  let { IconComponent, title, children }: Props = $props();
</script>

<div class="pt-7">
  <span class="inline-block relative h-8 w-8">
    <Circle class="text-skalex absolute top-1/2 -translate-y-1/2 h-20 w-20" />
    <IconComponent class="text-white absolute left-6 top-1/2 -translate-y-1/2 h-8 w-8" />
  </span>
  <span class='font-header uppercase pl-14 text-3xl'>{title}</span>
</div>
<div>
  {@render children?.()}
</div>
