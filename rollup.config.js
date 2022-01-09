import typescript from '@rollup/plugin-typescript';
import clear from 'rollup-plugin-clear';

export default {
    input: 'src/console-images.ts',
    output: {
        file: './dist/console-images.js',
        format: 'cjs',
    },
    plugins: [
        clear({
            targets: ['dist'],
            watch: true, // optional, whether clear the directores when rollup recompile on --watch mode.
        }),
        typescript(),
    ],
};