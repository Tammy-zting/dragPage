// import styles from './index.css';
import EditPage from '../component/EditPage'
import React from 'react'
import Workplace  from  './antIndex'

// import previewHoc from '../component/previewHoc';
// import PanelGroup from '../component/PanelGroup'
// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


// const Div=(attr) =>(
//     <div {...attr}></div>
// )
// const globalComponent = {
//     Rate,
//     Input,
//     MonthPicker,
//     RangePicker,
//     WeekPicker,
//     Row,
//     Col,
//     Div,

// }


  
export default function() {
    


  //echarts 测试数据
  const echartOption = {
    title : {
        text: '未来一周气温变化',
        subtext: '纯属虚构'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['最高气温','最低气温']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : true,
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLabel : {
                formatter: '{value} °C'
            }
        }
    ],
    series : [
        {
            name:'最高气温',
            type:'bar',
            data:[11, 11, 15, 13, 12, 13, 10],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
            
        },
        // {
        //     name:'最低气温',
        //     type:'line',
        //     data:[1, -2, 2, 5, 3, 2, 0],
        //     markPoint : {
        //         data : [
        //             {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
        //         ]
        //     },
        //     markLine : {
    ]
};


  

  // 测试数据
//   const data = [
//     {
//         name: 'Input',
//         attr: {
//             size:'large',
//             value:'第一个'
//         }
//     },
//     {
//         name: 'Input',
//         attr: {
//             size:'default',
//             value:'第二个'
//         }
//     },
//     {
//         name: 'Input',
//         attr: {
//             size:'small',
//             value:'第三个'
//         }
//     },
    // {
    //     name: 'Containers',
    //     attr: {
    //         style:{
    //             border:'1px solid red'  //边框
    //         }
    //     },
    //     children:[
    //         {
    //             name: 'Input',
    //             attr: {
    //                 size:'small',
    //                 value:'嵌套的input'
    //             }
    //         },
    //         {
    //             name: 'Rate',
    //             attr: {
    //                 size:'small',
    //                 value:'嵌套的input'
    //             }
    //         },
    //         {
    //             name: 'MonthPicker',
    //             attr: {}
    //         },
    //         {
    //             name: 'RangePicker',
    //             attr: {}
    //         },
    //         {
    //             name: 'WeekPicker',
    //             attr: {}
    //         },
    //     ]

    // },
//       {
//           "name": "Row",
//           "attr": {
//               "gutter": 18,
//               "justify":"space-around" ,
//               "align":"middle",
//               "style": {
//                 border:"3px solid black"
//            }
//           },
//           "children": [{
//               "name": "Col",
//               "attr": {
//                   "span": 4,
//                   "style": {
//                        border:"1px solid black"
//                   }
//               },
//               "children": [
//                   {
//                   "name": "MonthPicker",
//                   "attr": {

//                   }
//               },
//             // {
//             //     "name": "Input",
//             //     "attr": {
//             //         "size": "small",
//             //         //   "value": "",
//             //         "style": {

//             //         }
//             //     }
//             // },
//               ]
//           }, {
//               "name": "Col",
//               "attr": {
//                   "span": 4,
//                   "style": {
//                     border:"1px solid green"
//                }
//               },
//               "children": [
//                   {
//                       "name": "Input",
//                       "attr": {
//                           "size": "small",
//                           //   "value": "",
//                           "style": {

//                           }
//                       }
//                   },
//                   {
//                       'name':'Div',
//                       "attr": {
//                         "style": {
//                             border:"1px solid green"
//                         },
                        
//                     },
//                     "children": [
//                         {
//                         "name": "MonthPicker",
//                         "attr": {
      
//                         }
//                     },]

//                   }

//               ]

//           }, {
//               "name": "Col",
//               "attr": {
//                   "span": 4,
//                   "style": {
//                     border:"1px solid red"
//                }
//               },
//               "children": [
//                 {
//                     "name": "Input",
//                     "attr": {
//                         "size": "small",
//                         //   "value": "",
//                         "style": {

//                         }
//                     }
//                 },
//               ]

//           }, {
//               "name": "Col",
//               "attr": {
//                   "span": 4,
//                   "style": {
//                     border:"1px solid blue"
//                }
//               },
//               "children": [
//                 {
//                     "name": "Input",
//                     "attr": {
//                         "size": "small",
//                         //   "value": "",
//                         "style": {

//                         }
//                     }
//                 },
//               ]

//           },]
//       },
// ];
//预览界面
// const Preview = previewHoc(globalComponent,data)




  return (
    <div>
      <EditPage echartOption={echartOption}/>
      {/* <Preview/>  */}
      {/* <PanelGroup >
        <div>panel 1</div>
        <div>panel 2</div>
        <div>panel 3</div>

      </PanelGroup > */}
      {/* <Workplace/> */}
    </div>

  );
}
