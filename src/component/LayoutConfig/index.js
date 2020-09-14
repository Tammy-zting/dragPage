// 针对 Collapse、Tabs属性设置
import { Input, Button } from 'antd'
import styles from './index.less'
import { MinusCircleOutlined } from '@ant-design/icons'


function LayoutConfig({ data, setData }) {

    let { contents ,type} = data
    //标题内容改变
    function onValueChange(e) {
        let index = Number(e.target.getAttribute('data-index'))
        let value = e.target.value
        let newValue = [...contents.slice(0, index).concat(value), ...contents.slice(index+1,contents.length)]
        console.log("LayoutConfig", newValue)
        setData({...data,contents:newValue,delIndex:null})
    }

    //添加面板
    function onAdd() {
        console.log("LayoutConfig", { data })
        //判断是Collapse还是Tabs
        //Collapse
        if (type === 'Collapse') {
            setData({...data,contents:[...contents, `This is panel header ${contents.length + 1}`],delIndex:null})
        }
        //Tabs
        else {
            setData({...data, contents:[...contents, `This is tab header ${contents.length + 1}`],delIndex:null})
        }     
    }
    //删除面板
    function onDelete(index) {
        const newData = [...contents.slice(0, index), ...contents.slice(index + 1, data.length)]
        // delIndex 标记删除的节点下标
        setData({...data,contents:newData,delIndex:index})
    }
    return (
        <div className={styles.layout}>
            <section>
                {contents.map((item, index) => (
                    <div key={index} className={styles.titleBlcok}>
                        <label>面板{index + 1} ：</label><Input value={item} data-index={index} onChange={onValueChange} />
                        &nbsp;
                        <MinusCircleOutlined style={{ color: 'red' }} onClick={onDelete.bind(this, index)} />
                    </div>
                ))}
            </section>
            <Button type="primary" onClick={onAdd}>添加面板</Button>
        </div>
    )
}

export default LayoutConfig