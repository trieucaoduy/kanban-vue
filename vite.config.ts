import path from "path"
import Component from "unplugin-vue-components/vite"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import RadixVueResolver from "radix-vue/resolver"

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Component({
      dts: true,
      resolvers: [RadixVueResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
