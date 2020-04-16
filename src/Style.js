import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3B4252',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer: {
        alignItems: 'center',
        flexGrow: 1,
    },
    buttonContainer:{
        backgroundColor: '#8FBCBB',
        paddingVertical: 15,
        marginBottom: 10,
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        width: 300
    },
    roundButton: {
        justifyContent: 'space-between',
        borderRadius: 50,
        borderWidth: 1,
    },
    buttonText:{
        textAlign: 'center',
        fontWeight: '700'
    },
    lightText: {
        color: '#ECEFF4'
    },
    lightText2: {
        color: '#A3BE8C'
    }
});

export default styles;