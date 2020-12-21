const fs = require('fs')
const path = require('path')
const debug = require('debug')('cypress-book')

// we probably want to copy "canonical" images when
// running on CI only, and not on every user's machine
const isCI = require('is-ci')

/**
 * If the user sets the output folder as a name, then it is a folder
 * name from the root of the project. If the user uses relative path
 * in the folder name like "./images", then we the final output folder
 * is relative to the image name.
 *
 * @param {string} folderName The output folder name
 */
const isSaveFolderRelativeToImage = (folderName) => folderName.startsWith('.')

const getOutputImagePath = (config, screenshotDetails) => {
  let imagesFolder = 'images'
  if (
    config.env &&
    config.env['cypress-book'] &&
    config.env['cypress-book'].imageFolder
  ) {
    imagesFolder = config.env['cypress-book'].imageFolder
  }
  const isRelativeToImage = isSaveFolderRelativeToImage(imagesFolder)
  if (isRelativeToImage) {
    const fullSpecFolder = path.dirname(
      path.join(config.integrationFolder, screenshotDetails.specName),
    )
    debug('spec folder %s', fullSpecFolder)
    const targetImagePath = path.join(
      fullSpecFolder,
      imagesFolder,
      screenshotDetails.name + '.png',
    )
    return targetImagePath
  } else {
    const targetImagePath = path.join(
      imagesFolder,
      screenshotDetails.name + '.png',
    )
    return targetImagePath
  }
}

const makeFolder = (imagesFolder) => {
  try {
    fs.mkdirSync(imagesFolder, { recursive: true })
    debug('created folder %s', imagesFolder)
  } catch (e) {}
}

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

    const targetImagePath = getOutputImagePath(config, details)
    debug('target image path: %s', targetImagePath)
    if (!targetImagePath) {
      throw new Error('Could not compute target image folder')
    }
    // create the destination folder if does not exist yet
    makeFolder(path.dirname(targetImagePath))

    // here is a good change to modify the image:
    // add watermarks, text. Maybe even upload the image
    // to an external host rather than keep it in the repo

    // we could also only copy images on CI or for
    // each OS platform separately
    // for example, we might want to copy the image
    // on the user's machine the first time, but not replace an
    // existing screenshot. If you do want to replace the
    // screenshot locally - delete the file from
    // the "images" folder and run the test
    if (fs.existsSync(targetImagePath)) {
      if (!isCI) {
        console.log('skipping overwriting existing image %s', targetImagePath)
        return
      }

      debug('checking image sizes before overwriting')
      const capturedImageSize = fs.statSync(details.path).size
      const targetImageSize = fs.statSync(targetImagePath).size
      const tolerance = 0.001 // 0.1% percent in byte size
      const byteDifferenceRatio =
        Math.abs(capturedImageSize - targetImageSize) / targetImageSize

      debug(
        'captured image byte size %d at %s',
        capturedImageSize,
        details.path,
      )
      debug(
        'existing image byte size %d at %s',
        targetImageSize,
        targetImagePath,
      )
      debug(
        'byte difference ratio %d tolerance %d',
        byteDifferenceRatio,
        tolerance,
      )

      if (byteDifferenceRatio < tolerance) {
        console.log(
          'new image size is within %d%% of the existing image in byte size',
          tolerance * 100,
        )
        console.log('skipping overwriting existing image %s', targetImagePath)
        return
      }
    }

    return new Promise((resolve, reject) => {
      // fs.rename moves the file to the existing directory 'new/path/to'
      // and renames the image to 'screenshot.png'
      debug('renaming %s to %s', details.path, targetImagePath)

      fs.rename(details.path, targetImagePath, (err) => {
        if (err) return reject(err)

        // because we renamed and moved the image, resolve with the new path
        // so it is accurate in the test results
        resolve({ path: targetImagePath })
      })
    })
  })
}

module.exports = { registerPlugin }
