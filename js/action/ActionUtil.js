export function handleData(actionType,dispatch,storeName,data,pageSize) {
    let items = []
    if(data && data.data) {
        data = data.data
        if(typeof data === 'string') data = JSON.parse(data)
        if(Array.isArray(data)) {
            items = data
        } else if(Array.isArray(data.items)){
            items = data.items
        }
    }
    dispatch({
        type: actionType,
        storeName,
        items: items,
        projectModes: pageSize > items.length ? items: items.slice(0,pageSize),
        pageIndex: 1
    })
}

