import typescript from 'rollup-plugin-typescript';

export default {
  input: './src/DynamicImportLoader.tsx',
  output: {
    dir: 'dist',
    file: 'index.js',
    format: 'cjs'
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json'
    })
  ]
};
