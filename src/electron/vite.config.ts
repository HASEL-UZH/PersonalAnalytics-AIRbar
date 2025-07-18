import fs from 'node:fs';
import path from 'node:path'; // ***AIRBAR 
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import electron from 'vite-plugin-electron/simple';
import alias from '@rollup/plugin-alias'; // ***AIRBAR 
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  fs.rmSync('dist-electron', { recursive: true, force: true });
 
  const selfReflectionDir = path.resolve(__dirname, 'PA.SelfReflection/src'); // ***AIRBAR
       
  const isServe = command === 'serve';
  const isBuild = command === 'build';
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;

  return {
    plugins: [
      // ***AIRBAR - START
      // this works for the renderer files, but does not work for the main files
      alias({
        entries: [ { find: '@externalVue', replacement: selfReflectionDir} ]
      }),
      // ***AIRBAR - END
      vue(),
      electron({
        main: {
          // Shortcut of `build.lib.entry`
          entry: 'electron/main/index.ts',
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: 'dist-electron/main',
              rollupOptions: {
                // ***AIRBAR - START
                plugins:  
                  // for the main files...
                  alias({
                    entries: [ { find: '@external', replacement: selfReflectionDir } ]
                }),
                // ***AIRBAR - END
                
                // Some third-party Node.js libraries may not be built correctly by Vite, especially `C/C++` addons,
                // we can use `external` to exclude them to ensure they work correctly.
                // Others need to put them in `dependencies` to ensure they are collected into `app.asar` after the app is built.
                // Of course, this is not absolute, just this way is relatively simple. :)
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {})
              }
            }
          }
        },
        preload: {
          // Shortcut of `build.rollupOptions.input`.
          // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
          input: 'electron/preload/index.ts',
          vite: {
            build: {
              sourcemap: sourcemap ? 'inline' : undefined, // #332
              minify: isBuild,
              outDir: 'dist-electron/preload',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {})
              }
            }
          }
        }
      })
    ],
    clearScreen: false
  };
});
