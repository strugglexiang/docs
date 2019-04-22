//------------------------------- Markdown
const Markdown = [
    {
        title: '学习Markdown',
        collapsable: false, 
        children: [
            '',
            '教程',
        ],
    }
]


//------------------------------ front-end-system
const front_end_system = [
    '说明',
]

//------------------------------ Vue
const Vue = [
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
]


//------------------------------ Redux
const Redux = [
    '',
]


//------------------------------- designPatter
const designPatter = [
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
            ['结构型/外观模式', '外观模式'], 
            ['结构型/适配器模式', '适配器模式'],
            ['结构型/代理模式', '代理模式'],
            ['结构型/组合模式', '组合模式'],
        ]
    },          
    {
        title: '行为型设计模式',
        collapsable: false, 
        children: [
            ['行为型/模板方法模式', '模板方法模式'],
            ['行为型/观察者模式', '观察者模式'],
            ['行为型/状态模式', '状态模式'],
            ['行为型/职责链模式', '职责链模式'],
        ]
    },     
]


//------------------------------- Babel
const Babel = [
    {
        title: 'Babel系列',
        collapsable: false, 
        children: [
            '',
        ],
    }    
]



//------------------------------- webpack
const webpack =  [
    ''
]


//--------------------------------- export
module.exports= {
    Markdown, 
    front_end_system,
    Vue,
    Redux,
    designPatter,
    Babel,
    webpack,
}