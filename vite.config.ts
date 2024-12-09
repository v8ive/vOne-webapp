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
            background_color: "#000000",
            theme_color: "#000000",
            icons: [
                {
                    purpose: "any maskable",
                    sizes: "1046x1046",
                    src: "/assets/icons/maskable_transparent/icon-transparent.png",
                    type: "image/png"
                },
                {
                    purpose: "any maskable",
                    sizes: "96x96",
                    src: "/assets/icons/maskable_transparent/icon_x96-transparent.png",
                    type: "image/png"
                },
                {
                    purpose: "any maskable",
                    sizes: "192x192",
                    src: "/assets/icons/maskable_transparent/icon_x192-transparent.png",
                    type: "image/png"
                },
                {
                    purpose: "any maskable",
                    sizes: "512x512",
                    src: "/assets/icons/maskable_transparent/icon_x512-transparent.png",
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
