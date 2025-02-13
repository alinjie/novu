import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import image from '@rollup/plugin-image';
import nodeExternals from 'rollup-plugin-node-externals';
import replace from '@rollup/plugin-replace';
import gzipPlugin from 'rollup-plugin-gzip';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import packageJson from './package.json' assert { type: 'json' };

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      nodeExternals(),
      resolve({ preferBuiltins: false, browser: true }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      image(),
    ],
  },
  {
    input: 'src/web-component.ts',
    output: [
      {
        file: 'dist/umd/index.js',
        format: 'umd',
        name: 'NotificationCenterWebComponent',
        sourcemap: true,
      },
    ],
    plugins: [
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      resolve({ preferBuiltins: false, browser: true }),
      typescript({ tsconfig: './tsconfig.json' }),
      commonjs(),
      nodePolyfills(),
      terser(),
      gzipPlugin(),
      image(),
    ],
  },
];
