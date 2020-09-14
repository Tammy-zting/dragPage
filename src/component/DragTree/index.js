/*
 * @Author: zting
 * @LastEditors: zting
 * @Description: file content
 */
import { Tree } from 'antd';
import {CreateNewTree} from '../utils'
import styles from './index.less'
//NOTE:扩展 添加可搜索功能
function DragTree ({data,setData}){
  

    //重新构造tree,对data进行加工,加入key,key标识节点的位置
    const newData = CreateNewTree(data)

    // const onDrop = info => {
    //     console.log(info);

    //     const dropKey = info.node.props.eventKey;
    //     const dragKey = info.dragNode.props.eventKey;
    //     const dropPos = info.node.props.pos.split('-');
    //     const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    //     const loop = (dataSource, key, callback) => {
    //         for (let i = 0; i < dataSource.length; i++) {
    //             if (dataSource[i].key === key) {
    //                 return callback(dataSource[i], i, dataSource);
    //             }
    //             if (dataSource[i].children) {
    //                 loop(dataSource[i].children, key, callback);
    //             }
    //         }
    //     };
    //     const dataSource = [...data];

    //     // Find dragObject
    //     let dragObj;
    //     loop(dataSource, dragKey, (item, index, arr) => {
    //         arr.splice(index, 1);
    //         dragObj = item;
    //     });

    //     if (!info.dropToGap) {
    //         // Drop on the content
    //         loop(dataSource, dropKey, item => {
    //             item.children = item.children || [];
    //             // where to insert 示例添加到尾部，可以是随意位置
                
    //             item.children.push(dragObj);
                
    //         });
    //     } else if (
    //         (info.node.props.children || []).length > 0 && // Has children
    //         info.node.props.expanded && // Is expanded
    //         dropPosition === 1 // On the bottom gap
    //     ) {
    //         loop(dataSource, dropKey, item => {
    //             item.children = item.children || [];
    //             // where to insert 示例添加到头部，可以是随意位置
              
    //             item.children.unshift(dragObj);
                
    //         });
    //     } else {
    //         let ar;
    //         let i;
    //         loop(dataSource, dropKey, (item, index, arr) => {
    //             ar = arr;
    //             i = index;
    //         });
    //         if (dropPosition === -1) {
    //             ar.splice(i, 0, dragObj);
    //         } else {
    //             ar.splice(i + 1, 0, dragObj);
    //         }
    //     }

    //     setData(dataSource)
    // }


    return (
        <div className={styles.dragTree}>
        <Tree
        // draggable  开启可拖拉节点的功能 FIXME:控制一些节点不可增加子节点
            showLine
            blockNode
            // onDrop={onDrop}
            treeData={newData}
        />
        </div>
    );
    
}

export default DragTree