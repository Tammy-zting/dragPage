/*
 * @Author: zting
 * @LastEditors: zting
 * @Description: file content
 */
import React ,{useContext} from 'react';
import {AppContext} from '../../layouts'
/**
 * 预览模式
 * GlobalComponent  传入
 */
import {GlobalComponent} from '../EditPage'
const data =[
    {
        "name": "Row",
        "title": "行布局（Row）",
        "attr": {
            "gutter": 8
        },
        "children": [{
            "name": "Col",
            "title": "列（Col）",
            "attr": {
                "span": 8,
                "style": {
                    // border:"1px solid black"
                }
            },
            "children": [{
                "id": 'p4545pim7b40000000',
                "name": "MonthPicker",
                "title": "月选择器（MonthPicker）",
                "attr": {
                    "style": {
                        border: '1px solid black'
                    }
                }
            }
            ]
        }, {
            "name": "Col",
            "title": "列（Col）",
            "attr": {
                "span": 16
            },
            "children": [
                {
                    "id": '7lf1wjcbyt400000000',
                    "name": "Input",
                    "title": "输入框（Input）",
                    "attr": {
                        "size": "small",
                        //   "value": "",
                        "style": {

                        }
                    }
                },

            ]

        }, {
            "name": "Col",
            "title": "列（Col）",
            "attr": {
                "span": 8
            },
            "children": []

        }, {
            "name": "Col",
            "title": "列（Col）",
            "attr": {
                "span": 8
            },
            "children": []

        }]
    }
]
console.log({GlobalComponent})
let Components = {...GlobalComponent.field,...GlobalComponent.mulContainer,...GlobalComponent.sglContainer}
function Preview() {
    // return class extends React.Component {

        // render() {
            // 递归函数
        // const store = useContext(AppContext)
        // const [state] = store
        // const {index} = state 
        // console.log({store})
        const loop = (arr) => (
            arr.map((item,index) => {
                const ComponentInfo = Components[item.name]
                if (item.children) {
                    return <ComponentInfo key={index} {...item.attr} >{loop(item.children)}</ComponentInfo>
                }
                return <ComponentInfo key={index} {...item.attr} />
            })
        );
        return (
            <>
                {loop(data)}
            </>
        );
        // }
    // }
}

export default Preview