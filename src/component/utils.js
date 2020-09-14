/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-09 17:50:14
 * @LastEditTime: 2019-10-12 14:45:21
 * @LastEditors: Please set LastEditors
 */

import _ from 'lodash';

/**
 * 将下标数组转为数组
 * @param {String|Number} pathStr 字符串类型的树路径 例：2-3-4
 * return {Array}  数组类型
 */
const indexToArray = pathStr => `${pathStr}`.split('-').map(n =>n);

/**
 * 
 * @param {String}  index  下标路径
 * @param {Array}  cards  treeData
 * @return {object}  返回详情对象
 */
const getCloneItem = (index, cards) => {
    const arr = indexToArray(index);
    let result = {};
    arr.forEach(n => {
        result = cards[n];  
         if(result.children){
            cards = result.children;
         }
    });
    return _.cloneDeep(result);
}
/**
 * 根据下标获取父节点
 * @param {String}   index  下标路径
 * @param {Array}    cards  treeData
 * @return {object}  返回详情对象
 */
const getItem = (pathIndex, cards) => {
    const arr = indexToArray(pathIndex)
    // 嵌套节点删除
    let parent;
    if (arr.length === 0) {
        return cards
    }
    arr.forEach((item, index) => {
        if (index === 0) {
            parent = cards[item]
        } else {
            parent = parent.children[item]
        }
    })
     if (parent.children) return parent.children  //ztt
    return parent
}
/**
 * 
 * @param {string} pathIndex  传入路径 "0" 
 * @param {array} cards 传入数据源 [{...},{...}]
 * @return {object}   数组的第一个对象{}
 */
const getObjParent = (pathIndex, cards) => {
    //若pathIndex不是数组则转换为数组
    const arr = Array.isArray(pathIndex) ? pathIndex :indexToArray(pathIndex)
    // 嵌套节点删除
    let parent;
    arr.forEach((item, index) => {
        if (index === 0) {
            parent = cards[item]
        } else {
            parent = parent.children[item]
        }
    })
    return parent
}

/**
 * 
 * @param {string} pathIndex  传入路径 "0" 
 * @param {array} cards 传入数据源 [{...},{...}]
 * @return {*}   整个数组
 */
const getParent = (pathIndex, cards) => {

    const arr = Array.isArray(pathIndex) ? pathIndex :indexToArray(pathIndex)
    // 嵌套节点删除
    let parent;
    arr.pop()
    if (arr.length === 0) {
        return cards
    }
    arr.forEach((item, index) => {
        if (index === 0) {
            parent = cards[item]
        } else {

            parent = parent.children[item]
        }
    })
    if (parent.children) return parent.children
    
    return parent
}
/**
 * 根据路径删除数据
 * @param {*} index 
 * @param {*} cards 
 * @return {*} 
 */
const itemRemove = (index, cards) => {
    let cardsCopy = _.cloneDeep(cards) //ztt 深拷贝
    let parent = getParent(index, cardsCopy);                
    let arr = indexToArray(index)
    
    let getIndex = arr.pop()
    if (parent.children) {
        parent.children.splice(getIndex, 1)
        return parent
    }
  
    parent.splice(getIndex, 1)
    //处理删除Row里面只剩一个Col时把Row也删掉 ztt
    if(!parent.length && arr.length){  
        let flagIndex = arr[arr.length - 1]
        let cardsCopy = _.cloneDeep(cards) //ztt 深拷贝
        let grandfather = getParent(arr,cardsCopy)
        if(grandfather[flagIndex].name ==="Row"){
            grandfather.splice(flagIndex,1)
            return cardsCopy
        }
    }
    return cardsCopy
}
/**
 * 
 * @param {*} index 
 * @param {*} cards 
 * @param {*} item 
 */
