import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

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
  plugins: [pluginReact()],
});
