import React, { useState ,useEffect} from 'react';
import { Tree } from 'antd';
import {
  CheckOutlined,
  EditOutlined,
  PlusOutlined,
  MinusOutlined,
  CloseOutlined,

} from '@ant-design/icons';
import styles from './index.less';
import update from 'immutability-helper';

const { TreeNode } = Tree;

function EditableTree() {


  // const [state,dispatch] = useContext(AppContext)

  const [data, setData] = useState([
    {
      value: 'Root',
      defaultValue: 'Root',
      key: '0-1',
      parentKey: '0',
      isEditable: true,
      // children:[{
      //   defaultValue: "default",
      //   isEditable: false,
      //   key: "0-1-1",
      //   parentKey: "0-1",
      //   value: "default"
      // }]
    }
  ])

  const [expandedKeys, setExpandedKeys] = useState([])

  useEffect(() => {
    onExpand([])
  },[])

  const onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);

    setExpandedKeys(expandedKeys)
  }

  const renderTreeNodes = data => data.map((item) => {
    let renderTitle
    if (item.isEditable) {
      renderTitle = (
        <div>
          <input
            className={styles.inputField}
            value={item.value}
            onChange={(e) => onChange(e, item.key)} />
          <CloseOutlined style={{ marginLeft: 10 }} onClick={() => onClose(item.key, item.defaultValue)} />
          <CheckOutlined style={{ marginLeft: 10 }} onClick={() => onSave(item.key)} />
        </div>
      );
    } else {
      renderTitle = (
        <div className={styles.titleContainer}>
          <span>
            {item.value}
          </span>
          <span className={styles.operationField} >
            <EditOutlined style={{ marginLeft: 10 }} onClick={() => onEdit(item.key)} />
            <PlusOutlined style={{ marginLeft: 10 }} onClick={() => onAdd(item.key)} />
            {item.parentKey === '0' ? null : (<MinusOutlined style={{ marginLeft: 10 }} onClick={() => onDelete(item.key)} />)}
          </span>
        </div>
      )
    }

    if (item.children) {
      return (
        <TreeNode title={renderTitle} key={item.key} dataRef={item}>
          {renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    let {title,...otherItem} = item
    return <TreeNode {...otherItem} title={renderTitle} />;
  })


  const onAdd = (e) => {
    console.log('add');
    setData(addNode(e, data));
    // 防止expandedKeys重复
    setExpandedKeys([...new Set([...expandedKeys, e])])
  }

  const addNode = (key, data) => data.map((item) => {
    if (item.key === key) {

      if (item.children) {
      
        return update(item, {
          children: {
            $push: [{
              value: 'default',
              defaultValue: 'default',
              key: key + Math.random(100), // 这个 key 应该是唯一的。 Tip: The key should be unique
              parentKey: key,
              isEditable: false
            }]
          }
        })

      } else {
        console.log({key})
        console.log("addNode",item)
      
        return {
          ...item,
          children:[{
            value: 'default',
            defaultValue: 'default',
            key: key + Math.random(100),
            parentKey: key,
            isEditable: false
          }
        ]
        } 
        // return update(item, {
        //   children: {
        //     $push: [{
        //       value: 'default',
        //       defaultValue: 'default',
        //       key: key + Math.random(100),
        //       parentKey: key,
        //       isEditable: false
        //     }]
        //   }
        // })
      }
    }
    if (item.children) {
      let data = addNode(key, item.children)
      return {...item,...data}
    }
  })

  const onDelete = (key) => {
    console.log('delete');
    setData(deleteNode(key, data));
  }

  const deleteNode = (key, data) => data.map((item, index) => {
    if (item.key === key) {
      console.log('delete update',data ,update(data,{$splice:[[index,1]]}))
      return update(data,{$splice:[[index,1]]});
    } else {
      if (item.children) {
        deleteNode(key, item.children)
      }
    }
  })

  const onEdit = (key) => {
    console.log('edit');
    setData(editNode(key, data))
  }

  const editNode = (key, data) => data.map((item) => {
    let newData
    if (item.key === key) {
      newData = update(item,{$merge:{isEditable:true,value:item.defaultValue}})
    } else {
      newData = update(item,{$merge:{isEditable:false,value:item.defaultValue}})
    }
    //Tip: Must have, when a node is editable, and you click a button to make other node editable, the node which you don't save yet will be not editable, and its value should be defaultValue 
    // 当某节点处于编辑状态，并改变数据，点击编辑其他节点时，此节点变成不可编辑状态，value 需要回退到 defaultvalue
    if (item.children) {
      editNode(key, item.children)
    }
    return newData
  })

  const onClose = (key, defaultValue) => {
    console.log('close');
    setData(closeNode(key, defaultValue, data))
  }

  const closeNode = (key, defaultValue, data) => data.map((item) => {
    let newData
    newData = update(item,{isEditable:{$set:false}})
    if (item.key === key) {
      newData = update(newData,{value:{$set:defaultValue}})
    }
    if (item.children) {
      closeNode(key, defaultValue, item.children)
    }
    return newData
  })

  const onSave = (key) => {
    console.log('save')
    setData(saveNode(key, data))
  }

  const saveNode = (key, data) => data.map((item) => {
    let newData
    if (item.key === key) {
        newData = update(item,{$merge:{defaultValue:item.value,isEditable:false}})
    }
    if (item.children) {
      saveNode(key, item.children)
    }
    return newData
  })

  const onChange = (e, key) => {
    console.log('onchange')
    setData(changeNode(key, e.target.value, data))
  }

  const changeNode = (key, value, data) => data.map((item) => {
    let newData
    if (item.key === key) {
      newData = update(item,{value:{$set:value}})
    }
    if (item.children) {
      changeNode(key, value, item.children)
    }
    return newData
  })

 
    return (
      <div>
        <Tree expandedKeys={expandedKeys} selectedKeys={[]} onExpand={onExpand}
          showLine
          blockNode>
          {renderTreeNodes(data)}
        </Tree>
      </div>
    )
  
}

export default EditableTree;
