//左侧栏 属性编辑区
import React ,{useMemo,useContext} from 'react';
import styles from './index.less';
import { Collapse, Tag, Button,Divider } from 'antd';
import Sortable from 'react-sortablejs'  //拖拽
import G2plotConfig from '../G2plotConfig'
import {g2ChartType} from '../G2plotConfig/g2data'
import { Tree } from 'antd';
import { AppContext } from '../../layouts';
import EditableTree from '../EditableTree'

const Panel = Collapse.Panel;

//NOTE:添加了title属性为组件树视图显示标题做准备
// 基础组件  
const SelfCom = [

    {
        name: 'MonthPicker',
        title:'月选择器（MonthPicker）',
        attr: {}
    },
    {
        name: 'RangePicker',
        title:'范围选择（RangePicker）',
        attr: {}
    },
    {
        name: 'WeekPicker',
        title:'周选择器（WeekPicker）',
        attr: {}
    },
    {
        name: 'Input',
        title:'输入框（Input）',
        attr: {
            size: 'large',
            value: '第一个'
        }
    },
    {
        name: 'ReactEcharts',
        title:'Echart图表（ReactEcharts）',
        attr: { height: '350px', width: '100%' },
    },
    {
        name:'H1',
        title:'标题H1',
        attr:{
            value:'标题H1'
        }
    },
    {
        name:'H2',
        title:'标题H2',
        attr:{
            value:'标题H2'
        }
    },
    {
        name:'H3',
        title:'标题H3',
        attr:{
            value:'标题H3'
        }
    },
    {
        name:'H4',
        title:'标题H4',
        attr:{
            value:'标题H4'
        }
    },
    {
        name:'H5',
        title:'标题H5',
        attr:{
            value:'标题H5'
        }
    },
    {
        name:'Link',
        title:'a标签',
        attr:{
            value:'a标签'
        }
    },
    {
        name:'Divider',
        title:'分割线（Divider）',
        attr:{
            //例如下面的属性，在不修改的情况下都取默认值不需要提交
        }
    },
]

//图表组件  G2plot
const ChartCom=[
    {
        name:'LineChart',//折线图
        title:'折线图（LineChart）',
        attr:{}
    },
    {
        name:'ColumnChart',//柱状图
        title:'柱状图（ColumnChart)',
        attr:{}
    },
    {
        name:'PieChart',  //饼转图
        title:'饼状图（PieChart）',
        attr:{}
    }
]
// 容器
const ContainerCom = [
    {
        name: 'Div',
        title:'Div',
        attr: {
            style: {
                // border:'1px dotted red'
            }
        },
        children: [],
    },
    {
        name: 'Span',
        title:'Span内联元素',
        attr: {
            style: {
                
            }
        },
        children: [],
    },
    {
        name: 'Card',
        title:'卡片布局（Card）',
        attr: {
        },
        children: []
    },
    {
        name: 'Row',
        title:'行布局（Row）',
        attr: {
            gutter:8,
            style: {
                // borderLeft:'1px dotted red',
                // borderTop:'1px dotted red'
            }
        },
        children: [
            {
                name: 'Col',
                title:'列（Col）',
                attr: {
                    span: 8,
                    style: {
                        // borderBottom:'1px dotted red',
                        // borderRight:'1px dotted red'
                    }
                },
                children: []
            },
            {
                name: 'Col',
                title:'列（Col）',
                attr: {
                    span: 8,
                    style: {
                        // borderBottom:'1px dotted red',
                        // borderRight:'1px dotted red'
                    }
                },
                children: []
            }
        ]
    },
    {
        name: 'Collapse',
        title:'折叠面板（Collapse）',
        attr: {
            defaultActiveKey:['1-0'],
            style: {
                // borderLeft:'1px dotted red',
                // borderTop:'1px dotted red'
            }
        },
        children: [
            {
                name: 'Panel',
                title:'面板（Panel）',
                attr: {
                    header:'This is panel header 1',
                    // key:"1-0",
                    style: {
                        // borderBottom:'1px dotted red',
                        // borderRight:'1px dotted red'
                    }
                },
                children: []
            },
            {
                name: 'Panel',
                title:'面板（Panel）',
                attr: {
                    header:'This is panel header 2',
                    // key:"2-0",
                    style: {
                        // borderBottom:'1px dotted red',
                        // borderRight:'1px dotted red'
                    }
                },
                children: []
            }
        ]
    },
    {
        name: 'Tabs',
        title:'标签页（Tabs）',
        attr: {
            // defaultActiveKey:"1-0",
            style: {
                // borderLeft:'1px dotted red',
                // borderTop:'1px dotted red'
            }
        },
        children: [
            {
                name: 'TabPane',
                title:'标签页面（TabPane）',
                attr: {
                    tab:'This is tab header 1',
                    // key:"1-0",
                    style: {
                        // borderBottom:'1px dotted red',
                        // borderRight:'1px dotted red'
                    }
                },
                children: []
            },
            {
                name: 'TabPane',
                title:'标签页面（TabPane）',
                attr: {
                    tab:'This is tab header 2',
                    // key:"2-0",
                    style: {
                        // borderBottom:'1px dotted red',
                        // borderRight:'1px dotted red'
                    }
                },
                children: []
            }
        ]
    },
  

  
]
//汇总所有组件
export const soundData = [
    ...SelfCom,
    ...ChartCom,
    ...ContainerCom
]

