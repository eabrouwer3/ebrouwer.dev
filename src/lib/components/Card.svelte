<script lang="ts">
  import { Share } from "$lib/icons";
	import type { Snippet } from "svelte";

  type Props = {
  title: string,
  img?: string,
  link?: {
    type: 'internal',
    href: string,
  } | {
    type: 'external',
    href: string,
    text: string,
  },
  children?: Snippet,
}

  let { title, img, link, children }: Props = $props();
</script>

<div class="flex p-4 m-2.5 shadow-lg duration-300 hover:shadow-2xl">
  <div class="grow pl-1.5">
    <h2 class="font-header text-2xl inline-block m-0">{title}</h2>
    <br/>
    {#if link}
      {#if link.type === 'internal'}
        <a data-sveltekit-noscroll class="inline-block text-sm no-underline font-header text-gray-400 focus:text-gray-400 visited:text-gray-400	hover:text-gray-600" href={link.href}>
          {link.href}
        </a>
      {:else}
        <a class="inline-block text-sm no-underline font-header text-gray-400 focus:text-gray-400 visited:text-gray-400	hover:text-gray-600" href={link.href}  rel="noopener noreferrer" target='_blank'>
          {link.text} <sup><Share class="text-xs inline w-3"/></sup>
        </a>
      {/if}
    {/if}
    <div class="mt-2.5 mb-0">
      {#if img}
        <img class="w-1/4 float-left hidden lg:block mr-4 ml-2 my-2" src={img} alt={title} />
      {/if}
      {@render children?.()}
    </div>
  </div>
</div>
