import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

export default defineConfig(({command}) => {
	return {
		base: command === 'serve' ? '' : '/dist/',
		build: {
			emptyOutDir: true,
			manifest: true,
			outDir: './src/dist',
			rollupOptions: {
				input: {
					main: 'src/main.js'
				},
				output: {
					sourcemap: true
				},
			}
		},
		plugins: [
			svelte({
				preprocess: sveltePreprocess()
			})
		],
		server: {
			fs: {
				strict: false
			},
			host: '0.0.0.0',
			origin: 'http://localhost:' + 3001,
			port: 3001,
			strictPort: true,
		}
	};
});