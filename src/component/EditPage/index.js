//FIXME:Card H1-H5  A标签  分割线 属性设置

// 编辑区主界面
import React, { useState, useRef, useEffect, useMemo, useContext } from 'react';
import { Rate, Input, DatePicker, Row, Col, Switch, Tabs, Collapse, Card, Divider, Button } from 'antd';
import PanelGroup from '../PanelGroup'
import styles from './index.less'
import AttrPanel from '../AttrPanel'
import Sortable from 'react-sortablejs'  //拖拽
import uniqueId from 'lodash/uniqueId'
import _ from 'lodash';
import update from 'immutability-helper';
import { soundData } from '../AttrPanel'
import { indexToArray, getItem, setInfo, isPath, getCloneItem, itemRemove, itemAdd, updateStyles, updateData, styleStringToObject, GenNonDuplicateID, updateRowColConfig, getObjParent, updateLayoutConfig } from '../utils';
import cx from 'classnames';
// import EditorList from '../RcEditor';
import { LineChart, ColumnChart, PieChart } from '@opd/g2plot-react' //G2plot
// import '../RcEditor/assets/index.less';
import { g2DefaultVaules, g2ChartType } from '../G2plotConfig/g2data'
//ReactEchart
import ReactEcharts from 'echarts-for-react';

//栅格布局属性设置
import RowColConfig from '../RowColConfig'
//其他布局属性设置
import LayoutConfig from '../LayoutConfig'

//组件树视图
import DragTree from '../DragTree'
import CommConfig from '../CommConfig';

//组件属性
import configAttr from '../configAttr'

//全局取值
import { AppContext } from '../../layouts'

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

//div容器
const Div = (attr) => (
    <div {...attr}></div>
)

//span内敛
const Span = (attr) => (
    <span {...attr} style={{ display: 'inline-block' }}></span>
)

//h1-h5
const H1 = (attr) => {
    let { value, ...other } = attr
    return <h1 {...other}>{value}</h1>
}

const H2 = (attr) => {
    let { value, ...other } = attr
    return <h2 {...other}>{value}</h2>
}

const H3 = (attr) => {
    let { value, ...other } = attr
    return <h3 {...other}>{value}</h3>
}

const H4 = (attr) => {
    let { value, ...other } = attr
    return <h4 {...other}>{value}</h4>
}

const H5 = (attr) => {
    let { value, ...other } = attr
    return <h5 {...other}>{value}</h5>
}

//a标签
const Link = (attr) => {
    let { value, ...other } = attr
    return <a {...other} style={{ display: 'inline-block' }}>{value}</a>
}

//NOTE:分成三类=》1、单个使用的可嵌套组件  2、两个配合使用的可嵌套组件 3、不可嵌套的单个组件
export const GlobalComponent = {
    //组件区
    field: {
        Rate,
        Input,
        MonthPicker,
        RangePicker,
        WeekPicker,
        Link,
        H1,
        H2,
        H3,
        H4,
        H5,
        Divider,

        //echart
        ReactEcharts,
        //G2plot组件
        LineChart,  //折线图
        ColumnChart, //柱状图
        PieChart //饼状图
    },
    //容器区 
    //单个使用
    sglContainer: {
        Div,
        Span,
        Card,

    },
    //多个配合使用
    mulContainer: {
        Row,
        Col,
        PanelGroup,
        Collapse,
        Panel,
        Tabs,
        TabPane,
    }

}

//FIXME:添加撤销功能

