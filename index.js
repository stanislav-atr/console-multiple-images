import consoleImages from './src/consoleImages';

console.log('%cUserscript here!', 'color: lime;');

// Test as new prop
const win = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window; /* eslint-disable-line */
win.console.images = consoleImages;

// Test as func
const testUrls = [
    'https://cdnpt01.viewbug.com/media/mediafiles/2016/01/11/62182159_large1300.jpg',
    'https://en.wikipedia.org/wiki/Boiga_cyanea#/media/File:B._cyanea_near_Gorumara_National_Park.jpg',
];
consoleImages(testUrls);