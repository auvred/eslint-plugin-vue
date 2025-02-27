/**
 * @fileoverview enforce `v-for` directive's delimiter style
 * @author Flo Edelmann
 * @copyright 2020 Flo Edelmann. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'

const RuleTester = require('../../eslint-compat').RuleTester
const rule = require('../../../lib/rules/v-for-delimiter-style')

const tester = new RuleTester({
  languageOptions: { parser: require('vue-eslint-parser'), ecmaVersion: 2015 }
})

tester.run('v-for-delimiter-style', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: ''
    },
    {
      filename: 'test.vue',
      code: '<template><div v-for="x in xs"></div></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><div v-for="x    in xs"></div></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><div v-for="x in    xs"></div></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><div v-for="x    in    xs"></div></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><div v-for="x in xs"></div></template>',
      options: ['in']
    },
    {
      filename: 'test.vue',
      code: '<template><div v-for="x of xs"></div></template>',
      options: ['of']
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: '<template><div v-for="x of xs"></div></template>',
      output: '<template><div v-for="x in xs"></div></template>',
      errors: [
        {
          message: "Expected 'in' instead of 'of' in 'v-for'.",
          column: 23
        }
      ]
    },
    {
      filename: 'test.vue',
      code: '<template><div v-for="x    of xs"></div></template>',
      output: '<template><div v-for="x    in xs"></div></template>',
      errors: [
        {
          message: "Expected 'in' instead of 'of' in 'v-for'.",
          column: 23
        }
      ]
    },
    {
      filename: 'test.vue',
      code: '<template><div v-for="x of    xs"></div></template>',
      output: '<template><div v-for="x in    xs"></div></template>',
      errors: [
        {
          message: "Expected 'in' instead of 'of' in 'v-for'.",
          column: 23
        }
      ]
    },
    {
      filename: 'test.vue',
      code: '<template><div v-for="x    of    xs"></div></template>',
      output: '<template><div v-for="x    in    xs"></div></template>',
      errors: [
        {
          message: "Expected 'in' instead of 'of' in 'v-for'.",
          column: 23
        }
      ]
    },
    {
      filename: 'test.vue',
      code: '<template><div v-for="x of xs"></div></template>',
      output: '<template><div v-for="x in xs"></div></template>',
      options: ['in'],
      errors: [
        {
          message: "Expected 'in' instead of 'of' in 'v-for'.",
          column: 23
        }
      ]
    },
    {
      filename: 'test.vue',
      code: '<template><div v-for="x in xs"></div></template>',
      output: '<template><div v-for="x of xs"></div></template>',
      options: ['of'],
      errors: [
        {
          message: "Expected 'of' instead of 'in' in 'v-for'.",
          column: 23
        }
      ]
    }
  ]
})
