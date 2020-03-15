import React from 'react';
import styles from '../styles';
import {Button, ScrollView, Text, View} from 'react-native';
import ScoreRow from '../components/ScoreRow';

class Leaderboard extends React.Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Weekly Leaderbord</Text>
                </View>
                {this.createLeaderboard()}
            </ScrollView>
        );
    }
    createLeaderboard = () => {
        let scoreRows = [];
        for (let i = 0; i < 5; i++) {
            let username = 'User' + i;
            if (i % 2 == 0) {
                {
                    scoreRows.push(
                        <View style={styles.scoreRowGrey} key={i}>
                            <ScoreRow username={username} score={i} />
                        </View>,
                    );
                }
            } else {
                scoreRows.push(
                    <View style={styles.scoreRowWhite} key={i}>
                        <ScoreRow username={username} score={i} />
                    </View>,
                );
            }
        }
        return scoreRows;
    };
}

export default Leaderboard;
