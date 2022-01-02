import consoleImages from './src/consoleImages';

console.log('%cUserscript here!', 'color: lime;');

// Test as new prop
const win = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window; /* eslint-disable-line */
win.console.images = consoleImages;

// Test as func
const testUrls = [
    'https://cdnpt01.viewbug.com/media/mediafiles/2016/01/11/62182159_large1300.jpg',
    'https://cdn.pixabay.com/photo/2015/11/29/13/08/kingfisher-1068684_1280.jpg',
    'noImage',
    'https://cdn.pixabay.com/photo/2019/02/06/17/09/snake-3979601_1280.jpg',
    'https://cdn.pixabay.com/photo/2020/02/15/12/39/green-tree-snake-4850878_1280.jpg',
    //'https://static.abcteach.com/free_preview/b/bird02lowres_p.png',
];
consoleImages(testUrls, { firstN: 56, normalize: 360, log: true});