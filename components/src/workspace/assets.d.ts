// Lets the draft workspace stories import SVG files as URLs (Vite does this at build time).
declare module '*.svg' {
  const url: string
  export default url
}
