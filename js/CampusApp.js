// @flow
'use strict';

import React, {Component} from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
    AppState,
    Platform
} from 'react-native';

import {connect} from 'react-redux';

import WelcomeScreen from './WelcomeScreen';
import TabsView from './TabsView';
import PushController from './PushController';
import PushNotification from 'react-native-push-notification';


function selectPropsFromStore(store) {
    return {
        selectedRole: store.settings.selectedRole,
    };
}

class CampusApp extends Component {
    constructor(props) {
        super(props);

        this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange(appState) {
        if (appState === 'background') {
            let date = new Date(Date.now() + (5 * 1000));

            if (Platform.OS === 'ios') {
                date = date.toISOString();
            }

            PushNotification.localNotificationSchedule({
                message: "My Notification Message",
                date,
            });
        }
    }

    render() {
        let content = <TabsView/>;
        if (this.props.loading) {
            content =
                <View style={styles.center}>
                    <ActivityIndicator animating={true}/>
                </View>
        } else if (!this.props.selectedRole) {
            content = <WelcomeScreen/>;
        }

        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={true}
                    backgroundColor="rgba(0, 0, 0, 0.2)"
                    barStyle="light-content"
                />
                {content}
                <PushController/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default connect(selectPropsFromStore)(CampusApp);
