import React from 'react';

import styles from '../styles';

import SvgUri from 'react-native-svg-uri';

import {
    Button,
    PermissionsAndroid,
    ScrollView,
    Text,
    ToastAndroid,
    View,
    Image,
} from 'react-native';

import scoreImage from '../assets/ScoreImage.png';

class ScoreDisplay extends React.Component {
    render() {
        return (
            <View style={styles.scoreDisplay}>
                <Image source={scoreImage} style={{marginRight: 10}} />
                <Text style={{fontSize: 20}}>{this.props.score}</Text>
            </View>
        );
    }
}

class ScoreRow extends React.Component {
    render() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                }}>
                <Text style={{marginRight: 250, marginLeft: 10, fontSize: 20}}>
                    {this.props.username}
                </Text>
                <ScoreDisplay score={this.props.score} />
            </View>
        );
    }
}
export default ScoreRow;
