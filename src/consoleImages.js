/* eslint-disable no-mixed-operators, no-console, no-eval */
const normalizeImage = (height, width) => {
    const desiredWidth = 360;
    const factor = width / desiredWidth;
    return [height / factor, width / factor];
};

const makeImageStyles = (imageStorage, scale) => {
    const imageStyles = imageStorage.map((image) => {
        let { src, height, width } = image;

        // Normalize images to 360px width
        //[height, width] = normalizeImage(height, width);

        if (!height && !width) {
            const fallbackUrl = 'https://raw.githubusercontent.com/stanislav-atr/console-multiple-images/main/src/failed_to_load.svg';
            return `
            background: url(${fallbackUrl});
            padding: ${50 * scale}px ${50 * scale}px;
            display: block !important;
            margin: 5px 5px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            border: 1px solid red;
        `;
        }
        return `
            background: url(${src});
            font-size: ${scale}px;
            padding: ${height * scale / 4}px ${width * scale / 4}px;
            margin: 5px 5px;
            background-repeat: no-repeat;
            border: 1px solid red;
            background-size: contain;
        `;
    });
    return imageStyles;
};

const makePayloadArray = (imageStyles, imagesQuantity) => {
    let payloadArray = [];
    let formatString = '';
    const directive = '%c ';

    // Generate directive string according to images quantity
    for (let i = 0; i < imagesQuantity; i++) {
        formatString = formatString.concat(directive);
    }
    payloadArray.push(formatString);

    // Populate payloadArray with images' styles
    for (let i = 0; i < imagesQuantity; i++) {
        payloadArray.push(imageStyles[i]);
    }

    return payloadArray;
};

const consoleImages = (imagesInput, { firstN = false, scale = 1, } = options) => {
    // Log all available images or first N images according to options
    const imagesQuantity = typeof firstN === 'number' ? firstN : imagesInput.length;

    // Populate storage with image objects
    const urls = imagesInput.slice(0, imagesQuantity);
    let imageStorage = [];
    for (const url of urls) {
        const image = new Image();
        image.src = url;
        imageStorage.push(image);
    }

    // Wait for all images to load
    Promise.all(imageStorage
        .filter(image => !image.complete)
        .map(image => {
            return new Promise(resolve => {
                // Ignore images that failed to load
                image.onload = image.onerror = resolve;
            })
        }))
        .then(() => {
            // Generate array of images' styles
            const imageStyles = makeImageStyles(imageStorage, scale);
            // Generate payload array
            const payloadArray = makePayloadArray(imageStyles, imagesQuantity);
            // Render in console
            console.log.apply(console, payloadArray);
        });
};

export default consoleImages;
