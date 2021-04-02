// @ts-check

// we probably want to copy "canonical" images when
// running on CI only, and not on every user's machine
const isCI = require('is-ci')
const fs = require('fs')
const path = require('path')
const debug = require('debug')('cypress-book')
const R = require('ramda')

/**
 * If the user sets the output folder as a name, then it is a folder
 * name from the root of the project. If the user uses relative path
 * in the folder name like "./images", then we the final output folder
 * is relative to the image name.
 *
 * @param {string} folderName The output folder name
 */
const isSaveFolderRelativeToImage = (folderName) => folderName.startsWith('.')

const getOutputImagePath = (options = {}) => {
  const { imageFolder, integrationFolder, specName, name } = options

  if (!imageFolder) {
    throw new Error('Missing the image folder')
  }

  const isRelativeToImage = isSaveFolderRelativeToImage(imageFolder)
  if (isRelativeToImage) {
    const fullSpecFolder = path.dirname(path.join(integrationFolder, specName))
    debug('spec folder %s', fullSpecFolder)
    const targetImagePath = path.join(
      fullSpecFolder,
      imageFolder,
      name + '.png',
    )
    return targetImagePath
  } else {
    const targetImagePath = path.join(imageFolder, name + '.png')
    return targetImagePath
  }
}

const makeFolder = (imagesFolder) => {
  try {
    fs.mkdirSync(imagesFolder, { recursive: true })
    debug('created folder "%s"', imagesFolder)
  } catch (e) {}
}

const copyImage = (options) => {
  debug('copy image options %o', options)

  return new Promise((resolve, reject) => {
    const tolerance = R.propOr(0.001, 'tolerance', options)

    const inputImagePath = options.inputImagePath || options.path
    if (!inputImagePath) {
      return reject(new Error('Missing input image path'))
    }
    const targetImagePath =
      options.outputFilename || getOutputImagePath(options)

    debug('target image path: %s', targetImagePath)
    if (!targetImagePath) {
      return reject(new Error('Could not compute target image folder'))
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
        return resolve({})
      }

      debug('checking image sizes before overwriting')
      if (typeof tolerance !== 'number') {
        return reject(
          new Error(
            `Expected tolerance to be a number, was ${tolerance} with type ${typeof tolerance}`,
          ),
        )
      }
      const capturedImageSize = fs.statSync(inputImagePath).size
      const targetImageSize = fs.statSync(targetImagePath).size

      const byteDifferenceRatio =
        Math.abs(capturedImageSize - targetImageSize) / targetImageSize

      debug(
        'captured image byte size %d at %s',
        capturedImageSize,
        inputImagePath,
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
        return resolve({})
      }
    }

    // fs.rename moves the file to the existing directory 'new/path/to'
    // and renames the image to 'screenshot.png'
    debug('renaming %s to %s', inputImagePath, targetImagePath)

    fs.rename(inputImagePath, targetImagePath, (err) => {
      if (err) {
        return reject(err)
      }

      // because we renamed and moved the image, resolve with the new path
      // so it is accurate in the test results
      resolve({ path: targetImagePath })
    })
  })
}

module.exports = { copyImage }
