import clear from 'rollup-plugin-clear';
import cleanup from 'rollup-plugin-cleanup';
import { terser } from "rollup-plugin-terser";

export default {
    input: './src/consoleImages.js',
    output: {
        file: './dist/console.multiple.images.min.js',
        format: 'cjs'
    },
    plugins: [
        // Clean dist directory before bundling
        clear({
            // required, point out which directories should be cleared.
            targets: ['dist'],
            // optional, whether clear the directores when rollup recompile on --watch mode.
            watch: true,
        }),
        // Don't include comments in bundle
        cleanup(),
        terser({
            module: true,
        }),
    ],
};