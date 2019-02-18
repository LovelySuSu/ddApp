import React, { Component } from 'react'
import {
    TouchableOpacity,
} from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { PropTypes } from 'prop-types'
import {THEME_COLOR} from "../constant"

export default class BaseItem extends Component {
    static propTypes = {
        item: PropTypes.object,
        onSelect: PropTypes.func,
        onFavorite: PropTypes.func
    }
    constructor(props) {
        super(props)
        this.state = {
            isFavorite: this.props.item.isFavorite
        }
    }
    static getDerivedStateFromProps(nextProps,preState) {
        let isFavorite = nextProps.item.isFavorite
        if (preState.isFavorite !== isFavorite) {
            return {
                isFavorite: isFavorite
            }
        }
        return null
    }
    onItemClick() {
        this.props.onSelect(isFavorite => {
            this.setFavoriteState(isFavorite)
        })
    }
    setFavoriteState(isFavorite) {
        this.props.item.isFavorite = isFavorite
        this.setState({
            isFavorite: isFavorite,
        })
    }
    onPressFavorite() {
        this.setFavoriteState(!this.state.isFavorite)
        this.props.onFavorite(this.props.item,!this.state.isFavorite)
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
