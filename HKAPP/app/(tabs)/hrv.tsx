import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Value from '../../components/Value';
import { useState } from 'react';
import useHrvMetrics from '../../hooks/useHrvMetrics';
import { AntDesign } from '@expo/vector-icons';

const STEPS_GOAL = 10_000;

const HrvData: React.FC = () => {
    const [date, setDate] = useState(new Date());
    const { hrv, } = useHrvMetrics(date);

    const changeDate = (numDays: any) => {
        const currentDate = new Date(date); //  copy  current date
        currentDate.setDate(currentDate.getDate() + numDays); // update the date ( + or - numDays) 
        setDate(currentDate);
    };

    return (
        <View style={styles.container}>
            <View style={styles.datePicker}>
                <AntDesign
                    onPress={() => changeDate(-1)} // move backward
                    name="left"
                    size={20}
                    color="#597be3"
                />

                <Text style={styles.date}>{date.toDateString()}</Text>

                <AntDesign
                    onPress={() => changeDate(1)} // forward
                    name="right"
                    size={20}
                    color="#597be3"
                />
            </View>

            <View style={styles.values}>
                <Value label="HRV" value={`${hrv.toString()} `} />
            </View>

            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        padding: 12,
    },
    values: {
        flexDirection: 'row',
        gap: 25,
        flexWrap: 'wrap',
        marginTop: 100,
    },
    datePicker: {
        alignItems: 'center',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    date: {
        color: 'white',
        fontWeight: '500',
        fontSize: 20,
        marginHorizontal: 40,
    },
});

export default HrvData;