import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/solid-start/plugin/vite'

export default defineConfig({
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart(),
  ],
})
