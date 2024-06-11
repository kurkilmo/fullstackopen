import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import { fixupConfigRules } from '@eslint/compat'
import stylistic from '@stylistic/eslint-plugin'
import vitestGlobals from './vitest-globals.js'

export default [
  { languageOptions: { globals: { ...globals.browser, ...vitestGlobals } } },
  pluginJs.configs.recommended,
  { files: ['**/*.jsx'], languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  ...fixupConfigRules(pluginReactConfig),

  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@stylistic/indent': [
        'error',
        2
      ],
      '@stylistic/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/quotes': [
        'error',
        'single'
      ],
      '@stylistic/semi': [
        'error',
        'never'
      ],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true }
      ],
      'no-unused-vars': ['error', {
        'varsIgnorePattern': '[iI]gnored',
        'argsIgnorePattern': '[iI]gnored',
        'caughtErrorsIgnorePattern': '^ignore'
      }],
      'react/prop-types': 0,
      'react/react-in-jsx-scope': 0
    }
  },
  pluginJs.configs.recommended,
  {
    ignores: ['dist']
  },
]