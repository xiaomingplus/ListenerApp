'use strict';

import React from 'react-native';
const {AsyncStorage} = React;

class DeviceStorage {
    static get(key) {
        return new Promise(async(s, f) => {
            try {
                var ret = await AsyncStorage.getItem(key)
            } catch (e) {
                f(e);
                return;
            }
            try {
                var result = JSON.parse(ret);
            } catch (e) {
                f(e);
                return;
            }
            s(result);
        })
    }

    static save(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }

    static update(key, value) {
        return DeviceStorage.get(key).then((item) => {
            value = typeof value === 'string'
                ? value
                : Object.assign({}, item, value);
            return AsyncStorage.setItem(key, JSON.stringify(value));
        });
    }

    static delete(key) {
        return AsyncStorage.removeItem(key);
    }

    static remove(key) {
        return AsyncStorage.removeItem(key);
    }
}

export default DeviceStorage;
