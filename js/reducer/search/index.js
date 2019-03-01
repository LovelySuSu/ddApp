import TYPES from "../../action/types";

const defaultState = {
    showText: '搜索',
    items: [],
    isLoading: false,
    projectModels: [],// 要显示的数据
    hideLoadingMore: true,// 默认隐藏加载更多
    pageIndex: 1

}
export default function onAction(state=defaultState,action) {
    switch (action.type) {
        case TYPES.SEARCH_REFRESH:
            return {
                ...state,
                isLoading: true,
                hideLoadingMore: true,
                showText:'取消',
            }
            break
        case TYPES.SEARCH_REFRESH_SUCCESS:
            return {
                ...state,
                items: action.items,
                projectModes: action.projectModes,
                isLoading: false,
                pageIndex: action.pageIndex,
                showText: '搜索',
                inputKey: action.inputKey
            }
            break
        case TYPES.SEARCH_FAIL:
            return {
                ...state,
                isLoading: false,
                showText: '搜索',
            }
            break
        case TYPES.SEARCH_LOAD_MORE_SUCCESS: {
            return {
                ...state,
                projectModes: action.projectModes,
                hideLoadingMore: false,
                pageIndex: action.pageIndex
            }
        }
        case TYPES.SEARCH_LOAD_MORE_FAIL: {
            return {
                ...state,
                hideLoadingMore: true,
                pageIndex: action.pageIndex
            }
        }
        case TYPES.SEARCH_CANCEL: {
            return {
                ...state,
                isLoading: false,
                showText: '搜索'
            }
        }
        default:
            return state
    }
}

