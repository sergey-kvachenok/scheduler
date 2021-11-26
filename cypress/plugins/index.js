// import * as register from '@babel/register';

// register({
//   presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
//   only: [/fp-ts/, /io-ts/, /monocle-ts/, /io-ts-types/],
// });
// const { getCombinedData } = require('../../src/helpers');
// const axios = require('../../src/utils/axios');
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // on('before:run', async (browser = {}, options) => {
  //   const requests = [axios.get('/slots.json'), axios.get('/workers.json'), axios.get('/available-workers.json')];
  //   try {
  //     const [{ data: slotsData }, { data: workersData }, { data: availableData }] = await Promise.all(requests);
  //     const available = availableData['available-workers'] || {};
  //     const { workers } = workersData || {};
  //     const { slots } = slotsData || {};
  //     const combined = getCombinedData(available, slots, workers);
  //     console.log(combined);
  //     return options;
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   // `on` is used to hook into various events Cypress emits
  //   // `config` is the resolved Cypress config
  // });
};
