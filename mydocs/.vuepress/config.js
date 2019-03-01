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
        lastUpdated: '上次更新时间', // string | boolean
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
                {
                    title: '学习Markdown',
                    collapsable: false, 
                    children: [
                        '',
                        '教程',
                    ],
                },
            ],
            '/vue/':[
                {
                    title: 'vue从入门到大型项目',
                    collapsable: false, 
                    children: [
                        '',
                        '课程安排',
                        '构建项目',
                        '项目结构',
                        '组件',
                        '参考链接'
                    ],
                },                
            ],
        },
    },
    markdown: {
        lineNumbers: true, //每个代码块显示行号
    }
}