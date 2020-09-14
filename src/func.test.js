/*
 * @Author: zting
 * @LastEditors: zting
 * @Description: file content
 */
let data = [{title:8}]
 const testfun  = data =>data.map(item=>{
    item.title = 6
})

testfun(data)
console.log(data)
