import React, {Component} from 'react';
import {StyleSheet,View,TextInput,Button,Text} from 'react-native';

export default class FetchDemo extends Component<Props> {
    constructor(props){
        super(props)
        this.state = {
            showText: ''
        }
    }
    loadDate = () => {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        fetch(url)
            .then(res => res.text())
            .then(res => this.setState({
                showText: res
            }))
    }
    loadDate2 = () => {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        fetch(url)
            .then(res => {
                if(res.ok) {
                    return res.text()
                } else {
                    throw new Error('request error')
                }
            })
            .then(res => this.setState({
                showText: res
            }))
            .catch(error => {
                console.log(error)
            })
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
                        onPress={()=> this.loadDate2()}
                    />
                </View>
                <Text>{this.state.showText}</Text>
            </View>
        );
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
        borderColor: '#678',
        borderWidth: 1,
        marginHorizontal: 5
    }
})
