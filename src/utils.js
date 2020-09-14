/*
 * @Author: zting
 * @LastEditors: zting
 * @Description: 合并多个reducer
 */
export function combineReducers(reducers){
    return function(state={},action){
        const newState ={}

        Object.keys(reducers).forEach(key=>{
            const childState = state[key]
            newState[key] = reducers[key](childState,action)
        })

        return newState
    }
}