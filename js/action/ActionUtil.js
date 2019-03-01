import Utils from "../util/Utils";

export function handleData(actionType,dispatch,storeName,data,pageSize,favoriteDao,params) {
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
    let showItems = pageSize > items.length ? items: items.slice(0,pageSize)
    dealItems(showItems,favoriteDao,projectModes => {
        dispatch({
            type: actionType,
            storeName,
            items: items,
            projectModes: projectModes,
            pageIndex: 1,
            ...params
        })
    })
}
export async function dealItems(showItems,favoriteDao,callback) {
    let keys = []
    try {
        // 获取收藏的可以
        keys = await favoriteDao.getFavoriteKeys()
    } catch (e) {
        console.log(e)
    }
    showItems = showItems.map((item)=> {
        item.isFavorite = Utils.checkFavorite(item,keys)
        return item
    })
    if(typeof callback === 'function') {
        callback(showItems)
    }

}

