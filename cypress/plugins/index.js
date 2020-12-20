/// <reference types="cypress" />

// @ts-check
const { registerPlugin } = require('../../src')

module.exports = (on, config) => {
  registerPlugin(on, config)
}
