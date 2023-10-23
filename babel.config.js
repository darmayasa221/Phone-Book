module.exports = {
  presets: [
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
    "@emotion/babel-preset-css-prop",
  ],
  plugins: [
    "@emotion/babel-plugin",
    process.env.NODE_ENV !== "production" &&
      process.env.NODE_ENV !== "test" &&
      require.resolve("react-refresh/babel"),
  ].filter(Boolean),
};
