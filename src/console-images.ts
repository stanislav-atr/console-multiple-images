import { makeImageStyles, makePayloadArray } from './tools'; // eslint-disable-line import/no-import-module-exports

type Options = {
    scale?: number,
    normalize?: number,
    firstN?: number,
    log?: boolean,
};

const consoleImages = (imagesInput: string[], {
    scale,
    normalize,
    firstN,
    log,
}: Options = {}): void => {
    // Log all given images or first N images available according to options
    let imagesQuantity = imagesInput.length;
    if (typeof firstN === 'number' && firstN >= 0 && firstN <= imagesInput.length) {
        imagesQuantity = firstN;
    }

    // Populate storage with image objects
    const urls = imagesInput.slice(0, imagesQuantity);
    const imageStorage: HTMLImageElement[] = [];
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
            console.log(...payloadArray); // eslint-disable-line no-console
        });
};

exports.consoleImages = consoleImages;
