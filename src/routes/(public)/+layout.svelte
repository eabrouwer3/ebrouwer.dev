<script lang="ts">
  import { browser } from '$app/environment';
  import headerImage from '$lib/assets/images/angels-landing.jpg';
  import { Typewriter } from '$lib/components';
  import { ChevronDown, Hamburger } from '$lib/icons';
  import HeaderLink from './HeaderLink.svelte';

  let { children } = $props();

  let headerRef: HTMLDivElement;
  let menuOpen = $state(false);

  function scrollToHeader() {
    if (browser && headerRef) {
      headerRef.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function showMenu() {
    menuOpen = true;
  }

  function hideMenu() {
    menuOpen = false;
  }
</script>

<div class="font-sans">
  <div>
    <div class="h-screen overflow-hidden relative">
      <div class="h-screen w-screen opacity-50 bg-black absolute inset-0 z-10"></div>
      <div class="flex flex-col absolute inset-0">
        <img class="min-h-full min-w-full object-cover object-center" src={headerImage} alt="Angel's Landing" />
      </div>
      <div class="flex flex-col justify-center items-center absolute inset-x-0 bottom-0 z-20 text-3xl text-white">
        Hi, I am
        <h1 class="font-header m-0 text-6xl font-mediumn text-center">Ethan Brouwer</h1>
        I am
        <Typewriter
          strings={['a Husband', 'a Father', 'a Code Ninja', 'a World Traveler']}
        />
        <ChevronDown class="cursor-pointer" height="96" width="96" onclick={scrollToHeader} />
      </div>
    </div>
    <div class="flex text-white w-full items-center sticky top-0 z-50 bg-skalex" style="background: #32a852" bind:this={headerRef}>
      <div class="grow pl-5">
        <h1 class='font-header text-4xl font-medium m-4'>Ethan Brouwer</h1>
      </div>
      <div class="grow-[2] pr-5 text-right">
        <div class="hidden lg:block">
          <HeaderLink href={'/'} name={'About Me'} />
          <HeaderLink href={'/resume'} name={'Resume'} />
          <HeaderLink href={'/portfolio'} name={'Portfolio'} />
        </div>
        <div class="lg:hidden">
          <Hamburger onclick={showMenu} class="float-right cursor-pointer" />
          <div onclick={hideMenu} class={`fixed box-border h-screen w-fit top-0 m-0 bg-skalex duration-500 transition-[right] z-20 ${menuOpen ? 'right-0' : '-right-[100vw]'}`}>
            <HeaderLink href={'/'} name={'About Me'} block />
            <HeaderLink href={'/resume'} name={'Resume'} block />
            <HeaderLink href={'/portfolio'} name={'Portfolio'} block />
          </div>
          <div onclick={hideMenu} class={`fixed h-screen w-screen inset-0 m-0 opacity-50 bg-black z-10 ${menuOpen ? 'block' : 'hidden'}`}></div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-center">
    <div class="grow min-h-screen max-w-3xl pt-0 pb-12 px-2.5">
      {@render children?.()}
    </div>
  </div>
</div>
