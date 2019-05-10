const {
    Markdown, 
    front_end_system,
    Vue,
    Redux,
    designPatter,
    Babel,
    webpack,    
    utils
} = require('./introduction')



module.exports = {
    base: '/',
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
                    { text: '学习Markdown', link: '/markdown/' },
                    { text: '前端知识体系', link: '/front_end_system/说明' },
                    { text: 'vue指南', link: '/vue/'},            
                    { text: 'Redux的自我实现', link: '/redux/' },
                    { text: '设计模式', link:'/designPattern/' },
                    { text: 'Babel系列', link:'/Babel/' },
                    { text: 'webpack', link:'/webpack/' },
                    { text: '工具函数', link:'/utils/' },
                ]                
            },
            { text: 'Github', link: 'https://github.com/strugglexiang/docs.git' },
        ],
        sidebarDepth: 3,
        sidebar: {
            '/markdown/': Markdown,
            '/front_end_system/': [
                '说明',
                {
                    title: 'JavaScript',
                    children: [
                        ['JavaScript/', '概要'],
                    ],                    
                },
                {
                    title: 'HTML和CSS',
                    children: [
                        ['HTML_and_CSS/', '概要'],
                    ],                    
                },
                {
                    title: '浏览器实现原理和api',
                    children: [
                        ['Browser_and_api/', '概要'],
                    ],                    
                },
            ],
            '/vue/': Vue,
            '/redux/': Redux,                                         
            '/designPattern/': designPatter,  
            '/Babel/': Babel,
            '/webpack/': webpack,
            '/utils/': utils             
        },
    },
    markdown: {
        lineNumbers: true, //每个代码块显示行号
    }
}