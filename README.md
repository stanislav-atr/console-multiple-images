## About
Display images in browser console by an array of URLs.
## Install
 - import module and resolve dependency with a tool like [Browserify](https://browserify.org/),  
   ```npm i console-multiple-images```  
   ```import { consoleImages } from 'console-multiple-images';```
   
 - use [source code](https://raw.githubusercontent.com/stanislav-atr/console-multiple-images/main/src/consoleImages.js).
## Usage
```
consoleImages(inputArray, options);
```
 - ```inputArray``` – array of strings, containing URLs to images to be printed.

 - ```options``` – options object, see below.
#### Options
 - ```normalize``` – defaults to ```false```; pass positive px value to normalize images to (**by with**), keeping aspect ratio.
 
 - ```scale``` – defaults to ```1```; positive number, representing the factor to scale images to.

 - ```log``` – defaults to ```false```; pass true to log images' original dimensions.

 - ```firstN``` – defaults to input array length; positive whole number, describing how many images from input array should be logged.

```
consoleImages(['url1', 'url2', 'url3'], {
  normalize: 360,  // normalize all images to 360px width, keeping aspect ratio
  scale: 0.5,      // make printed images two times smaller
  log: true,       // on every image printed display it's original dimensions
  firstN: 2,       // only print first two images (from url1 & url2)
});
```
