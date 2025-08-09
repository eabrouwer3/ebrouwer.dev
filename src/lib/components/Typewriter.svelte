<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		strings: string[];
	}

	let {strings}: Props = $props();

  const typeSpeed = 100;
  const deleteSpeed = 50;
  const pauseTime = 1000;
  const cursorChar = '|';

	let displayText = $state('');
	let currentStringIndex = $state(0);
	let isTyping = $state(true);
	let showCursor = $state(true);

	// Blinking cursor effect
	let cursorInterval: number;
	let typewriterTimeout: number;

	onMount(() => {
		// Start cursor blinking
		cursorInterval = setInterval(() => {
			showCursor = !showCursor;
		}, 500);

    startTypewriter();

		return () => {
			clearInterval(cursorInterval);
			clearTimeout(typewriterTimeout);
		};
	});

	function startTypewriter() {
		typeString();
	}

	function typeString() {
		const currentString = strings[currentStringIndex];
		const currentLength = displayText.length;

		if (isTyping) {
			// Typing phase
			if (currentLength < currentString.length) {
				displayText = currentString.slice(0, currentLength + 1);
				typewriterTimeout = setTimeout(typeString, typeSpeed);
			} else {
				// Finished typing, pause then start deleting
				typewriterTimeout = setTimeout(() => {
					isTyping = false;
					typeString();
				}, pauseTime);
			}
		} else {
			// Deleting phase
			if (currentLength > 0) {
				displayText = displayText.slice(0, -1);
				typewriterTimeout = setTimeout(typeString, deleteSpeed);
			} else {
				// Finished deleting, move to next string
				currentStringIndex = (currentStringIndex + 1) % strings.length;
				isTyping = true;

        typewriterTimeout = setTimeout(typeString, typeSpeed);
			}
		}
	}
</script>

<span class="typewriter">
	{displayText}<span class="cursor" class:visible={showCursor}>{cursorChar}</span>
</span>

<style>
	.typewriter {
		display: inline-block;
	}

	.cursor {
		opacity: 0;
		transition: opacity 0.1s;
	}

	.cursor.visible {
		opacity: 1;
	}
</style>