//公用样式  用于修改style
const comStyles = {
    tag: {
        cursor: 'move',
        margin:6
    }
}
// let parent = {}
function AttrPanel(props) {

    //nav数据
    const store = useContext(AppContext)
    const [state,dispatch] = store
    let navData = state.navReducer

    //若当前有选中组件序号
    let index = null
    //当前选中的组件名
    let currentName = null
    //当前选中组件名id
    let currentId = null
    
    if (Object.keys(props.editCom).length) {

        index = props.editCom.getAttribute('data-index')  //data-index
         
        currentName = props.editCom.getAttribute('data-name')

        currentId=props.editCom.getAttribute('data-id')
    }

    let {chartConfig,setChartConfig} = props


    const G2plotCom = useMemo(() => {
        return (
            <G2plotConfig commConfig={chartConfig} setCommConfig={setChartConfig} />
        )
    }, [chartConfig,setChartConfig])

    return (
        <div className={`${styles['attrPanel']} attrPanel`}>
     
            <Collapse defaultActiveKey={['0']} key={0}>
                <Panel header={`属性编辑区 (${index || '当前无选中'})  ${currentId && `id:${currentId}`|| ''} `} key={0}>
                    <Button type="primary" danger size="small" onClick={() => props.onDelete()} className={styles.btn}>删除此元素</Button>
                    <Button type="primary" size="small" onClick={() => props.onCopy()} className={styles.btn}>复制此元素</Button>
                    <Button type="primary" size="small" onClick={() => props.onClear()} className={styles.btn}>清空</Button>
                </Panel>
                <Panel header={'组件区'} key={1}>
                    <Sortable
                        options={{
                            group: {
                                name: 'formItem',
                                pull: 'clone',
                                put: 'false'
                            },
                            sort: false,

                        }}
                    >
                        {
                            SelfCom.map(item => (
                                <span data-index={item.name} key={item.name}><Tag color="#108ee9" style={comStyles.tag}>{item.title}</Tag></span>
                            ))
                        }
                    </Sortable>
                </Panel>
                <Panel header={'图表区'} key={2}>
                    <Sortable
                        options={{
                            group: {
                                name: 'formItem',
                                pull: 'clone',
                                put: 'false'
                            },
                            sort: false,

                        }}
                    >
                        {
                            ChartCom.map(item => (
                                <span data-index={item.name} key={item.name}><Tag color="#108ee9" style={comStyles.tag}>{item.title}</Tag></span>
                            ))
                        }
                    </Sortable>
                </Panel>
                <Panel header={'容器区'} key={3}>
                    <Sortable
                        options={{
                            group: {
                                name: 'formItem',
                                pull: 'clone',
                                put: 'false'
                            },
                            sort: false,

                        }}
                        className={styles.panelContent}

                    >
                        {
                            ContainerCom.map(item => (
                                <span data-index={item.name} key={item.name}><Tag color="#108ee9" style={comStyles.tag}>{item.title}</Tag></span>
                            ))
                        }
                    </Sortable>
                </Panel>
                <Panel header="页面管理" key={4}>
                    {/* <Tree   
                    showLine
                    blockNode
                        treeData={navData}>
                    </Tree> */}
                    <EditableTree/>
                </Panel>
           </Collapse>
           
            {/* G2plot 图表属性设置面板*/}
            
            {g2ChartType.includes(currentName) &&(
                    <>
                    <Divider>G2plot图表属性设置</Divider>
                    {G2plotCom}
                    </>
                )}
            
        </div>
    );

}

export default AttrPanel;


