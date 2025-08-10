import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
	optimizeDeps: { exclude: ['@lucide/svelte', '@lucide/lab'] },
	esbuild: { supported: { 'top-level-await': true } },
	ssr: {
		// External packages that need Node.js globals should not be bundled
		external: ['@google-cloud/compute']
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					// Bundle all Lucide icons together to avoid individual requests that might be blocked
					if (id.includes('@lucide/svelte')) {
						return 'lucide-icons';
					}
				}
			}
		}
	}
});
