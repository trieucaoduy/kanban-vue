// import { fileURLToPath, URL } from 'node:url'
import path from "path"
import Component from 'unplugin-vue-components/vite'
import RadixVueResolver from 'radix-vue/resolver'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Component({
      dts: true,
      resolvers: [
        RadixVueResolver()

        // RadixVueResolver({
        //   prefix: '' // use the prefix option to add Prefix to the imported components
        // })
      ],
    }),
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      "@": path.resolve(__dirname, "./src"),
    }
  }
})
