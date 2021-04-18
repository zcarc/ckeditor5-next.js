const { styles } = require("@ckeditor/ckeditor5-dev-utils");

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // config.module.rules.forEach(function (rule, index, array) {
    //   const test = (rule.test && rule.test.toString()) || "";
    //   console.log("test: ", test);
    //   if (test.includes("css")) {
    //     array[index] = {
    //       ...rule,
    //       exclude: [/ckeditor5-[^/]+\/theme\/[\w-/]+\.css$/],
    //     };
    //   } else if (test.includes("svg")) {
    //     array[index] = {
    //       ...rule,
    //       exclude: /ckeditor5-[^/]+\/theme\/icons\/.+\.svg$/,
    //     };
    //   }
    // });

    config.module.rules.push({
      test: cssRegex,
      exclude: [cssModuleRegex, /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/],
      // use: getStyleLoaders({
      //   importLoaders: 1,
      //   sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
      // }),
      // Don't consider CSS imports dead code even if the
      // containing package claims to have no side effects.
      // Remove this when webpack adds a warning or an error for this.
      // See https://github.com/webpack/webpack/issues/6571
      sideEffects: true,
    });

    config.module.rules.push({
      test: cssModuleRegex,
      exclude: [/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/],
      // use: getStyleLoaders({
      //   importLoaders: 1,
      //   sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
      //   modules: {
      //     getLocalIdent: getCSSModuleLocalIdent,
      //   },
      // }),
    });

    config.module.rules.push({
      test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
      use: ["raw-loader"],
    });

    config.module.rules.push({
      test: /ckeditor5-[^/]+\/theme\/[\w-/]+\.css$/,
      use: [
        {
          loader: "style-loader",
          options: {
            injectType: "singletonStyleTag",
            attributes: {
              "data-cke": true,
            },
          },
        },
        {
          loader: "postcss-loader",
          options: styles.getPostCssConfig({
            themeImporter: {
              themePath: require.resolve("@ckeditor/ckeditor5-theme-lark"),
            },
            minify: true,
          }),
        },
      ],
    });

    return config;
  },
};
