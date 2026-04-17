import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

const inlineCssPlugin = () => {
  return {
    name: 'inline-css',
    enforce: 'post',
    transformIndexHtml(html, context) {
      if (!context || !context.bundle) return html;
      let newHtml = html;
      const cssFiles = Object.keys(context.bundle).filter(fileName => fileName.endsWith('.css'));
      cssFiles.forEach(cssFile => {
        if (cssFile.includes('index-')) {
          const cssAsset = context.bundle[cssFile];
          if (cssAsset && cssAsset.type === 'asset' && cssAsset.source) {
            const cssContent = cssAsset.source;
            const fileName = cssFile.split('/').pop();
            const regex = new RegExp(`<link[^>]*href="[^"]*${fileName}"[^>]*>`, 'i');
            if (regex.test(newHtml)) {
              newHtml = newHtml.replace(regex, `<style>${cssContent}</style>`);
              delete context.bundle[cssFile];
            }
          }
        }
      });
      return newHtml;
    }
  };
};

export default defineConfig({
  plugins: [react(), tailwindcss(), imagetools(), inlineCssPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'gsap': ['gsap'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
