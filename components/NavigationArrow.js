import React from 'react';

import {Image, StyleSheet, Text} from 'react-native';

import arrow from '../assets/arrow.png';

class Arrow extends React.Component<{}> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <Image
                source={arrow}
                style={{
                    width: 18,
                    height: 18,
                    marginRight: 10,
                    transform: [{rotate: `${this.props.facing}deg`}],
                }}
            />
        );
        // return <Text>{this.props.facing}</Text>;
    }
}

export default Arrow;

