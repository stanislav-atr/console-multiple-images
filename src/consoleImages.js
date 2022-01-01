/* eslint-disable no-mixed-operators, no-console, no-eval */
const normalizePhoto = (height, width) => {
    const desiredWidth = 360;
    const factor = width / desiredWidth;
    return [height / factor, width / factor];
};

const makeImageStyles = (photoUrls, initImage) => {
    const scale = 0.3;
    // Normalize photos to 360px width
    let { height, width } = initImage;
    [height, width] = normalizePhoto(height, width);
    //console.log(`${height}, ${width}`);
    
    const imageStyles = photoUrls.map((url) => {
        // eslint-disable-next-line max-len
        return `background: url(${url}); font-size: ${height * scale}px; padding: ${Math.floor(height * scale / 4)}px ${Math.floor(width * scale / 2)}px; background-size: ${width * scale}px ${height * scale}px; display: block !important; margin: 10px 0; background-repeat: no-repeat; background-position: center; background-size: contain;`;
    });
    return imageStyles;
};

const makePayloadArray = (imageStyles) => {
    // Log all available photos but no more than 6 (to avoid line breaks, see scale)
    // const photosQuantity = photoUrls.length > 6 ? 6 : photoUrls.length;
    const photosQuantity = imageStyles.length;

    let payloadArray = [];
    let formatString = '';
    const directive = '%c ';

    // Generate directive string according to photos quantity
    for (let i = 0; i < photosQuantity; i++) {
        formatString = formatString.concat(directive);
    }
    payloadArray.push(formatString);

    // Populate payloadArray with images' styles
    for (let i = 0; i < photosQuantity; i++) {
        payloadArray.push(imageStyles[i]);
    }

    return payloadArray;
};

const consoleImages = (imageUrls) => {
    const initImage = new Image();

    initImage.onload = () => {
        // Generate array of images' styles
        const imageStyles = makeImageStyles(imageUrls, initImage);
        // Generate payload array
        const payloadArray = makePayloadArray(imageStyles);
        // Render in console
        console.log.apply(console, payloadArray);
    };

    // Get the first photo as initializator for others to render
    [initImage.src] = imageUrls;
};

export default consoleImages;
