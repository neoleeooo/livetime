import {defineConfig} from 'vite'
import path from 'path';
export default defineConfig({
    plugins: [],
    build: {
        outDir:'../server/dist',
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, 'index.html'),
                time: path.resolve(__dirname, 'byTime.html'),
                room: path.resolve(__dirname, 'byRoom.html'),

            }, output: {
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: "static/js/[name]-[hash].js",
                assetFileNames: "static/[ext]/name-[hash].[ext]"
            }
        },
    }
})