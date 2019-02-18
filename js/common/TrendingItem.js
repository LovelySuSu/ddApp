import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native'
import HTMLView from 'react-native-htmlview'
import BaseItem from "./BaseItem";
export default class TrendingItem extends BaseItem{
    render() {
        const { item,onSelect } = this.props
        if(!item) return null
        let description = '<p>' + item.description + '</p>'
        return (
            <TouchableOpacity
                onPress={ ()=> onSelect()}
            >
                <View style={S.container}>
                    <Text style={S.title}>{item.full_name}</Text>
                    <HTMLView
                        value={description}
                        onLinkPress={(url)=>{}}
                        stylesheet={{
                            p: S.description,
                            a: S.description
                        }}
                    />
                    <Text style={S.description}>{item.description}</Text>
                    <Text style={S.description}>{item.meta}</Text>
                    <View style={S.wrap}>
                        <View style={{ flexDirection:'row',justifyContent:'space-between',alignItems: 'center' }}>
                            <Text>Built By:</Text>
                            {
                                item.contributors.map((result,index,arr) => {
                                    return <Image
                                        key={index}
                                        style={{ width: 22,height: 22,margin: 2}}
                                        source={{uri: arr[index]}}
                                    />
                                })
                            }

                        </View>
                        <View style={{ flexDirection:'row',justifyContent:'space-between' }}>
                            <Text>Stars:</Text>
                            <Text>{item.starCount}</Text>
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
