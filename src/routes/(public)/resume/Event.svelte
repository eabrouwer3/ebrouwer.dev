<script lang="ts">
	import { Circle } from "$lib/icons";
	import type { Snippet, Component } from "svelte";

  type Props = {
    current?: boolean;
    startDate: string;
    endDate?: string;
    title: string;
    children: Snippet;
    logo?: Snippet;
  }

  let { current, startDate, endDate, title, children, logo }: Props = $props();
</script>

<div class="ml-9.5 pl-12 pt-8 border-l-4 border-l-slate-300 border-solid">
  <Circle class={`relative w-8 top-3 -left-16.5 ${current ? 'text-skalex' : 'text-slate-300'}`} />
  <div class="relative -top-5">
    <div class="flex flex-col lg:flex-row mb-3 border-b-slate-300/75 border-b-2">
      <div class="lg:grow flex flex-col justify-center">
        <div class='font-header mb-2.5 text-2xl'>{title}</div>
        <div class="uppercase whitespace-nowrap text-black/50 text-sm pb-2.5">
          {startDate} {endDate || current ? '—' : ''} {endDate || (current && 'Present')}
        </div>
      </div>
      <div class="lg:grow">
        {#if logo}
          {@render logo?.()}
        {/if}
      </div>
    </div>
    <div>
      {@render children?.()}
    </div>
  </div>
</div>
