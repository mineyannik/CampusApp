import React, {Component} from "react";

import FCM, {FCMEvent} from "react-native-fcm";
import {feeds} from './util/Constants';

export default class PushController extends Component {
    constructor(props) {
        super(props);
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
            this._handlePushNotification(notif);
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
            this.props.handleNotification(correspondingFeed[0].key);
        }
    }

    render() {
        return null;
    }
}