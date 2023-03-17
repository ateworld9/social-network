module.exports = (api) => {
  const mode = process.env.NODE_ENV ?? "production";

  // This caches the Babel config by environment.
  api.cache.using(() => mode);

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            browsers: [">1%", "last 4 versions", "not ie < 9"],
          },
          useBuiltIns: "usage",
          debug: false,
          corejs: 3,
          modules: "cjs",
        },
      ],
      "@babel/preset-react",
    ],
    plugins: [
      // "@babel/plugin-syntax-dynamic-import",
      // "@babel/plugin-proposal-class-properties",
      // "@babel/plugin-proposal-export-namespace-from",
      // "@babel/plugin-proposal-throw-expressions",
      // "@babel/plugin-proposal-object-rest-spread",
      // Applies the react-refresh Babel plugin on non-production modes only
      mode !== "production" && "react-refresh/babel",
      [
        "babel-plugin-import",
        {
          libraryName: "@mui/material",
          libraryDirectory: "",
          camel2DashComponentName: false,
        },
        "core",
      ],
      [
        "babel-plugin-import",
        {
          libraryName: "@mui/icons-material",
          libraryDirectory: "",
          camel2DashComponentName: false,
        },
        "icons",
      ],
    ].filter(Boolean),
  };
};
