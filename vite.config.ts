import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), vueJsx()],
	resolve: {
		alias: [
			// @/xxxx => src/xxxx
			{
				find: '@',
				replacement: pathResolve('src') + '/',
			},
		],
	},
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
			},
		},
	},
})

function pathResolve(dir: string) {
	return resolve(process.cwd(), '.', dir)
}
