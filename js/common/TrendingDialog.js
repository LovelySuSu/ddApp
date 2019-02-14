import React,{ Component } from 'react'
import {
    Modal,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { TimeSpans } from "../constant"

export default class TrendingDialog extends Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false
        }
    }
    show() {
        this.setState({
            visible: true
        })
    }
    hide() {
        this.setState({
            visible: false
        })
    }
    render() {
        const { onClose,onSelect } = this.props
        return (
            <Modal
                transparent={ true }
                visible={ this.state.visible }
                onRequestClose={()=> onClose}
            >
                <TouchableOpacity
                    style={S.container}
                    onPress={() => this.dismiss()}
                >
                    <MaterialIcons
                        name={'arrow-drop-up'}
                        size={36}
                        style={S.arrow}
                    />
                    <View style={S.content}>
                        {TimeSpans.map((result, i, arr) => {
                            return <TouchableOpacity
                                key={i}
                                onPress={() => onSelect(arr[i])}
                                underlayColor='transparent'>
                                <View style={S.text_container}>
                                    <Text
                                        style={S.text}
                                    >{arr[i].showText}</Text>
                                </View>
                                {
                                    i !== TimeSpans.length - 1 ? <View
                                        style={S.line}
                                    /> : null
                                }
                            </TouchableOpacity>
                        })}
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}

const S = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center'
    },
    arrow: {
        marginTop: 40,
        color: 'white',
        padding: 0,
        margin: -15
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 3,
        paddingTop: 3,
        paddingBottom: 3,
        marginRight: 3,
    },
    text_container: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        fontSize: 16,
        color: 'black',
        fontWeight: '400',
        padding: 8,
        paddingLeft: 26,
        paddingRight: 26
    },
    line: {
        height: 0.3,
        backgroundColor: 'darkgray',
    },
})
