module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/typescript/recommended'],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    // -- vue essential
    'vue/no-deprecated-slot-attribute': 'off', // - clashes with ionic slots

    // -- vue strongly recommended
    'vue/component-definition-name-casing': ['warn', 'PascalCase'], // - match component file name
    'vue/no-multi-spaces': 'warn', // - readability
    'vue/no-spaces-around-equal-signs-in-attribute': 'warn', // - readability
    'vue/no-template-shadow': 'warn', // - prevent variable shadowing in v-for
    'vue/one-component-per-file': 'error',
    'vue/prop-name-casing': 'error', // - enforce proper casing (camelCase)
    'vue/require-prop-types': 'warn', // - props should at least have a type
    'vue/v-bind-style': ['warn', 'shorthand'], // - use :name over v-bind:name
    'vue/v-on-style': ['warn', 'shorthand'], // - use @name over v-on:name
    'vue/require-explicit-emits': 'warn', // - provides self documenting code

    // -- vue recommended
    'vue/attributes-order': 'warn', // - readability
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style:not([scoped])', 'style[scoped]']
      }
    ],
    'vue/no-lone-template': 'warn', // - prevent redundant templates
    'vue/no-v-html': 'error', // - reduce risk of XSS attacks
    'vue/order-in-components': 'error', // - readability
    'vue/this-in-template': 'error', // - readability

    // -- vue extension rules
    'vue/no-constant-condition': 'warn', // - prevent redundant conditions

    // -- typescript
    '@typescript-eslint/no-explicit-any': 'off', // - default for ionic

    // -- eslint
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-var': 'warn', // - use variables with block scope over function scope
    'prefer-const': 'warn', // - better unchanging variable declaration
    indent: ['warn', 2, { SwitchCase: 1 }],
    eqeqeq: ['error', 'smart'], // - enforce '===',' unless special '== undefined | null' check
    'object-shorthand': ['warn', 'properties'] // - readability - shorter object declarations
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ],
  globals: {
    // globals used for vue script setup
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly'
  }
};