const itemAdd = (index, cards, item) => {
    let cardsCopy = _.cloneDeep(cards) //ztt 深拷贝
    let parent = getParent(index, cardsCopy)
    let arr = indexToArray(index)
    let getIndex = arr.pop()
    if (parent.children) {
        parent.children.splice(getIndex, 0, item)
        return parent
    }
    parent.splice(getIndex, 0, item)
    return cardsCopy
}
/**
 * 根据index设置排序
 * @param {Array}  arrPath   节点路径的数组格式 
 * @param {Array}  treeData  树节点数据
 * @param {object} param   要替换的数据
 */
const setInfo = (arrPath, treeData, param) => {
    const arr = indexToArray(arrPath)
    treeData = _.cloneDeep(treeData);
    let parent;
    arr.forEach((item, index) => {
        if (index === 0) {
            parent = treeData[item]
        } else {
            parent = parent.children[item]
        }
    })
    parent.children = param
    return treeData
}

/**
 * 
 * @param {*} pathIndex 
 */
const isPath = pathIndex => {
    let result = true
    indexToArray(pathIndex).forEach(item => {
        if (isNaN(item)) {
            result = false
            return false
        }
    })

    return result
}
/**
 * 判断hover的路径是否为自己的子元素
 * @param {String} dragIndex 
 * @param {String} hoverIndex 
 */
const isChildrenPath = (dragIndex, hoverIndex) => {
    let dragIndexArr = String(dragIndex).split('-')
    let hoverIndexArr = String(hoverIndex).split('-')

    if (hoverIndexArr > dragIndexArr) {
        let sliceArr = hoverIndexArr.slice(0, dragIndexArr.length)
        if (sliceArr.join('-') === dragIndexArr.join('-')) {
            return true
        }
    }
    return false
}
/**
* 根据数组路径 生成所有父级别的路径
* @param {String} index 
*/
const generatePathArr = index => {
    let arr = []
    let indexArr = String(index).split('-');
    let data = Array.from(indexArr)

    indexArr.forEach((item, i) => {
        data.pop()
        arr.push(Array.from(data).join('-'))
    })
    arr.pop()
    return arr
}

// update  样式改变触发图表更新  根据路径寻找父节点  更改其attr中的style
const updateStyles = (index,data,newdata)=>{
    
    const arr = indexToArray(index)
    data = _.cloneDeep(data)
    let parent 
    arr.forEach((item,j)=>{
        if(j === 0){
            parent = data[item]
        }else{
            parent = parent[item]
        }

        if(parent.hasOwnProperty('children') && j+1<arr.length){
            parent = parent.children
        }
    })
    parent.attr.style={ ...parent['attr']['style'],...newdata}
    
    return data
}

//根据路径寻找父节点  更改其attr
const updateData = (index,data,newdata)=>{
    
    const arr = indexToArray(index)
    data = _.cloneDeep(data)
    let parent 
    arr.forEach((item,j)=>{
        if(j === 0){
            parent = data[item]
        }else{
            parent = parent[item]
        }

        if(parent.hasOwnProperty('children') && j+1<arr.length){
            parent = parent.children
        }
    })
    parent.attr={ ...parent['attr'],...newdata}
    
    return data
}
//FIXME:优化算法

//根据路径寻找父节点  更改其栅格布局配置
const updateRowColConfig = (pathIndex,data,newdata)=>{
 
    //若pathIndex不是数组则转换为数组
    const arr = Array.isArray(pathIndex) ? pathIndex :indexToArray(pathIndex)
    data = _.cloneDeep(data)
    let parent 
    arr.forEach((item,j)=>{
        if(j === 0){
            parent = data[item]
        }else{
            parent = parent[item]
        }
        //因为要修改到Row的属性 所以要控制parent到Row级别
        if(parent.hasOwnProperty('children') && j+1<arr.length){
            parent = parent.children
        }
    })
    //删除
    if(typeof(newdata.delIndex) === 'number'){
        parent.children.splice(newdata.delIndex,1)
    }else{ //更新
        parent.attr={...parent['attr'],gutter:newdata.gutter}
        let newDatalen = newdata.colSpan.length
        //如果传入的列数大于原数组 则添加列
        if(newDatalen >  parent.children.length){
            let addItem = {
                name:'Col',
                title:'列（Col）',
                // key:`${pathIndex}+${(newDatalen-1)}`,
                attr:{
                    span:null
                },
                children:[]
            }
            parent.children.push(addItem)
        }
        parent.children.forEach((item,i)=>{
            item.attr.span = newdata.colSpan[i]
        })   
    
    }

    return data
}


