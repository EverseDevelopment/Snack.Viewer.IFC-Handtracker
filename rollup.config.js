// noinspection JSUnusedGlobalSymbols
import copy from 'rollup-plugin-copy'
import resolve from '@rollup/plugin-node-resolve'; // locate and bundle dependencies in node_modules (mandatory)

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
    })

  ],
  output: [
    {
      format: 'cjs',
      file: 'bundle.js'
    },
  ],
};