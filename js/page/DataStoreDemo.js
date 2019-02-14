import React, {Component} from 'react';
import {StyleSheet,View,TextInput,Button,Text,AsyncStorage} from 'react-native';
import DataStore from "../expand/dao/DataStore";
import {FLAG_STORAGE} from "../constant";
export default class DataStoreDemo extends Component<Props> {
    constructor(props){
        super(props)
        this.state = {
            showText: ''
        }
        this.dataStore = new DataStore()
    }
    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        this.dataStore.fetchData(url,FLAG_STORAGE.flag_popular)
            .then(data => {
                let showData = `初次数据加载时间 ${new Date(data.timestamp)}\n ${JSON.stringify(data)}`
                this.setState({
                    showText: showData
                })
            })
            .catch(error => error && console.log(error))
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrap}>
                    <TextInput
                        style={styles.input}
                        placeholder={'输入想要查询的内容'}
                        onChangeText={(text) => {
                            this.searchKey = text
                        }}
                    />
                    <Button
                        title={'获取数据'}
                        onPress={()=> this.loadData()}
                    />
                </View>
                <Text>{this.state.showText}</Text>
            </View>
        )
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
    },
    input: {
        height: 30,
        flex: 1,
        borderColor: '#678',
        borderWidth: 1,
        marginHorizontal: 5
    }
})
