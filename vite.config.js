import { defineConfig } from 'vite';
import { resolve } from 'path';
import macrosPlugin from 'vite-plugin-babel-macros';

const srcPath = resolve('src');

// https://vitejs.dev/config/
export default defineConfig({
  root: srcPath,
  base: './',
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        jsx: 'react'
      }
    },
    jsxInject: `import {h,f} from '@youliso/granule'`,
    jsxFactory: 'h',
    jsxFragment: 'f'
  },
  resolve: {
    alias: {
      '@': srcPath
    }
  },
  plugins: [macrosPlugin()]
});
