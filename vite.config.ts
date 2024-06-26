import { defineConfig, loadEnv } from 'vite'
import { readFileSync } from 'fs';
import { join } from 'path';
import type { UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";


// npm run dev = local
// npm run build = local
// dfx deploy = local
// dfx deploy --network ic = ic
const network = process.env.DFX_NETWORK ?? 'local';
const host = network === 'local' ? 'http://localhost:8000' : 'https://ic0.app';

const readCanisterIds = ({ prefix }: { prefix?: string }): Record<string, string> => {
	const canisterIdsJsonFile =
		network === 'ic'
			? join(process.cwd(), 'canister_ids.json')
			: join(process.cwd(), '.dfx', 'local', 'canister_ids.json');

	try {
		type Details = {
			ic?: string;
			local?: string;
		};

		const config: Record<string, Details> = JSON.parse(readFileSync(canisterIdsJsonFile, 'utf-8'));

		return Object.entries(config).reduce((acc, current: [string, Details]) => {
			const [canisterName, canisterDetails] = current;

			return {
				...acc,
				[`${prefix ?? ''}CANISTER_ID_${canisterName.toUpperCase()}`]:
					canisterDetails[network as keyof Details]
			};
		}, {});
	} catch (e) {
		throw Error(`Could not get canister ID from ${canisterIdsJsonFile}: ${e}`);
	}
};

// const config: UserConfig = {
// 	plugins: [react()],
// 	build: {
// 		target: 'es2020',
// 		rollupOptions: {
// 			// Polyfill Buffer for production build
// 			plugins: [
// 				inject({
// 					modules: { Buffer: ['buffer', 'Buffer'] }
// 				})
// 			]
// 		}
// 	},
// 	optimizeDeps: {
// 		esbuildOptions: {
// 			// Node.js global to browser globalThis
// 			define: {
// 				global: 'globalThis'
// 			}
// 		}
// 	}
// };

export default defineConfig(({ mode }: UserConfig): UserConfig => {
	// Expand environment - .env files - with canister IDs
	process.env = {
		...process.env,
		...loadEnv(mode ?? 'development', process.cwd()),
		...readCanisterIds({ prefix: 'VITE_' }),
		VITE_DFX_NETWORK: network,
		VITE_HOST: host
	};

	return {
		esbuild: {
			supported: {
				'top-level-await': true
			}
		},
		plugins: [react(), TanStackRouterVite()],
		// Backwards compatibility for auto generated types of dfx that are meant for webpack and process.env
		define: {
			'process.env': {
				...readCanisterIds({}),
				DFX_NETWORK: network
			}
		}
	};
})