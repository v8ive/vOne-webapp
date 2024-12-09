import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
        VitePWA({
          injectRegister: "inline",
          registerType: 'autoUpdate',
          manifest: {
            name: "vOne",
            short_name: "vOne",
            description: "v8iveOne",
            start_url: "/",
            display: "standalone",
            background_color: "#000",
            theme_color: "#000",
            icons: [
                {
                    src: "/assets/icons/icon-96x96-transparent.png",
                    sizes: "96x96",
                    type: "image/png"
                },
                {
                    src: "/assets/icons/icon-192x192-transparent.png",
                    sizes: "192x192",
                    type: "image/png"
                },
                {
                    src: "/assets/icons/icon-512x512-transparent.png",
                    sizes: "512x512",
                    type: "image/png"
                },
                {
                    purpose: "maskable",
                    sizes: "1046x1046",
                    src: "/assets/icons/maskable_icon.png",
                    type: "image/png"
                },
                {
                    purpose: "maskable",
                    sizes: "48x48",
                    src: "/assets/icons/maskable_icon_x48.png",
                    type: "image/png"
                },
                {
                    purpose: "maskable",
                    sizes: "72x72",
                    src: "/assets/icons/maskable_icon_x72.png",
                    type: "image/png"
                },
                {
                    purpose: "maskable",
                    sizes: "96x96",
                    src: "/assets/icons/maskable_icon_x96.png",
                    type: "image/png"
                },
                {
                    purpose: "maskable",
                    sizes: "128x128",
                    src: "/assets/icons/maskable_icon_x128.png",
                    type: "image/png"
                },
                {
                    purpose: "maskable",
                    sizes: "192x192",
                    src: "/assets/icons/maskable_icon_x192.png",
                    type: "image/png"
                },
                {
                    purpose: "maskable",
                    sizes: "384x384",
                    src: "/assets/icons/maskable_icon_x384.png",
                    type: "image/png"
                },
                {
                    purpose: "maskable",
                    sizes: "512x512",
                    src: "/assets/icons/maskable_icon_x512.png",
                    type: "image/png"
                }
            ]
          },
        }),
    ],
    css: {
        postcss: {
            plugins: [
                tailwindcss,
                autoprefixer,
            ],
        },
    },
})
