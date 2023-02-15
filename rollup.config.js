// noinspection JSUnusedGlobalSymbols
import copy from 'rollup-plugin-copy'
import resolve from '@rollup/plugin-node-resolve'; // locate and bundle dependencies in node_modules (mandatory)
import svelte from 'rollup-plugin-svelte'
import { sass } from 'svelte-preprocess-sass';

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
			css: css => {
				css.write('public/my-component/dist/bundle.css'); // (3)
			},
			preprocess: {
				style: sass(),
			},
		}),

  ],
  output: [
    {
      format: 'cjs',
      file: 'bundle.js'
    },
  ],
};