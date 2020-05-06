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
        let sampleScores = [];
        for(let i = 0;i<10;i++){
            sampleScores.push({
                name: 'User' + i,
                score: Math.floor(Math.random()* 10),
            });
        }
        sampleScores.sort((a,b) => a.score-b.score).reverse();

        for (let i = 0; i < 10; i++) {
            let username = 'User' + i;
            if (i % 2 == 0) {
                {
                    scoreRows.push(
                        <View style={styles.scoreRowGrey} key={i}>
                            <ScoreRow username={sampleScores[i].name} score={sampleScores[i].score} />
                        </View>,
                    );
                }
            } else {
                scoreRows.push(
                    <View style={styles.scoreRowWhite} key={i}>
                        <ScoreRow username={sampleScores[i].name} score={sampleScores[i].score} />
                    </View>,
                );
            }
        }
        return scoreRows;
    };
}

export default Leaderboard;
