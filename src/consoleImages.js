/* eslint-disable no-mixed-operators, no-console */

/**
 * Print images in console by given URLs with given options.
 * @param {number} height - original height of an image.
 * @param {number} width - original width of an image.
 * @param {boolean|number} normalize - width value in pixels to normalize images to.
 */
const normalizeImage = (height, width, normalize) => {
    // Don't modify the image if no param is present
    if (typeof normalize !== 'number') {
        return [height, width];
    }
    const newWidth = normalize;
    // Set width to the desired value keeping image's aspect ratio
    const factor = width / newWidth;
    return [height / factor, width / factor];
};

/**
 * Print images in console by given URLs with given options.
 * @param {object} imageStorage - object containing Image instances.
 * @param {number} scale - scale factor, defaults to 1.
 * @param {boolean|number} normalize - width value in pixels to normalize images to.
 */
const makeImageStyles = (imageStorage, scale, normalize) => {
    const imageStyles = imageStorage.map((image) => {
        const { src } = image;
        let { height, width } = image;

        // Normalize images to 360px width
        [height, width] = normalizeImage(height, width, normalize);

        if (!height && !width) {
            const fallbackUrl = 'https://raw.githubusercontent.com/stanislav-atr/console-multiple-images/main/assets/fallback.svg';
            return `
            background: url(${fallbackUrl});
            padding: ${50 * scale}px ${50 * scale}px;
            display: block !important;
            margin: 5px 5px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            border: 1px solid #e15c64;
        `;
        }
        return `
            background: url(${src});
            padding: ${height * scale / 4}px ${width * scale / 4}px;
            margin: 5px 5px;
            background-repeat: no-repeat;
            background-size: 100%;
            font-weight: bold;
            color: red;
        `;
    });
    return imageStyles;
};

/**
 * Print images in console by given URLs with given options.
 * @param {array} imageStyles - array of strings containing images' styles.
 * @param {object} imageStorage - object containing Image instances.
 * @param {boolean} log - boolean for logging images' dimensions, defaults to false.
 */
const makePayloadArray = (imageStyles, imageStorage, log) => {
    const payloadArray = [];
    let formatString = '';

    // Generate directive string according to images quantity
    for (let i = 0; i < imageStorage.length; i += 1) {
        let directive = '%c ';

        const { height, width } = imageStorage[i];
        if (log && height && width) {
            directive = `%c${height}x${width}`;
        }

        formatString = formatString.concat(directive);
    }
    payloadArray.push(formatString);

    // Populate payloadArray with images' styles
    for (let i = 0; i < imageStorage.length; i += 1) {
        payloadArray.push(imageStyles[i]);
    }

    return payloadArray;
};

/**
 * Print images in console by given URLs with given options.
 * @param {array} imagesInput - array of strings containing images' URLs.
 * @param {object} options - object, representing render options.
 */
const consoleImages = (imagesInput, { firstN = false, scale = 1, normalize = false, log = false } = {}) => { // eslint-disable-line max-len, object-curly-newline
    // Log all given images or first N images available according to options
    let imagesQuantity = imagesInput.length;
    if (typeof firstN === 'number' && firstN <= imagesInput.length) {
        imagesQuantity = firstN;
    }

    // Populate storage with image objects
    const urls = imagesInput.slice(0, imagesQuantity);
    const imageStorage = [];
    for (const url of urls) {
        const image = new Image();
        image.src = url;
        imageStorage.push(image);
    }

    // Wait for all images to load
    Promise.all(imageStorage
        .filter((image) => !image.complete)
        .map((image) => {
            return new Promise((resolve) => {
                image.onload = resolve;
                // Ignore images that failed to load
                image.onerror = resolve;
            });
        }))
        .then(() => {
            // Generate array of images' styles
            const imageStyles = makeImageStyles(imageStorage, scale, normalize);
            // Generate payload array
            const payloadArray = makePayloadArray(imageStyles, imageStorage, log);
            // Render in console
            console.log(...payloadArray);
        });
};

export default consoleImages;
