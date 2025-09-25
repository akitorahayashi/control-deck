/** @type {import('prettier').Config} */
module.exports = {
  singleQuote: true,
  semi: true,
  trailingComma: 'none',
  plugins: ['prettier-plugin-tailwindcss'],
  filepath: './src/**/*.{js,ts,jsx,tsx}'
}
