module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-declaration-strict-value', 'stylelint-scss', 'stylelint-order'],
  rules: {
    'number-leading-zero': 'never',
    'at-rule-no-unknown': null,
    'color-named': 'never',
    'no-descending-specificity': null,

    'scale-unlimited/declaration-strict-value': [
      ['/color$/', 'font-family', 'fill', 'stroke'],
      {
        ignoreValues: ['inherit', 'transparent', 'none'],
      },
    ],

    'scss/at-rule-no-unknown': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/no-duplicate-dollar-variables': true,
    'scss/operator-no-unspaced': true,
    'scss/operator-no-newline-before': true,
    'scss/operator-no-newline-after': true,
    'scss/media-feature-value-dollar-variable': 'always',

    'order/order': [
      {
        type: 'at-rule',
        name: 'include',
      },
      'declarations',
      {
        type: 'at-rule',
        name: 'media',
      },
      'rules',
    ],
    'order/properties-alphabetical-order': true,
  },
};
