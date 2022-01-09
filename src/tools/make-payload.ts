export const makePayloadArray = (imageStyles: string[], imageStorage: HTMLImageElement[], log?: boolean): string[] => { // eslint-disable-line max-len
    const payloadArray: string[] = [];
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
