// noinspection JSUnusedGlobalSymbols
import copy from 'rollup-plugin-copy'
import resolve from '@rollup/plugin-node-resolve'; // locate and bundle dependencies in node_modules (mandatory)
import svelte from 'rollup-plugin-svelte'
import { sass } from 'svelte-preprocess-sass';
import css from 'rollup-plugin-css-only';

export default {
  input: 'src/main.js',
  plugins: [
    resolve(),
    copy({
      targets: [
        { src: 'node_modules/web-ifc/web-ifc-mt.wasm', dest: './' },
        { src: 'node_modules/web-ifc/web-ifc.wasm', dest: './' },
        { src: 'node_modules/web-ifc-three/IFCWorker.js', dest: './' },
        { src: 'node_modules/web-ifc-three/IFCWorker.js.map', dest: './' },
      ]
    }),
    svelte({
			// we'll extract any component CSS out into
			// a separate file - better for performance
			preprocess: {
				style: sass(),
			},
      emitCss: false,
		}),
    css({ output: 'bundle.css' }),
    resolve({
			browser: true,
			dedupe: ['svelte']
		}),
  ],
  output: [
    {
      format: 'cjs',
      file: 'bundle.js'
    },
  ],
};