function EditPage(props) {

    const store = useContext(AppContext)
    const [state, dispatch] = store
    // console.log({state})
    const { index } = state.pageReducer


    const sortable = useRef(null);
    // 公用样式
    const CommonStyle = {
        position: 'relative',
        let: 0,
        top: 0,
        // zIndex: -1
    }


    //边框
    const [borderOpen, setBorderOpen] = useState(true) //TODO

    //当前节点
    const [editCom, setEditCom] = useState({})
    // const [testCom, setTestCom] = useState(null)

    // //当点击Echarts时 EditorList 面板隐藏 
    // const [echartShow,setEchartShow] = useState(false)
    //数据源  TODO考虑修改为Reducer统一管理
    //NOTE:数据源的title，为组件树视图组件提供节点显示文字
    const [data, setData] = useState(index)


    //echartOption
    const [echartOption, setEchartOption] = useState(props.echartOption)

    //g2plot
    const [chartConfig, setChartConfig] = useState({})

    //若G2plot配置配置改动则更新data
    useEffect(() => {

        if (Object.keys(chartConfig).length) {

            let currentIndex = editCom.getAttribute('data-index')
            let newData = updateData(currentIndex, data, chartConfig)
            setData(newData)
        }
    }, [chartConfig])

    //栅格布局配置
    const [rowColConfig, setRowColConfig] = useState({})
    //折叠面板Collapse/标签页Tabs配置
    const [layoutConfig, setLayoutConfig] = useState({})
    //防止重复点击触发多次
    useEffect(() => {
        if (Object.keys(editCom).length) {
            let currentName = editCom.getAttribute('data-name')
            //获取组件的路径path
            let path = editCom.getAttribute('data-index')
            //初始化值
            const parent = getObjParent(path, data)
            //NOTE:初始化布局属性配置
            //若当前有编辑组件 并且选中的组件为Row
            if (currentName === 'Row') {
                let colSpan = parent.children.map(item => item.attr.span)
                let newObj = {
                    gutter: parent.attr.gutter,
                    colSpan: colSpan,
                    delIndex: null
                }
                setRowColConfig(newObj)
            } else if (currentName === "Collapse" || currentName === "Tabs") {
                let referenceList = { "Collapse": "header", "Tabs": "tab" }
                //initData=>["title1","title2","title3"...]
                let initData = parent.children.map(item => (item.attr[referenceList[currentName]]))
                setLayoutConfig({ 'contents': initData, 'type': currentName, 'delIndex': null })
            }

        }
    }, [editCom])




    //栅格布局配置改变 更新data 则更新视图
    useEffect(() => {

        if (Object.keys(editCom).length && Object.keys(rowColConfig).length > 0) {
            let currentIndex = editCom.getAttribute('data-index')
            let newData = updateRowColConfig(currentIndex, data, rowColConfig)
            //console.log("onChangeRowColConfig", newData)
            setData(newData)
        }
    }, [rowColConfig])


    //布局配置改变 更新data 则更新视图
    useEffect(() => {
        if (Object.keys(editCom).length && Object.keys(layoutConfig).length > 0) {
            console.log('useEffect layoutConfig !!')
            let currentIndex = editCom.getAttribute('data-index')
            console.log({ layoutConfig })
            let newData = updateLayoutConfig(currentIndex, data, layoutConfig)
            console.log({ newData })
            setData(newData)
        }
    }, [layoutConfig])

    const sortableOption = {
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65,

        group: {
            name: 'formItem',
            pull: true,
            put: true,
        },
    }

    //拖拽添加触发事件
    const sortableAdd = (evt) => {
        let nameOrIndex = ""
        // if(evt.clone.getAttribute('class') === 'panelGroup'){
        //     nameOrIndex = evt.clone.children[0].getAttribute('data-index')
        // }else{
        // }
        nameOrIndex = evt.clone.getAttribute('data-index')


        const parentPath = evt.path[1].getAttribute('data-index')

        const { newIndex } = evt
        const newPath = parentPath ? `${parentPath}-${newIndex}` : newIndex
        if (isPath(nameOrIndex)) {  //交换不同级别节点
            const oldIndex = nameOrIndex
            const dragItem = getCloneItem(oldIndex, data)
            if (indexToArray(oldIndex) > indexToArray(newPath)) {
                let newTreeData = itemRemove(oldIndex, data)
                newTreeData = itemAdd(newPath, newTreeData, dragItem)
                setData(newTreeData)
                return
            }
            let newData = itemAdd(newPath, data, dragItem)
            newData = itemRemove(oldIndex, newData)
            setData(newData)
            return
        } else { //从属性面板加入节点

            const id = nameOrIndex
            //从定义的属性面板中查找
            let newItem = _.cloneDeep(soundData.find(item => (item.name === id)))
            //FIXME:去掉非必要的属性
            if (newItem.hasOwnProperty('configAttr')) {
                let { configAttr, ...other } = newItem
                newItem = { ...other }
            }

            //如果是单个组件则添加随机生成的id,容器不添加id
            if (!newItem.hasOwnProperty('children')) {
                newItem = { ...newItem, id: GenNonDuplicateID() }
            }
            //g2ChartType 是G2plot图表的类型 若当前组件为G2plot的组件则添加其初始值属性到data中
            if (g2ChartType.includes(id)) {
                newItem = { ...newItem, attr: { ...newItem.attr, ...g2DefaultVaules[id] } }
            }
            //针对有两层嵌套的组件,例如Row
            if (newItem.hasOwnProperty('children') && newItem.children.length > 0) {
                newItem.children = newItem.children.map((item, index) => ({ ...item }))
            }
            console.log("add", { newPath, data, newItem })
            let Data = itemAdd(newPath, data, newItem)
            console.log("add2", Data)
            setData(Data)
        }

    }
    //块点击事件
    const onBlockClick = (evt) => {
        evt.stopPropagation()

        console.log("==onBlockClick===", evt.currentTarget)
        // const currentSelectedIndex = evt.currentTarget.getAttribute('data-index')
        let currentTarget = evt.currentTarget
        // //如果点击Echart 隐藏EditorList面板
        // if(currentTarget.getAttribute('data-name') === 'ReactEcharts'){
        //     setEchartShow(!echartShow)
        // }else{ //否则显示EditorList面板
        //     if(echartShow){
        //         setEchartShow(false)
        //     }
        // } 
        let beforeIndex = Object.keys(editCom).length && editCom.getAttribute('data-index') || ''//前一次点击的块序号
        const currentIndex = currentTarget.getAttribute('data-index')  //当前点击的块序号
        //当再次点击时不是同一块时触发更新
        if (!beforeIndex || (beforeIndex && beforeIndex !== currentIndex)) {
            const currentName = currentTarget.getAttribute('data-name')
            //若当前点击的块是G2plot
            if (g2ChartType.includes(currentName)) {
                const beforeId = editCom['data-id'] || '' //前一次点击的块Id,若前一次点击的块没有Id则置''
                const currentId = currentTarget.getAttribute('data-id')
                if (beforeId !== currentId) {
                    //根据当前节点index 查找data中chart的属性 更新属性面板
                    const childItem = getCloneItem(currentIndex, data)
                    //取出除去style属性的其他值
                    let { style, ...otherAttr } = childItem.attr
                    setChartConfig(otherAttr)
                }
            }
            setEditCom(currentTarget)
        }
    }
    //样式改变触发更新视图
    const onEditStyleChange = (evt) => {

        let newStyle = styleStringToObject(Object.values(evt.cssValue)[0].css.default)
        const index = editCom.getAttribute('data-index')
        let newData = updateStyles(index, data, newStyle)
        setData(newData)

    }

    //FIXME:拖住排序方法
    const sortableUpdate = evt => {
        //console.log("sortableUpdate")
        const { newIndex, oldIndex } = evt

        const parentPath = evt.path[1].getAttribute('data-index')
        let parent = parentPath ? getItem(parentPath, data) : data
        const dragItem = parent[oldIndex]

        parent = update(parent, {
            $splice: [[oldIndex, 1], [newIndex, 0, dragItem]]  //删除旧的节点，增加新的节点
        })

        const Data = parentPath ? setInfo(parentPath, data, parent) : parent
        setData(Data)
    }
    // //组件容器列表 针对Row Col 处理
    // const comContainerList =["Row","Col"]   
    //渲染节点
    const loop = (arr, index) => {
        let currentIndex = ""
        if (Object.keys(editCom).length) {
            currentIndex = editCom.getAttribute('data-index')
        }
        return arr.map((item, i) => {
            const indexs = index === '' ? String(i) : `${index}-${i}`
            const attr = item.attr
            // let flagContainer = comContainerList.some(i=>i===item.name)
            const allStyles = {
                style: Object.assign({}, attr['style'], CommonStyle)
            }
            //属性合并
            const attrAll = Object.assign(attr, allStyles)



            //NOTE:分成三类=》1、单个使用的可嵌套组件  2、两个配合使用的可嵌套组件 3、不可嵌套的单个组件


            //1、例如Div、Card
            if (item.children && Object.keys(GlobalComponent.sglContainer).includes(item.name)) {
                const ComponentInfo = GlobalComponent.sglContainer[item.name]
                return (
                    <ComponentInfo {...attr}
                        key={indexs}
                        data-name={item.name}
                        //每个框增加蒙版  控制边框显示
                        className={
                            cx(styles.mask,
                                {
                                    [styles.borderShow]: borderOpen,
                                    [styles.selected]: indexs === currentIndex
                                }
                            )}
                        data-index={indexs} onClick={evt => onBlockClick(evt)}

                    >
                        <div data-index={indexs} onClick={evt => onBlockClick(evt)} >
                            <Sortable
                                key={uniqueId()}
                                style={{
                                    minHeight: 20,
                                    // margin: 10
                                    minWidth: 50
                                }}

                                ref={sortable}
                                options={{
                                    ...sortableOption,
                                    onUpdate: evt => sortableUpdate(evt),
                                    onAdd: evt => sortableAdd(evt),
                                }}
                            >

                                {loop(item.children, indexs)}

                            </Sortable>
                        </div>

                    </ComponentInfo>)
            }
            //2、组件容器 例如针对栅格布局Row Col /折叠面板Collapse/ 标签页Tabs的处理 
            //FIXME:Collapse和Tabs要记录当前激活面板
            else if (item.children && Object.keys(GlobalComponent.mulContainer).includes(item.name)) {

                const ComponentInfo = GlobalComponent.mulContainer[item.name]
                //组件选择参照表
                const referenceList = { 'Row': 'Col', 'Collapse': 'Panel', 'Tabs': 'TabPane' }

                //子组件
                const ChildComponent = GlobalComponent.mulContainer[referenceList[item.name]]
                return (
                    <div
                        data-name={item.name}
                        data-index={indexs}
                        key={indexs}
                        className={
                            cx(styles.mask,
                                {
                                    [styles.borderShow]: borderOpen,
                                    [styles.selected]: indexs === currentIndex
                                }
                            )}
                        onClick={evt => onBlockClick(evt)}
                    >
                        <ComponentInfo
                            {...attrAll}

                        >
                            {item.children.map((field, i) => {
                                const index = `${indexs}-${i}`
                                return (

                                    <ChildComponent
                                        {...field.attr}
                                        key={index}  //map需要每个child设置key

                                    >
                                        <div
                                            className={
                                                cx(styles.mask,
                                                    {
                                                        [styles.borderShow]: borderOpen,
                                                        [styles.selected]: index === currentIndex
                                                    }
                                                )}

                                            data-index={index}
                                            onClick={evt => onBlockClick(evt)}

                                        >
                                            <Sortable
                                                key={uniqueId()}
                                                style={{
                                                    minHeight: 100, //默认最小高度

                                                }}
                                                ref={sortable}
                                                options={{
                                                    ...sortableOption,
                                                    onAdd: evt => sortableAdd(evt),

                                                }}
                                                data-index={index}
                                            >
                                                {loop(field.children, index)}
                                            </Sortable>
                                        </div>
                                    </ChildComponent>

                                )
                            })}
                        </ComponentInfo>
                    </div>
                )
            }
            //3、单个组件 无嵌套
            else if (!item['children']) {
                const ComponentInfo = GlobalComponent.field[item.name]

                //ReactEcharts
                if (item.name === 'ReactEcharts') {
                    return (
                        <div data-index={indexs} key={indexs} data-name={item.name} data-id={item.id}
                            className={
                                cx(styles.mask,
                                    {
                                        [styles.borderShow]: borderOpen,
                                        [styles.selected]: indexs === currentIndex
                                    }
                                )} onClick={evt => onBlockClick(evt)} >
                            <ReactEcharts {...attrAll} option={echartOption} />
                        </div>
                    )
                }
                //  else if(item.name === 'LineChart'){  //G2plot
                //     return (
                //         <div data-index={indexs} 
                //             key={indexs} 
                //             data-name={item.name}
                //             data-id ={item.id}
                //             className={
                //                 cx(styles.mask,
                //                     {
                //                         [styles.borderShow]: borderOpen,
                //                         [styles.selected]: indexs === currentIndex
                //                     }
                //                 )} onClick={evt => onBlockClick(evt)} >
                //             <LineChart {...attrAll}  onMount={handleChartMount} />
                //         </div>
                //     )
                // }
                else {
                    return (

                        item.name !== 'Link' &&
                        <div data-index={indexs}
                            key={item.id}
                            data-name={item.name}
                            data-id={item.id}  //识别组件的唯一id
                            className={
                                cx(styles.mask,
                                    {
                                        [styles.borderShow]: borderOpen,
                                        [styles.selected]: indexs === currentIndex
                                    }
                                )} onClick={evt => onBlockClick(evt)} >
                            <ComponentInfo {...attrAll} />
                        </div> ||
                        //对于行内元素（例如a标签）进行特殊处理
                        <ComponentInfo {...attrAll}
                            data-index={indexs}
                            key={item.id}
                            data-name={item.name}
                            data-id={item.id}  //识别组件的唯一id
                            className={
                                cx(styles.mask,
                                    {
                                        [styles.borderShow]: borderOpen,
                                        [styles.selected]: indexs === currentIndex
                                    }
                                )} onClick={evt => onBlockClick(evt)}


                        />

                    )
                }
            }


        })
    }
    //边框显示改变
    function borderOpenChange(checked) {
        setBorderOpen(checked)
    }
    // 删除元素
    function onDelete() {
        let currentIndex = ""
        if (Object.keys(editCom).length) {
            currentIndex = editCom.getAttribute('data-index')
            setData(itemRemove(currentIndex, data))

        }

    }
    // 复制元素
    function onCopy() {
        let currentIndex = ""
        if (Object.keys(editCom).length) {
            currentIndex = editCom.getAttribute('data-index')
            setData(update(data, { $push: [getCloneItem(currentIndex, data)] }))
        }
    }
    //清空
    function onClear() {
        if (data.length) {
            setData([])
            setEditCom({})  //清空当前编辑的组件
        }
    }

    let currentName = Object.keys(editCom).length && editCom.getAttribute('data-name') //获取当前编辑的组件名称

    //使用useMemo对栅格布局做了优化
    const CreateRowColConfig = useMemo(() => <RowColConfig data={rowColConfig} setData={setRowColConfig} />, [rowColConfig])


    //使用useMemo对Collapse /Tabs 布局做了优化
    const CreateLayoutConfig = useMemo(() => <LayoutConfig data={layoutConfig} setData={setLayoutConfig} />, [layoutConfig])

    //获编辑取节点的属性
    // console.log('editCom',editCom)

    //获取当前组件的路径path
    let path = Object.keys(editCom).length && editCom.getAttribute('data-index')
    //根据路径获取Data当前节点
    const parent = path && getObjParent(path, data)
    // console.log("11111111",{data})
    return (
        <>
            {/* 附加属性 */}

            <section className={styles.addAttrPanel}>
                <div><label>显示边框 :</label><Switch checkedChildren="开" unCheckedChildren="关" checked={borderOpen} onChange={(checked) => { borderOpenChange(checked) }} /></div>
                <div><Button type="primary" href={"/review"}>预览</Button></div>
            </section>

            <div className={styles.editPage}>
                <Row gutter={8}>
                    <Col span={6} className={styles.attrPanel}>
                        {/* 属性面板 */}
                        <AttrPanel editCom={editCom} onDelete={onDelete} onCopy={onCopy} onClear={onClear} data={data} setData={setData} chartConfig={chartConfig} setChartConfig={setChartConfig} echartOption={echartOption} setEchartOption={setEchartOption} />
                    </Col>
                    <Col span={12} className={styles.editPanel}>
                        {/* 可视化编辑区 */}
                        <main id="editorPage">
                            <h3 className={styles.flag}>放置内容</h3>
                            <Sortable
                                ref={sortable}

                                options={{
                                    ...sortableOption,
                                    onUpdate: evt => sortableUpdate(evt),
                                    onAdd: evt => sortableAdd(evt),

                                }}
                                key={uniqueId()}
                            >
                                {loop(data, '')}
                            </Sortable>
                        </main>
                    </Col>
                    <Col span={6} className={styles.configPanel}>
                        <Tabs defaultActiveKey="RowColConfig">
                            {/* 显示视图的结构树 */}
                            <TabPane
                                tab="组件树"
                                key="dragTree"
                            >
                                <DragTree data={data} setData={setData} />
                            </TabPane>
                            {/* 栅格布局属性设置面板 */}
                            <TabPane
                                tab="布局属性设置"
                                key="LayoutConfig"
                            >
                                {/* RowCol配置 */}
                                {Boolean(Object.keys(rowColConfig).length) && currentName === 'Row' && CreateRowColConfig}
                                {/* Collapse /Tabs 配置*/}
                                {Boolean(Object.keys(layoutConfig).length) && (currentName === 'Collapse' || currentName === 'Tabs') && CreateLayoutConfig}
                                {/* 通用配置 */}
                                {currentName && configAttr.hasOwnProperty(currentName) && <CommConfig config={configAttr[currentName]} currentValue={parent.attr} />}
                            </TabPane>
                            {/* 样式属性设置面板 */}
                            <TabPane
                                tab={
                                    <span>
                                        样式属性设置
                                        </span>
                                }
                                key="StyleConfig"
                            >
                                {/* 样式属性编辑区 */}
                                {/* FIXME:这里面修改了全局的蚂蚁组件折叠面板的样式 */}
                                {/* {Boolean(Object.keys(editCom).length) && (
                                    <EditorList
                                        editorElem={editCom}
                                        onChange={onEditStyleChange}
                                        // isMobile={this.state.state === 'mobile'}
                                        rootSelector="#editorPage"
                                    />
                                )} */}
                            </TabPane>

                        </Tabs>
                    </Col>
                </Row>
            </div>
        </>
    );

}

export default EditPage;

        // https://juejin.im/post/5dabb52bf265da5b616de75d
        //https://xinyu198736.github.io/antd-visual-editor/#/?_k=u97lci
        //https://github.com/nihaojob/DragLayout
