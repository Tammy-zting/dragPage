//组件的额外配置项
export default {
    'Divider': {
        //是否虚线
        dashed: {
            type: 'boolean',
            title: '虚线',
            value: false
        },
        //标题位置
        orientation: {
            type: 'array',
            title: '标题位置',
            value: ['center', 'left ', 'right']
        },
        //水平/垂直
        type: {
            type: 'array',
            title: '位置',
            value: ['horizontal', 'vertical']
        }
    },
    'Card':{
         //标题
         title:{
            type:'string',
            title:'标题',
            value:'Card Title'
        },
        //是否有边框
        bordered:{
            type:'boolean',
            title:'边框',
            value:true
        },
        //鼠标经过是否浮起
        hoverable:{
            type:'boolean',
            title:'鼠标经过是否浮起',
            value:false
        },
        //当卡片加载时，使用loading展示占位
        loading:{
            type:'boolean',
            title:'loading是否显示',
            value:false
        },
        //大小
        size:{
            type:'array',
            title:'大小',
            value:['default','small']
        },
    }
}

