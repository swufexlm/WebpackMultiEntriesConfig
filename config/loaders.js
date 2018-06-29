module.exports = {
    css: (autoprefixer, shouldUseSourceMap) => ({
        fallback: {
            loader: require.resolve('style-loader'),
            options: {
                hmr: false
            }
        },
        use: [
            {
                loader: require.resolve('css-loader'),
                options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: shouldUseSourceMap
                }
            },
            {
                loader: require.resolve('postcss-loader'),
                options: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebookincubator/create-react-app/issues/2677
                    ident: 'postcss',
                    plugins: () => [
                        require('postcss-flexbugs-fixes'),
                        autoprefixer({
                            browsers: [
                                '>1%',
                                'last 4 versions',
                                'Firefox ESR',
                                'not ie < 9' // React doesn't support IE8 anyway
                            ],
                            flexbox: 'no-2009'
                        })
                    ]
                }
            }
        ]
    }),
    less: (autoprefixer, shouldUseSourceMap, theme) => ({
        fallback: {
            loader: require.resolve('style-loader'),
            options: {
                hmr: false
            }
        },
        use: [
            ({ resource }) => ({
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    modules: !/node_modules/.test(resource),
                    localIdentName: '[name]__[local]___[hash:base64:5]',
                    sourceMap: shouldUseSourceMap
                }
            }),
            {
                loader: require.resolve('postcss-loader'),
                options: {
                    ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                    plugins: () => [
                        require('postcss-flexbugs-fixes'),
                        autoprefixer({
                            browsers: [
                                '>1%',
                                'last 4 versions',
                                'Firefox ESR',
                                'not ie < 9' // React doesn't support IE8 anyway
                            ],
                            flexbox: 'no-2009'
                        })
                    ]
                }
            },
            {
                loader: require.resolve('less-loader'),
                options: {
                    modifyVars: theme,
                    javascriptEnabled: true
                }
            }
        ]
    })
};
