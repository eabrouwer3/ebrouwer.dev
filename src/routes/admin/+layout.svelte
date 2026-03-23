<script lang="ts">
  import { authClient } from "$lib/client/auth-client.js";
	import { getUser } from "./auth.remote.js";
  import { Button } from "$lib/components/ui/button";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import SunIcon from "@lucide/svelte/icons/sun";
  import MoonIcon from "@lucide/svelte/icons/moon";
  import EllipsisVerticalIcon from "@lucide/svelte/icons/ellipsis-vertical";
  import Ellipsis from "@lucide/svelte/icons/ellipsis";
  import LogoutIcon from "@lucide/svelte/icons/log-out";
  import GamepadIcon from "@lucide/svelte/icons/gamepad-2";
  import HouseIcon from "@lucide/svelte/icons/house";
  import { Icon } from '@lucide/svelte';
  import { planet, faceAlien } from '@lucide/lab';
	import { goto } from "$app/navigation";

  import { ModeWatcher, toggleMode } from "mode-watcher";
	import { page } from "$app/state";

  let { children } = $props();

  const currentUser = getUser();

  async function handleLogout() {
    await authClient.signOut();
    await goto('/login', { replaceState: true });
  }
</script>

<ModeWatcher />

{#snippet avatar()}
  <Avatar.Root class="size-8 rounded-lg grayscale">
    <Avatar.Image src={currentUser.current?.image} alt={currentUser.current?.name} />
    <Avatar.Fallback class="rounded-lg">
      <Icon iconNode={faceAlien} />
    </Avatar.Fallback>
  </Avatar.Root>
  <div class="grid flex-1 text-left text-sm leading-tight">
    <span class="truncate font-medium">{currentUser.current?.name ?? 'Loading...'}</span>
    <span class="text-muted-foreground truncate text-xs">
      {currentUser.current?.email ?? 'Loading...'}
    </span>
  </div>
{/snippet}

<Sidebar.Provider>
  {@const sidebar = Sidebar.useSidebar()}

  <Sidebar.Root collapsible="icon">
    <Sidebar.Header>
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:!p-1.5">
            {#snippet child({ props })}
              <a href="/admin" {...props}>
                <Icon iconNode={planet} />
                <span class="text-base font-semibold">Admin Panel</span>
              </a>
            {/snippet}
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </Sidebar.Header>
    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.GroupContent class="flex flex-col gap-2">
          <Sidebar.Menu>
            <Sidebar.MenuItem class="flex items-center gap-2">
              <Sidebar.MenuButton tooltipContent="Dashboard" isActive={page.url.pathname === '/admin'}>
                {#snippet child({ props })}
                  <a href="/admin" {...props}>
                    <HouseIcon />
                    <span>Dashboard</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem class="flex items-center gap-2">
              <Sidebar.MenuButton tooltipContent="Game Servers" isActive={page.url.pathname === '/admin/games'}>
                {#snippet child({ props })}
                  <a href="/admin/games" {...props}>
                    <GamepadIcon />
                    <span>Game Servers</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									{#snippet child({ props })}
										<Sidebar.MenuAction {...props}>
											<Ellipsis />
										</Sidebar.MenuAction>
									{/snippet}
								</DropdownMenu.Trigger>
								<DropdownMenu.Content side="right" align="start">
									<DropdownMenu.Item on:click={() => goto('/admin/games/new')}>
										<span>New</span>
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
    </Sidebar.Content>
    <Sidebar.Footer>
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              {#snippet child({ props })}
                <Sidebar.MenuButton
                  {...props}
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  {@render avatar()}
                  <EllipsisVerticalIcon class="ml-auto size-4" />
                </Sidebar.MenuButton>
              {/snippet}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
              side={sidebar.isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenu.Label class="p-0 font-normal">
                <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  {@render avatar()}
                </div>
              </DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>
                <Button onclick={handleLogout} variant="outline" size="sm" class="w-full">
                  <LogoutIcon />
                  Log out
                </Button>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <Button onclick={toggleMode} variant="outline" size="sm" class="w-full">
                  <SunIcon
                    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 !transition-all dark:-rotate-90 dark:scale-0"
                  />
                  <MoonIcon
                    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-100"
                  />
                  <span class="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </Sidebar.Footer>

    <Sidebar.Rail />
  </Sidebar.Root>

  <Sidebar.Inset>
    <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <Sidebar.Trigger class="-ml-1" />
    </header>
    <div class="flex flex-1 flex-col gap-4 p-4">
      {@render children()}
    </div>
  </Sidebar.Inset>
</Sidebar.Provider>
