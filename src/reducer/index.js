/*
 * @Author: zting
 * @LastEditors: zting
 * @Description: file content
 */


export const pageState = {
    index: [
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
}

function pageReducer(state, action) {
    switch (action.type) {
        case "update":
            return { ...state, ...action.param }
        case "remove":
            return delete state[action.flag]
        default:
            throw new Error()
    }
}

export const navState = [
    {
        title:'Index',
        key:'index',
        children:[
            {
                title:'Detail',
                key:'index/detail',
            },
            {
                title:'Detai2',
                key:'index/detai2',
            },
            {
                title:'Detai3',
                key:'index/detai3',
            }
        ]
    },
    {
        title:'about',
        key:'about'
    }
]

function navReducer(state,action){
    switch(action.type){
        case "update":
            return action.param
        case "delete":
            return 
        default:
            throw new Error()
    }
}

export { pageReducer, navReducer}