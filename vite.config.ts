import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/fonts',
          dest: 'assets',
        },
        {
          src: 'src/assets/img',
          dest: 'assets',
        },
      ],
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true
    }
  },
  build: {
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  css: {
    modules: {
      generateScopedName: '[local]_[hash:base64:5]',
      localsConvention: (originalClassName: string) => {
        return originalClassName.replace(/--(\w)/g, (match, firstLetter) => firstLetter.toUpperCase());
      },
    },
  },
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
    'window.setImmediate': '(fn, ...args) => setTimeout(fn, 0, ...args)',
  },
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: resolve(__dirname, './src/shared/components'),
      },
      {
        find: '@src',
        replacement: resolve(__dirname, './src'),
      },
      {
        find: '@store',
        replacement: resolve(__dirname, './src/store'),
      },
      {
        find: '@modules',
        replacement: resolve(__dirname, './src/modules'),
      },
      {
        find: '@styles',
        replacement: resolve(__dirname, './src/shared/styles'),
      },
      {
        find: '@type',
        replacement: resolve(__dirname, './src/shared/types'),
      },
      {
        find: '@pages',
        replacement: resolve(__dirname, './src/pages'),
      },
      {
        find: '@shared',
        replacement: resolve(__dirname, './src/shared'),
      },
    ],
  },
});
