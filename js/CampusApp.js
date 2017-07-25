// @flow
'use strict';

import React, {Component} from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View
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
    componentDidMount() {
        FCM.getFCMToken().then(token => {
            console.log(token)
        });
        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {

        });
        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
            console.log(token)
        });
    }

    componentWillUnmount() {
        this.notificationListener.remove();
        this.refreshTokenListener.remove();
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
