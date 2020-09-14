/*
 * @Author: zting
 * @LastEditors: zting
 * @Description: file content
 */
import { InputNumber, Col } from 'antd'
import { MinusCircleOutlined } from '@ant-design/icons'

const isEqual = (prevProps, nextProps) => {
    // console.log('isEqual', {prevProps, nextProps})
    if (prevProps.item !== nextProps.item) {
        return false;
    }
    return true;
}


// const ColItem = (props) => {
//     const { item, index, onColChange, onColDelete } = props
//     return useMemo(() => {
//         return (<Col span={24}>
//             {////console.log("item-index", item, index)}
//             <InputNumber value={item} min={0} max={24} onChange={(value) => onColChange(value, index)} />
//             &nbsp;
//             <MinusCircleOutlined style={{ color: 'red' }} onClick={() => onColDelete(index)} />

//         </Col>
//         )
//     },[item])
// }


const ColItem = (props) => {
    const { item, index, onColChange, onColDelete } = props

        return (
        <Col span={24}>
            {console.log({item,index})}
            <InputNumber value={item} min={0} max={24} onChange={(value) => onColChange(value, index)} />
            &nbsp;
            <MinusCircleOutlined style={{ color: 'red' }} onClick={() => onColDelete(index)} />
        </Col>
        )
}
// export default memo(ColItem, isEqual)

export default ColItem
