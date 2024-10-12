import pluginHtml from 'eslint-plugin-html'
import pluginImport from 'eslint-plugin-import'
import pluginNode from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'
import pluginTsDoc from 'eslint-plugin-tsdoc'
import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import pluginVitest from '@vitest/eslint-plugin'
// import pluginPlaywright from 'eslint-plugin-playwright'
import neostandard from 'neostandard'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  ...neostandard(),

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  {
    name: 'app/rules',
    rules: {
      'no-unused-vars': 'off',
    },
  },

  {
    name: 'tsdoc',
    plugins: {
      tsdoc: pluginTsDoc,
    },
    rules: {
      'tsdoc/syntax': 'warn',
    },
  },

  pluginPromise.configs['flat/recommended'],
  pluginNode.configs['flat/recommended-script'],
  pluginImport.flatConfigs.recommended,

  {
    files: ['**/*.html'],
    plugins: {
      html: pluginHtml,
    }
  },

  // {
  //   ...pluginPlaywright.configs['flat/recommended'],
  //   files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  // },
]
