const plugins = [
  [
    "babel-plugin-direct-import",
    { modules: ["@mui/material", "@mui/icons-material"] },
  ],
];

module.exports = {
  presets: ["next/babel"],
  plugins,
};
