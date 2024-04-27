import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	esbuild: {
		supported: {
			'top-level-await': true
		}
	},
    plugins: [react(), TanStackRouterVite()],
});
