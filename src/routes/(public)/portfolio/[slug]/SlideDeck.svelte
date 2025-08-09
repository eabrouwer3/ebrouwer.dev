<script lang="ts">
  import { ExternalLink } from "$lib/components";

  type Props = {
    url: string;
    title: string;
  }
  let { url, title }: Props = $props();
</script>

<ExternalLink href={url} rel="noopener noreferrer" target={'_blank'}>Open on slides.com</ExternalLink>
<iframe src={`${url}/embed`} width="100%" height="420" title={title} allowFullScreen scrolling="no"></iframe>
