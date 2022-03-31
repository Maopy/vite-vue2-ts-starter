import eslintPlugin from '@modyqyw/vite-plugin-eslint';
import { defineConfig, type UserConfig } from 'vite';
import stylelintPlugin from 'vite-plugin-stylelint';
import { createVuePlugin } from 'vite-plugin-vue2';
import path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
const config: UserConfig = {
  // https://vitejs.dev/config/#base
  base: '/',
  // Resolver
  resolve: {
    // https://vitejs.dev/config/#resolve-alias
    alias: [
      {
        // vue @ shortcut fix
        find: '@/',
        replacement: `${path.resolve(__dirname, './src')}/`,
      },
      {
        find: 'src/',
        replacement: `${path.resolve(__dirname, './src')}/`,
      },
    ],
  },
  // https://vitejs.dev/config/#server-options
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  plugins: [
    // Vue2
    // https://github.com/underfin/vite-plugin-vue2
    createVuePlugin({
      target: 'esnext',
    }),
    // eslint
    // https://github.com/ModyQyW/vite-plugin-eslint
    eslintPlugin({
      // fix: true,
      // include: '**/*.{js,jsx,ts,tsx,vue,json,yml,yaml,htm,html}',
    }),
    // Stylelint
    // https://github.com/gxmari007/vite-plugin-eslint
    stylelintPlugin({
      fix: true,
    }),
    // compress assets
    // https://github.com/vbenjs/vite-plugin-compression
    // viteCompression(),
  ],
  // Build Options
  // https://vitejs.dev/config/#build-options
  build: {
    rollupOptions: {
      output: {
        plugins: [
          /*
          // if you use Code encryption by rollup-plugin-obfuscator
          // https://github.com/getkey/rollup-plugin-obfuscator
          obfuscator({
            globalOptions: {
              debugProtection: true,
            },
          }),
          */
        ],
      },
    },
    target: 'es2021',
    /*
    // Minify option
    // https://vitejs.dev/config/#build-minify
    minify: 'terser',
    terserOptions: {
      ecma: 2020,
      parse: {},
      compress: { drop_console: true },
      mangle: true, // Note `mangle.properties` is `false` by default.
      module: true,
      output: { comments: true, beautify: false },
    },
    */
  },
};

// Export vite config
export default defineConfig(async ({ command }): Promise<UserConfig> => {
  // Hook production build.
  // if (command === 'build') {
  // Write meta data.
  fs.writeFileSync(
    path.resolve(path.join(__dirname, 'src/Meta.ts')),
    `import type MetaInterface from '@/interfaces/MetaInterface';

// This file is auto-generated by the build system.
const meta: MetaInterface = {
  version: '${require('./package.json').version}',
  date: '${new Date().toISOString()}',
};
export default meta;
`
  );
  // }

  return config;
});
