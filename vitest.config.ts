import { fileURLToPath, URL } from 'node:url'

import { configDefaults, defineConfig, mergeConfig, UserConfig } from 'vitest/config'
import viteConfig from './vite.config'

/**
 * Vitest Configure
 *
 * @see {@link https://vitest.dev/config/}
 */
export default mergeConfig(
  (viteConfig as UserConfig),
  defineConfig({
    test: {
      // https://vitest.dev/guide/#configuring-vitest
      environment: 'jsdom',
      globals: true,
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url))
    },
  })
)
