import React, {Component} from "react";
import {AppState} from 'react-native'

import FCM, {FCMEvent} from "react-native-fcm";
import {feeds} from './util/Constants';

export default class PushController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: ''
        }
    }

    componentDidMount() {
        FCM.getFCMToken().then(token => {
            console.log("TOKEN (getFCMToken)", token);
        });

        FCM.getInitialNotification().then(notif => {
            console.log("INITIAL NOTIFICATION", notif);
            this._handlePushNotification(notif);
        });

        this.notificationListener = FCM.on(FCMEvent.Notification, notif => {
            console.log("Notification", notif);
            if (notif.local_notification) {
                this.props.handleNotification(this.state.key);
            } else {
                this._handlePushNotification(notif);
            }
        });

        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
            console.log("TOKEN (refreshUnsubscribe)", token);
        });
    }

    componentWillUnmount() {
        this.notificationListener.remove();
        this.refreshTokenListener.remove();
    }

    _handlePushNotification(notif) {
        if (notif !== null && notif.hasOwnProperty("newsfeed")) {
            const correspondingFeed = feeds.filter(feed => feed.key === notif.newsfeed);
            const key = correspondingFeed[0].key;
            this.setState({key: key});
            if (AppState.currentState === 'active' && !notif.opened_from_tray) {
                FCM.presentLocalNotification({
                    title: notif.fcm.title,
                    body: notif.fcm.body,
                    show_in_foreground: true,
                    local: true,
                    newsfeed: key
                });
            } else {
                this.props.handleNotification(key);
            }
        }
    }

    render() {
        return null;
    }
}