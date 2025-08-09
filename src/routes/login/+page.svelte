<script lang="ts">
  import { page } from "$app/state";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";

  import { loginForm } from "./login.remote.js";

  const id = $props.id();

  let email = $state('');
  let loading = $state(false);

  const error = $derived(loginForm.result?.error ?? page.url.searchParams.get('error'));
</script>

<div class="flex min-h-screen items-center justify-center p-4">
  <Card.Root class="w-full max-w-sm">
    <Card.Header>
      <Card.Title class="text-2xl">Admin Login</Card.Title>
      <Card.Description>Enter your email below to login to the admin panel</Card.Description>
    </Card.Header>
    <Card.Content>
      <form {...loginForm.enhance(async ({submit}) => {
        loading = true;
        await submit();
        loading = false;
      })}>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <Label for="email-{id}">Email</Label>
            <Input aria-invalid={!!error} id="email-{id}" type="email" name="email" placeholder="me@example.com" required bind:value={email} />
            {#if error}
              <p class="text-red-500 text-sm">
                {error}
              </p>
            {/if}
            {#if loginForm.result?.success}
              <p class="text-green-600 text-sm">
                Check your email for a login link.
              </p>
            {/if}
          </div>
          <Button type="submit" class="w-full cursor-pointer" disabled={loading}>Send Magic Link</Button>
        </div>
      </form>
    </Card.Content>
  </Card.Root>
</div>
