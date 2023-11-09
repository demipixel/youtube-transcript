import typescript from 'rollup-plugin-typescript2';

const baseConfig = {
  input: 'src/index.ts',
  plugins: [typescript()],
  external: ['axios'],
};

const buildFormats = [];

// ES Module build
const esConfig = {
  ...baseConfig,
  output: {
    file: 'dist/youtube-transcript.js',
    format: 'esm',
  },
};
buildFormats.push(esConfig);

// Export config
export default buildFormats;
