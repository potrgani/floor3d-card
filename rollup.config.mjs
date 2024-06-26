import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import serve from "rollup-plugin-serve";
import json from "@rollup/plugin-json";
import ignore from "rollup-plugin-ignore";

const dev = process.env.ROLLUP_WATCH;

const serveopts = {
  contentBase: ["./dist"],
  host: "0.0.0.0",
  port: 5000,
  allowCrossOrigin: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

const plugins = [
  nodeResolve({}),
  commonjs(),
  typescript(),
  json(),
  babel({
    exclude: "node_modules/**",
    babelHelpers: "bundled"
  }),
  dev && serve(serveopts),
  !dev && terser(),
  ignore([
    "@material/mwc-notched-outline/mwc-notched-outline.js",
    "@material/mwc-ripple/mwc-ripple.js",
    "@material/mwc-list/mwc-list-item.js",
    "@material/mwc-list/mwc-list.js",
    "@material/mwc-menu/mwc-menu.js",
    "@material/mwc-menu/mwc-menu-surface.js",
    "@material/mwc-icon/mwc-icon.js",
    "@material/mwc-button/mwc-button.js",
  ])
];

export default [
  {
    input: "src/floor3d-card.ts",
    output: {
      dir: "dist",
      format: "es",
    },
    plugins: [...plugins],
  },
];