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
                    { text: 'vue指南', link: '/vue/'},
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
                    title: 'vue指南',
                    collapsable: false, 
                    children: [
                        '',
                    ],
                },    
                {
                   title: '组件',
                   children: [
                       '组件/组件分类',
                       '组件/组件构成',
                       '组件/组件内置通信',
                       '组件/自实现外置通信',
                       '组件/组件通信终极方案',
                       '组件/插件通信',
                       '组件/递归组件',
                       '组件/动态组件',
                   ] 
                }            
            ],
        },
    },
    markdown: {
        lineNumbers: true, //每个代码块显示行号
    }
}