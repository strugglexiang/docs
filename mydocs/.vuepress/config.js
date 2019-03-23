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
                    { text: 'Redux的自我实现', link: '/redux/'},
                    { text: '设计模式', link:'/designPattern/'}
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
                       '组件/构造器和手动挂载',
                       '组件/v-model语法糖',
                       '组件/render与functional'
                   ] 
                }            
            ],
            '/redux/':[
                ''
            ],
            '/designPattern/':[
                {
                    title: '设计模式',
                    collapsable: false, 
                    children: [
                        '',
                    ],
                },
                {
                    title: '创建型设计模式',
                    collapsable: false, 
                    children: [
                        ['创建型/简单工厂模式', '简单工厂模式']
                    ]
                },    
                {
                    title: '结构型设计模式',
                    collapsable: false, 
                    children: [
                        ['结构型/外观模式', '外观模式']
                    ]
                },          
                {
                    title: '行为型设计模式',
                    collapsable: false, 
                    children: [
                        ['行为型/模板方法模式', '模板方法模式'],
                        ['行为型/观察者模式', '观察者模式'],
                        ['行为型/状态模式', '状态模式'],
                    ]
                },     
            ]
        },
    },
    markdown: {
        lineNumbers: true, //每个代码块显示行号
    }
}