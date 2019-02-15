import React, { Component } from 'react'
import {
    TouchableOpacity,
} from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { PropTypes } from 'prop-types'
import {THEME_COLOR} from "../constant";

export default class BaseItem extends Component {
    static propTypes = {
        projectMode: PropTypes.object,
        onSelect: PropTypes.func,
        onFavorite: PropTypes.func
    }
    constructor(props) {
        super(props)
        this.state = {
            isFavorite: false
        }
    }
    static getDerivedStateFromProps(nextProps,preState) {
        // let isFavorite = nextProps.projectMode.isFavorite
        // if (preState.isFavorite !== isFavorite) {
        //     return {
        //         isFavorite: isFavorite
        //     }
        // }
        return null
    }
    onPressFavorite() {
        // this.setFavoriteState(!this.state.isFavorite)
        // this.props.onFavorite(!this.state.isFavorite,this.props.projectMode)
    }
    getFavoriteIcon() {
        return (<TouchableOpacity
            style={{ padding: 6 }} // 增大点击区域
            onPress={() => this.onPressFavorite()}
            underlayColor={'transparent'}
        >
            <FontAwesome
                name={this.state.isFavorite? 'star':'star-o'}
                size={26}
                style={{ color: THEME_COLOR }}
            />
        </TouchableOpacity>)
    }
    render() {

    }
}
