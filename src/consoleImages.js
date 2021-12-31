/* eslint-disable no-mixed-operators, no-console, no-eval */
const normalizePhoto = (height, width) => {
    const desiredWidth = 360;
    const factor = width / desiredWidth;
    return [height / factor, width / factor];
};

const makeImageStyles = (photoUrls, initImage) => {
    const scale = 0.2;
    // Normalize photos to 360px width
    let { height, width } = initImage;
    [height, width] = normalizePhoto(height, width);

    const imageStyles = photoUrls.map((url) => {
        // eslint-disable-next-line max-len
        return `background: url(${url}); font-size: ${height * scale}px; padding: ${Math.floor(height * scale / 4)}px ${Math.floor(width * scale / 2)}px; background-size: ${width * scale}px ${height * scale}px; display: block !important; margin: 10px 0; background-repeat: no-repeat; background-position: center; background-size: contain;`;
    });
    return imageStyles;
};

const makePayloadString = (photoUrls, imageStyles) => {
    // Log all available photos but no more than 6 (to avoid line breaks, see scale)
    const photosQuantity = photoUrls.length > 6 ? 6 : photoUrls.length;

    // Result e.g: "%c "+"%c "+"%c "
    let payloadFirstHalf = '"%c "';
    for (let i = 0; i < photosQuantity - 1; i += 1) {
        payloadFirstHalf = payloadFirstHalf.concat('+"%c "');
    }

    // Result e.g: ,"imgStyleStr0","imgStyleStr1","imgStyleStr2"
    let payloadSecondHalf = '';
    for (let i = 0; i < photosQuantity; i += 1) {
        payloadSecondHalf = payloadSecondHalf.concat(`, "${imageStyles[i]}"`); // Test this!
    }

    // Result e.g: console.log("%c " + "%c " + "%c ", "imgStyleStr0","imgStyleStr1","imgStyleStr2");
    const renderingString = `console.log(${payloadFirstHalf + payloadSecondHalf});`;
    return renderingString;
};

const consoleImages = (photoUrls) => {
    const initImage = new Image();

    initImage.onload = () => {
        // Generate array of images' styles
        const imageStyles = makeImageStyles(photoUrls, initImage);
        // Generate rendering string for future eval() call
        const renderingString = makePayloadString(photoUrls, imageStyles);
        // Render in console
        eval(renderingString);
    };

    // Get the first photo as initializator for others to render
    [initImage.src] = photoUrls;
};

export default consoleImages;