//根据路径寻找父节点  更改其栅格布局配置
const updateLayoutConfig = (pathIndex,data,newData)=>{
    let {contents,type,delIndex} = newData

    //若pathIndex不是数组则转换为数组
    const arr = Array.isArray(pathIndex) ? pathIndex :indexToArray(pathIndex)
    data = _.cloneDeep(data)
    let parent 
    arr.forEach((item,j)=>{
        if(j === 0){
            parent = data[item]
        }else{
            parent = parent[item]
        }
        if(parent.hasOwnProperty('children')){
            parent = parent.children
        }
    })
   //删除
   if(typeof(delIndex) === 'number'){
        parent.splice(delIndex,1)
   }else{ //更新
    let referenceList  = {"Panel":"header","TabPane":"tab"}
    let key = parent[0]['name']  
    
    parent.forEach((field,i)=>{
        field.attr[referenceList[key]] = newData.contents[i]
    })
  
    //添加 如果传入的列数大于原数组 则添加面板
    if(contents.length >  parent.length){
        // console.log({contents})
        let addItem 
        if(type === 'Collapse'){
            addItem = {
                name: 'Panel',
                title:'面板（Panel）',
                key:`${pathIndex}-${contents.length-1}`,
                attr: {
                    header:contents[contents.length-1],
                    style: {
                    }
                },
                children: []
            }
        }else {
            addItem = {
                name: 'TabPane',
                title:'标签页面（TabPane）',
                key:`${pathIndex}-${contents.length-1}`,
                attr: {
                    tab:contents[contents.length-1],
                    style: {
                    }
                },
                children: []
            }
        }
        parent.push(addItem)
    }
   }


   
    return data
}

//转换处理样式字符串为对象
const styleStringToObject=(styleStr)=>{
    let resObj = {}
    let initArr =styleStr.split(";")
    if(!initArr){
        return resObj;
    }
    initArr.pop()
    initArr.forEach((item,index)=>{
      
        if (item.indexOf("-")) {
            let objKey = item.split(':')[0].replace(/-[a-zA-Z]/g, function (item) { return item[1].toUpperCase() }).replace(/[\r\n\s]/g, "")
      
            resObj[objKey] = item.split(":")[1].replace(/[\r\n\s]{1}/, "")
        } else {
            let objKey = item.split(":")[0].replace(/[\r\n\s]/g, "")
            resObj[objKey] = item.split(":")[1].replace(/[\r\n\s]{1}/, "")
        }
        
    })
    return resObj
}


/**
 * 生成一个用不重复的ID
 */
function GenNonDuplicateID(randomLength){
    return Number(Math.random().toString().substr(3,randomLength) + Date.now()).toString(36)
  }

/**
 * 添加tree节点key属性,key作为路径
 */

function CreateNewTree(tree, parentPath) {
    parentPath = parentPath || "0"
    return tree.map((item, index) => {
        
        if (item.hasOwnProperty('children') && Object.keys(item).length > 0) {
            return { ...item, key:`${parentPath}-${index}`, children: CreateNewTree(item.children, `${parentPath}-${index}`) }
        } else {
            return { ...item, key: `${parentPath}-${index}` }
        }
    })
}

export { indexToArray, getParent, setInfo, isChildrenPath, generatePathArr, isPath, getCloneItem, getItem, itemRemove, itemAdd,updateData ,styleStringToObject,GenNonDuplicateID,updateStyles,updateRowColConfig,getObjParent,updateLayoutConfig,CreateNewTree}