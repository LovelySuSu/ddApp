import React, {Component} from 'react';
import {StyleSheet,View,TextInput,Button,Text,AsyncStorage} from 'react-native';
const KEY = 'save_key'
export default class AsyncStorageDemo extends Component<Props> {
    constructor(props){
        super(props)
        this.state = {
            showText: ''
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                        this.value = text
                    }}
                />
                <View style={styles.wrap}>
                    <Button
                        title={'存储'}
                        onPress={() => this.doSave()}
                    />
                    <Button
                        title={'删除'}
                        onPress={() => this.doRemove()}
                    />
                    <Button
                        title={'获取'}
                        onPress={() => this.getData()}
                    />
                </View>
                <Text>{this.state.showText}</Text>
            </View>
        )
    }
    async doSave() {
        // 方法一
        AsyncStorage.setItem(KEY,this.value, error => {
            error && console.log(error.toString())
        })
        // 方法二
        // AsyncStorage.setItem(KEY,this.value)
        //     .catch(error => {
        //         error && console.log(error.toString())
        //     })
        // 方法三
        // try {
        //     await AsyncStorage.setItem(KEY,this.value)
        // } catch (error) {
        //     error && console.log(error.toString())
        // }

    }
    async doRemove()  {
        // 方法一
        AsyncStorage.removeItem(KEY,error => {
            error && console.log(error.toString())
        })
        // 方法二
        // AsyncStorage.removeItem(KEY)
        //     .catch(error => {
        //         error && console.log(error.toString())
        //     })
        // 方法三
        // try {
        //     await AsyncStorage.removeItem(KEY)
        // } catch (error) {
        //     error && console.log(error.toString())
        // }

    }
    async getData () {
        // 方法一
        AsyncStorage.getItem(KEY,(error,value) => {
            this.setState({
                showText: value
            })
            console.log(value)
            error && console.log(error.toString())
        })
        // 方法二
        // AsyncStorage.getItem(KEY)
        //     .then(value => {
        //         this.setState({
        //             showText: value
        //         })
        //         console.log(value)
        //     })
        //     .catch(error => {
        //         error && console.log(error.toString())
        //     })
        // 方法三
        // try {
        //     const value = await AsyncStorage.getItem(KEY)
        //     this.setState({
        //         showText: value
        //     })
        //     console.log(value)
        // } catch (error) {
        //     error && console.log(error.toString())
        // }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    wrap: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        height: 30,
        borderColor: '#678',
        borderWidth: 1,
        marginHorizontal: 5
    }
})
