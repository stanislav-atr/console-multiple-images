/* eslint-disable no-mixed-operators, no-console, no-eval */
const normalizeImage = (height, width) => {
    const desiredWidth = 360;
    const factor = width / desiredWidth;
    return [height / factor, width / factor];
};

const makeImageStyles = (imageStorage) => {
    const scale = 0.1;

    // Normalize iamges to 360px width
    // [height, width] = normalizeImage(height, width);

    const imageStyles = imageStorage.map((image) => {
        let { src, height, width } = image;
        if (!height && !width) {
            const fallbackUrl = 'https://raw.githubusercontent.com/stanislav-atr/console-multiple-images/main/src/failed_to_load.svg';
            return `
            background: url(${fallbackUrl});
            padding: ${300 * scale}px ${300 * scale}px;
            background-size: ${300 * scale}px ${300 * scale}px;
            display: block !important;
            margin: 10px 0;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
        `;
        }
        // eslint-disable-next-line max-len
        return `
            background: url(${src});
            font-size: ${height * scale}px;
            padding: ${Math.floor(height * scale / 4)}px ${Math.floor(width * scale / 2)}px;
            background-size: 5000px ${height * scale}px;
            display: block !important;
            margin: 10px 0;
            background-repeat: no-repeat;
            background-position: center;
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

const consoleImages = (imagesInput, options = { firstN: false}) => {
    // Log all available images or first N images according to options
    const imagesQuantity = typeof options.firstN === 'number' ? options.firstN : imagesInput.length;

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
            const imageStyles = makeImageStyles(imageStorage);
            // Generate payload array
            const payloadArray = makePayloadArray(imageStyles, imagesQuantity);
            // Render in console
            console.log.apply(console, payloadArray);
        });
};

export default consoleImages;
