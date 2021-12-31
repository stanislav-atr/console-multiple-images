import clear from 'rollup-plugin-clear';
import cleanup from 'rollup-plugin-cleanup';

export default {
    input: './index.js',
    output: {
        file: './dist/bundle.js',
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
        cleanup({
            comments: 'eslint',
        }),
    ],
};