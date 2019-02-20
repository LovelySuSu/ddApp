import {
    AsyncStorage
}  from "react-native"
import React from 'react'
import { FLAG_LANGUAGE } from "../../constant"
import keys from "../../res/data/keys"
import langs from "../../res/data/langs"

export default class LanguageDao {
    constructor(flag) {
        this.flag = flag
    }
    /**
     * 获取语言和标签
     * */
    fetch() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.flag, (error, result) => {
                if (error) {
                    reject(error)
                    return
                }
                if (!result) {
                    let data = this.flag === FLAG_LANGUAGE.flag_language ? langs : keys
                    this.save(data)
                    resolve(data)
                } else {
                    try {
                        resolve(JSON.parse(result))
                    } catch (e) {
                        reject(error)
                    }
                }
            })
        })
    }
    /**
     * 保存语言和标签
     * */
    save(data) {
        let stringData = JSON.stringify(data)
        AsyncStorage.setItem(this.flag, stringData, (error, result) => {

        })
    }
}
