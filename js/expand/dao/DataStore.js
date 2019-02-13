import { AsyncStorage } from "react-native";

export default class DataStore {
    /**
     * 获取数据，优先获取本地数据，如果无本地数据或本地数据过期则获取网络数据
     * @param url
     * @returns {Promise}
     */
    fetchData(url) {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url).then((wrapData) => {
                if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
                    resolve(wrapData)
                } else {
                    this.fetchNetData(url).then((data) => {
                        resolve(this.wrapData(data))
                    }).catch((error) => {
                        reject(error)
                    })
                }

            }).catch((error) => {
                this.fetchNetData(url).then((data) => {
                    resolve(this.wrapData(data))
                }).catch((error => {
                    reject(error)
                }))
            })
        })
    }

    /**
     *  保存数据
     * */
    saveData(url,data,callback) {
        if(!data || !url) return
        AsyncStorage.setItem(url,JSON.stringify(this.wrapData(data)),callback)
    }
    /**
     * 获取本地数据
     * */
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error && result) {
                    try {
                        console.log('==== 使用本地数据 ====\n',JSON.parse(result))
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        e && console.log(e);
                    }
                } else {
                    reject(error);
                    e && console.log(e);
                }
            })
        })
    }
    /**
     * 获取服务器数据
     * */
    fetchNetData(url) {
        return new Promise((resolve, reject) => {
           fetch(url)
                .then(res => {
                    if(res.ok) {
                        console.log('===== 使用服务器数据 ====\n', JSON.stringify(res))
                        return res.text()
                    }
                    throw new Error('error')
                })
               .then(responseData => {
                   this.saveData(url,responseData)
                   resolve(responseData)
               })
                .catch(error => reject(error))
        })
    }
    /**
     * 检查timestamp是否在有效期内
     * @param timestamp 项目更新时间
     * @return {boolean} true 不需要更新,false需要更新
     */
    static checkTimestampValid(timestamp) {
        const currentDate = new Date()
        const targetDate = new Date()
        targetDate.setTime(timestamp)
        if (currentDate.getMonth() !== targetDate.getMonth()) return false;
        if (currentDate.getDate() !== targetDate.getDate()) return false;
        if (currentDate.getHours() !== targetDate.getHours()) return false;
        if (currentDate.getMinutes() - targetDate.getMinutes() > 5)return false; //有效期5分钟
        return true;
    }
    wrapData(data) {
        return {
            data: data,
            timestamp: new Date().getTime()
        }
    }
}
