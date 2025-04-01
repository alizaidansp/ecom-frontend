import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
	plugins: [sveltekit(), tailwindcss(),],
	build: {
		outDir: 'build'  // Ensure correct output directory
	  }
});
