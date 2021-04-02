#!/usr/bin/env node

'use strict'

const debug = require('debug')('cypress-book')
const arg = require('arg')
const args = arg({
  '--screenshot': String,
  '--output': String,

  // aliases
  '-s': '--screenshot',
  '-o': '--output',
})

debug('input arguments %o', args)
