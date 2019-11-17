module.exports = {
    siteMetadata: {
        title: 'WolfyMaster Media'
    },
    plugins     : [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/wolfy-subpages/`,
                name: "subpages",
            }
        },
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                defaultLayouts: {
                    subpages: require.resolve("./src/templates/subpageTemplate.js"),
                }
            }
        },
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                includePaths: [`${__dirname}/src/scss`],
            },
        },
        {
            resolve: `gatsby-plugin-page-creator`,
            options: {
                path: `${__dirname}/wolfy-subpages/`,
            },
        },
        `gatsby-transformer-remark`,
        `gatsby-plugin-react-helmet`,
    ],
};