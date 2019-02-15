import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BaseItem from "./BaseItem";
export default class PopularItem extends BaseItem{
    render() {
        const { item,onSelect } = this.props
        if(!item || !item.owner) return null
        return (
            <TouchableOpacity
                onPress={ ()=> onSelect()}
            >
                <View style={S.container}>
                    <Text style={S.title}>{item.full_name}</Text>
                    <Text style={S.description}>{item.description}</Text>
                    <View style={S.wrap}>
                        <View style={{ flexDirection:'row',justifyContent:'space-between',alignItems: 'center' }}>
                            <Text>Author</Text>
                            <Image
                                style={{ width: 22,height: 22, marginLeft: 5}}
                                source={{uri: item.owner.avatar_url}}
                            />
                        </View>
                        <View style={{ flexDirection:'row',justifyContent:'space-between' }}>
                            <Text>Stars:</Text>
                            <Text>{item.stargazers_count}</Text>
                        </View>
                        {
                            this.getFavoriteIcon()
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const S = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
        marginHorizontal: 5,
        marginBottom: 3,
        borderColor: '#ddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'grey',
        shadowOffset: {width: 0.5,height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121'
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
    wrap: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop: 10
    }
})
