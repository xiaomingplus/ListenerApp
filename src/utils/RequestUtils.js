'use strict';
import DeviceStorage from '../utils/Storage';
import DeviceInfo from 'react-native-device-info';
import {apiHost} from '../config';
import {md5Salt} from '../utils/Crypto';
function refreshToken(auth) {
    return new Promise( async (s, f) => {
        if (!auth.account || !auth.type || !auth.refreshToken) {
            try {
                await DeviceStorage.delete("auth");
            } catch (e) {
                f(e);
                return;
            }
            const account = DeviceInfo.getUniqueID();
            try {
                var refreshToken = md5Salt(md5Salt(account, 'device'), "device");
                var userLoginInfo = await request(`users/${account}/sessions`, 'post', {
                    type: "device",
                    token: refreshToken
                })
            } catch (e) {
                f(e);
                console.log(e);
                return;
            }
            try {
                await DeviceStorage.save("auth", {
                    token: userLoginInfo.token,
                    expire: userLoginInfo.expire,
                    id: userLoginInfo.user.id,
                    account: userLoginInfo.user.account,
                    type: 'device'
                });
            } catch (e) {
                f(e);
                console.log(e);
                return;
            }
            s(userLoginInfo);
            return;
        }
        try {
            var userLoginInfo = await request(`users/${auth.account}/sessions`, 'post', {
                type: auth.type,
                token: md5Salt(md5Salt(auth.account, 'device'), "device")
            });
            await DeviceStorage.save("auth", {
                token: userLoginInfo.token,
                expire: userLoginInfo.expire,
                id: userLoginInfo.user.id,
                account: userLoginInfo.user.account,
                type: auth.type
            });
        } catch (e) {
            console.log(e);
            f(e);
            return;
        }
        s(userLoginInfo);

    });
};
export function request(options) {
    var {host, url, method, body, headers} = options;
    var isOk,
        _host = host;
    if (!method) {
        method = "get";
    }
    if (!_host) {
        _host = apiHost;
    }
    if (!headers) {
        headers = {}
    }
    console.log('==request start===');
    console.log(apiHost + url);
    console.log(method);
    console.log(body
        ? body
        : "");
    return new Promise(async(resolve, reject) => {
        headers = {
            'Content-Type': "application/json",
            ...headers
        }
        fetch(apiHost + url, {method, headers, body: JSON.stringify(body)}).then(async(response) => {
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                isOk = true;
            } else {
                isOk = false;
            }
            return response.json();
        }).then((responseData) => {
            console.log(responseData)
            console.log('==request end==')

            if (isOk) {
                // console.log(responseData);
                resolve(responseData);
            } else {
                reject(responseData);
            }
        }).catch((error) => {
            reject(error);
        });
    })
}

export function requestWithAuth(url, method, body) {
    var isOk;

    return new Promise(async(resolve, reject) => {

        try {
            var ret = await DeviceStorage.get("auth");
        } catch (e) {
            console.log(e);
            reject(e);
            return;
        }
        var headers = {};
        if (ret && ret.token) {
            headers.Authorization = ret.token;
        }
        request({url: url, method: method, headers: headers, body: body}).then(async(response) => {
            resolve(response);
        }, async function(err) {
            if (err.status === 401 && headers.Authorization) {
                try {
                    var x = await refreshToken(ret);
                    var r = await requestWithAuth(url, method, body);
                } catch (e) {
                    console.log(e);
                    reject(e);
                    return;
                }
                resolve(r);
                return;
            } else {
                reject(err);
            }
        }).catch((error) => {
            reject(error);
        });
    })
}
