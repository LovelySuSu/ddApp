import {
    AsyncStorage
}  from "react-native"
import React from 'react'
import { FLAG_THEME } from "../../constant"
import ThemeFactory, { ThemeFlags } from "../../res/style/ThemeFactory"

export default class ThemeDao {
    /**
     * 获取主题颜色
     * */
    getTheme() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(FLAG_THEME, (error, result) => {
                if (error) {
                    reject(error)
                    return
                }
                if (!result) {
                    this.save(ThemeFlags.Default)
                    result = ThemeFlags.Default
                }
                resolve(ThemeFactory.createTheme(result))
            })
        })
    }
    /**
     * 保存语言和标签
     * */
    save(theme) {
        AsyncStorage.setItem(FLAG_THEME, theme, (error, result) => {

        })
    }
}
