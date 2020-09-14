//FIXME:输入防抖 
// 栅格布局配置组件
import { InputNumber, Button} from 'antd'
import ColItem from './colItem'
import { MinusCircleOutlined, SettingOutlined, ToolOutlined } from '@ant-design/icons'
import styles from './index.less'
import uniqueId from 'lodash/uniqueId'
// import isequal from 'lodash.isequal'


//data=> {gutter:8,colSpan:[1,2,3,4],delIndex:null}


function RowColConfig({ data, setData }) {

    //gutter这个值可能是number水平间距/array[水平间距，垂直间距]
    let { gutter, colSpan } = data


    //默认左右间隔等于栅格间隔
    let leftRightGutter = gutter
    //判断传入的栅格间隔是否是数组,如果是数组则应该显示上下间隔
    const isTopBottomShow = Array.isArray(gutter)
    //当传入的栅格间隔是数组时取数组的第一个值
    if (isTopBottomShow) {
        leftRightGutter = gutter[0]
        var TopBottomGutter = gutter[1]
    }

    //间隔变化
    function onGutterChange(value, i) {
        // ////console.log("onColChange",value)
        //修改上下间隔
        if (i === 1) {
            setData({ gutter: [leftRightGutter, value], colSpan, delIndex: null })
        } else if (isTopBottomShow) {   //修改左右间隔 并且传入的值是数组
            setData({ gutter: [value, TopBottomGutter], colSpan, delIndex: null })
        } else {  //修改左右间隔  并且传入的值是number类型
            setData({ gutter: value, colSpan, delIndex: null })
        }
    }
    // //列值变化
    function onColChange(value, i) {
        let newColSpan = [...colSpan.slice(0, i).concat(value), ...colSpan.slice(i + 1, colSpan.length)]
        setData({ gutter, colSpan: newColSpan, delIndex: null })
    }


    // const onColChange = useCallback( (value, i)=> {
    //     console.log('onColChange',value,i)

    //     let newColSpan = [...colSpan.slice(0, i).concat(value), ...colSpan.slice(i + 1, colSpan.length)]
    //     ////console.log('newColSpan',newColSpan)

    //     setData({ gutter, colSpan: newColSpan, delIndex: null })
    // }, [])

    //列删除

    const onColDelete = (index) => {
        const newColSpan = [...colSpan.slice(0, index), ...colSpan.slice(index + 1, colSpan.length)]
        // delIndex 标记删除的节点下标
        setData({ gutter, colSpan: newColSpan, delIndex: index })
    }



    //添加列
    function onAddCol() {
        setData({ gutter, colSpan: [...colSpan, 8], delIndex: null })
    }

    return (
        <div className={styles.rowCol}>
            {/* RowCol 配置 */}
            <section>
                <h4><SettingOutlined /> 栅格间隔</h4>
                <div><label>水平间隔 ：</label><InputNumber value={leftRightGutter} min={0} onChange={(value) => onGutterChange(value, 0)} /></div>
                <div><label>垂直间隔 ：</label><InputNumber value={TopBottomGutter || 0} min={0} onChange={(value) => onGutterChange(value, 1)} /></div>
            </section>
            <section>
                <h4><ToolOutlined /> 列配置项</h4>
                {/* //FIXME: 修改一个值 整个列表重新渲染 */}
                {colSpan.map((item, index) => (
                    <div key={uniqueId()}>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                        {/* FIXME:优化箭头函数 */}
                        <InputNumber value={item} min={0} max={24} onChange={(value) => onColChange(value, index)} />&nbsp;
                        <MinusCircleOutlined style={{ color: 'red' }} onClick={onColDelete.bind(this, index)} />
                    </div>
                ))}
                <div><Button type="primary" onClick={onAddCol}>添加列</Button></div>
            </section>
            {/* Collapse 配置 */}

        </div>
    )
}


// export default memo(RowColConfig,isEqual)
export default RowColConfig
