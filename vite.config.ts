import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import {  resolve, basename } from 'path';
import { patchCssModules } from 'vite-css-modules'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    patchCssModules(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/fonts',
          dest: 'assets'
        },
        {
          src: 'src/assets/img',
          dest: 'assets'
        }
      ]
    })
  ],
	css: {
		modules: {
			generateScopedName: '[local]_[hash:base64:5]',
			localsConvention: (originalClassName: string,
			                   generatedClassName: string,
			                   inputFile: string) => {
				return originalClassName.replace(/--(\w)/g, (match, firstLetter) => firstLetter.toUpperCase());;
			},
		}
	},
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: resolve(__dirname, "./src/shared/components")
      },
      {
        find: "@src",
        replacement: resolve(__dirname, "./src")
      },
      {
        find: "@store",
        replacement: resolve(__dirname, "./src/store")
      },
      {
        find: "@modules",
        replacement: resolve(__dirname, "./src/modules")
      },
      {
        find: "@styles",
        replacement: resolve(__dirname, "./src/shared/styles")
      },
      {
        find: "@type",
        replacement: resolve(__dirname, "./src/shared/types")
      },
      {
        find: "@pages",
        replacement: resolve(__dirname, "./src/pages")
      },
      {
        find: "@shared",
        replacement: resolve(__dirname, "./src/shared")
      }
    ]
  }
})
