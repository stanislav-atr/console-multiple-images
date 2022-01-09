const normalizeImage = (height: number, width: number, normalize?: number): number[] => {
    // Don't modify the image if no param is present
    if (typeof normalize !== 'number' || normalize <= 0) {
        return [height, width];
    }
    const newWidth = normalize;
    // Set width to the desired value keeping image's aspect ratio
    const factor = width / newWidth;
    return [height / factor, width / factor];
};

export const makeImageStyles = (imageStorage: HTMLImageElement[], scale?: number, normalize?: number) => { // eslint-disable-line max-len
    const imageStyles = imageStorage.map((image) => {
        const { src } = image;
        let { height, width } = image;
        const factor = typeof scale !== 'number' || scale <= 0 ? 1 : scale;

        // Normalize images to 360px width
        [height, width] = normalizeImage(height, width, normalize);

        if (!height && !width) {
            const fallbackUrl = 'https://raw.githubusercontent.com/stanislav-atr/console-multiple-images/main/assets/fallback.svg';
            return `background: url(${fallbackUrl});padding: ${50 * factor}px ${50 * factor}px;display: block !important;margin: 5px 5px;background-repeat: no-repeat;background-position: center;background-size: contain;border: 1px solid #e15c64;`;
        }
        return `background: url(${src});padding: ${(height * factor) / 4}px ${(width * factor) / 4}px;margin: 5px 5px;background-repeat: no-repeat;background-size: 100%;font-weight: bold;color: red;`;
    });
    return imageStyles;
};
