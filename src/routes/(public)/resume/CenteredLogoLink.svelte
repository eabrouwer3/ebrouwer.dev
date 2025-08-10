<script lang="ts">
  type Props = {
    href: string;
    img: string;
    alt: string;
  }

  let { href, img, alt }: Props = $props();
</script>

<div class="flex justify-center px-8 py-4 lg:py-2 object-cover">
  <a href={href}>
    <img src={img} alt={alt} class="w-full"/>
  </a>
</div>
