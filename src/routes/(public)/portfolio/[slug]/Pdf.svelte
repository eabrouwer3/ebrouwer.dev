<script lang="ts">
  type Props = {
    url: string;
    title: string;
  }
  let { url, title }: Props = $props();
</script>

<iframe src={url} width="100%" height="800px" title={title} allowFullScreen></iframe>
