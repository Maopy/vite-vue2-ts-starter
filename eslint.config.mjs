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
  pluginPromise.configs['flat/recommended'],
  pluginNode.configs['flat/recommended-script'],

  {
    plugins: {
      import: pluginImport,
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
        'vue-eslint-parser': ['.vue'],
      },
      'import/resolver': {
        typescript: true,
        node: true,
        alias: {
          map: [
            ['@', './src'],
            ['~', './node_modules'],
          ],
          extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue'],
        },
      },
      vite: {
        configPath: './vite.config.ts',
      },
    },
  },

  pluginImport.flatConfigs.recommended,

  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {
      'require-jsdoc': 'warn',
      'no-unused-vars': 'warn',
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/consistent-generic-constructors': ['error', 'type-annotation'],
      '@typescript-eslint/consistent-type-imports': ['off', { prefer: 'type-imports' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      'import/default': 'off',
      'import/no-default-export': 'off',
      'import/order': ['error', {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '{vue,vue-router,vuex,@/stores,vue-i18n,pinia,vite,vitest,vitest/**,@vitejs/**,@vue/**,@logue/vue2-helpers}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '{@/**}',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
        },
        newlinesBetween: 'always',
      }],
      'tsdoc/syntax': 'warn',
      'vue/html-self-closing': ['error', {
        html: {
          void: 'always'
        }
      }],
      'vue/multi-word-component-names': 'warn'
    }
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
    name: 'tsdoc',
    plugins: {
      tsdoc: pluginTsDoc,
    },
    rules: {
      'tsdoc/syntax': 'warn',
    },
  },

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
