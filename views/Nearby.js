/**
 * @format
 * @flow
 */

import React from 'react';
import {Button, View, Text, ScrollView} from 'react-native';


import RNSimpleCompass from 'react-native-simple-compass';

import Geolocation from 'react-native-geolocation-service';

import styles from '../styles';
import Arrow from '../components/NavigationArrow';

const server = '5.132.191.83';

class Nearby extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            parks: [],
            compass: 0,
        };

        const degree_update_rate = 10; // Number of degrees changed before the callback is triggered
        RNSimpleCompass.start(degree_update_rate, degree => {
            this.setState({compass: degree});
            console.log('You are facing', this.state.compass);
        });
    }

    reloadList(that): void {
        Geolocation.getCurrentPosition(
            position => {
                fetch(`http://${server}:8000/getparks`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(position),
                })
                    .then(r => r.json())
                    .then(r => {
                        that.setState({parks: r});
                    })
                    .catch(e => {
                        console.log(e);
                        ToastAndroid.show(e.message, ToastAndroid.SHORT);
                    });
            },
            error => {
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
    }

    render() {
        return (
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                {global.HermesInternal == null ? null : (
                    <View style={styles.engine}>
                        <Text style={styles.footer}>Engine: Hermes</Text>
                    </View>
                )}
                <View style={styles.body}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Reload</Text>
                        <Button
                            onPress={() => this.reloadList(this)}
                            title="Reload"
                        />
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Parks</Text>
                        <View>
                            {this.state.parks.map(p => (
                                <View style={styles.parksNearbyElement}>
                                    <Arrow facing={this.state.compass} />
                                    <Text>
                                        {`${Math.round(p.distance)}m ${p.name}`}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }

    componentDidMount() {
        this.requestGPSPermission();
    }

    async requestGPSPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Please give GPS',
                    message: 'We need location',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Gps permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
}

export default Nearby;
