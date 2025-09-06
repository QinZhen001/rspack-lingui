import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
// import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";


export default defineConfig({
  tools: {
    swc: {
      jsc: {
        experimental: {
          plugins: [["@lingui/swc-plugin", {}]],
        },
      },
    },
    rspack: {
      plugins: [],
    },
  },
  plugins: [pluginReact(), 
    // pluginNodePolyfill()
  ],
});
