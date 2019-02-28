module.exports = {
    base: '/dist/',
    port: '8082',
    title: "前端技术小册",
    description: "一个优质的前端技术文档集合",
    head: [
        ["link", { rel: "icon", href: '/images/huaji.jpg' }]
    ],
    themeConfig: {
        displayAllHeaders: true,//显示所有页面的标题链接
        nav: [
            { text: '首页', link: '/'},
            { 
                text: '教程', 
                items: [
                    { text: '学习Markdown', link: '/markdown/'},
                    { text: 'vue从入门到大型项目', link: '/vue/'},
                ]                
            },
            // { text: 'Github', link: 'https://github.com/strugglexiang/docs.git' },
        ],
        sidebarDepth: 3,
        sidebar: {
            '/markdown/':[
                '',
                '教程',
            ],
            '/vue/':[],
        },
    },
    markdown: {
        lineNumbers: true, //每个代码块显示行号
    }
}