module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("src/styles")
    eleventyConfig.addPassthroughCopy("src/images")
    eleventyConfig.addPassthroughCopy("src/scripts")
    eleventyConfig.addPassthroughCopy("src/cases/**/*.!(md)")
    eleventyConfig.addPassthroughCopy("src/blog/**/*.!(md)")
    eleventyConfig.addPassthroughCopy("src/robots.txt")
    eleventyConfig.addPassthroughCopy("src/sitemap.xml")

    eleventyConfig.addFilter('ruDate', (value) => {
        return value.toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).replace(' г.', '');
    });

    eleventyConfig.addFilter('prettyPosts', (posts) => {
        return posts.reverse().slice(0, 3);
    });
    
    eleventyConfig.addFilter('fixLinks', (content) => {
        const reg = /(src="[^(https://)])|(src="\/)|(href="[^(https://)])|(href="\/)/g;
        const prefix = `https://allay.digital` + content.url;
        return content.templateContent.replace(reg, (match) => {
            if (match === `src="/` || match === `href="/`) {
                match = match.slice(0, -1);
                return match + prefix;
            } else {
                return match.slice(0, -1) + prefix + match.slice(-1);
            }
        });
    });

    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: 'includes',
            layouts: 'layouts',
            data: 'data',
        },
        dataTemplateEngine: 'njk',
        markdownTemplateEngine: false,
        htmlTemplateEngine: 'njk',
        passthroughFileCopy: true,
        templateFormats: [
            'md', 'njk'
        ],
    }
}