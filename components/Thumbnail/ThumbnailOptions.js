/* Read https://slidewiki.atlassian.net/wiki/display/SWIK/How+To+Use+Slide+Thumbnail to know the details */
export default {
    SizeCSS : {
        maxHeight: 500,
        minHeight: 500,
        overflowY: 'auto'
    },
    AbsoluteDirpath: __filename.split('/slidewiki-platform')[0] + '/slidewiki-platform/assets/images/thumbnails',
    RelativeImagePath: '/assets/images/thumbnails',
    Options: {
        screenSize: {
            width: '1024',
            height: '900',
        },
        shotSize: {
            width: '1024',
            height: '900',
        },
        shotOffset: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
        },
        timeout: 7000, //in ms
        siteType:'html',
        phantomPath: require('phantomjs2').path
    }
};