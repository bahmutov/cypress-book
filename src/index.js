// @ts-check

// https://ramdajs.com/docs/
const R = require('ramda')
const { copyImage } = require('./copy-image')

const registerPlugin = (on, config) => {
  // modify saved screenshots using
  // https://on.cypress.io/after-screenshot-api
  on('after:screenshot', (details) => {
    console.log(details) // print all details to terminal

    if (details.testFailure) {
      // skip screenshots taken on failure
      return
    }
    if (!details.name) {
      console.error('Cannot copy screenshot - it is missing a name!')
      return
    }

    const excludeImages = R.pathOr(
      [],
      ['env', 'cypress-book', 'excludeImages'],
    )(config)
    if (excludeImages.includes(details.name)) {
      console.log('skipping copying excluded screenshot %s', details.name)
      return
    }

    const getImageFolderName = R.pathOr('images', [
      'env',
      'cypress-book',
      'imageFolder',
    ])
    const getTolerance = R.pathOr(0.001, ['env', 'cypress-book', 'tolerance'])

    const options = {
      imageFolder: getImageFolderName(config),
      integrationFolder: config.integrationFolder,
      specName: details.specName,
      name: details.name,
      path: details.path,
      tolerance: getTolerance(config),
    }

    return copyImage(options)
  })
}

module.exports = { registerPlugin }
