<script lang="ts">
  let { href, name, block = false } = $props();
</script>

<a data-sveltekit-noscroll class={`text-white py-4 px-6 uppercase font-bold border border-transparent border-solid no-underline ${block ? 'block' : 'inline'} visited:text-white focus:text-white hover:text-white hover:border-white`} href={href}>{name}</a>
