// @flow
'use strict';

import React, {Component} from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
    AppState
} from 'react-native';
import FCM, {FCMEvent} from 'react-native-fcm';

import {connect} from 'react-redux';

import WelcomeScreen from './WelcomeScreen';
import TabsView from './TabsView';

function selectPropsFromStore(store) {
    return {
        selectedRole: store.settings.selectedRole,
    };
}

class CampusApp extends Component {
    state = {
        appState: AppState.currentState
    }
    
    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        
        FCM.getFCMToken().then(token => {
            console.log(token)
        });

        FCM.getInitialNotification().then(notif=>console.log(notif));

        this.notificationListener = FCM.on(FCMEvent.Notification, (notif) => {
            console.log(notif);
        });
        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
            console.log(token)
        });
    }

    componentWillUnmount() {
        this.notificationListener.remove();
        this.refreshTokenListener.remove();
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            FCM.getInitialNotification().then(notif=>console.log(notif));
        }
        this.setState({appState: nextAppState});
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
