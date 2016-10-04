import * as types from '../constants/ActionTypes';
import {
  time
} from '../utils/CommonUtils';
import {
  requestWithAuth
} from '../utils/RequestUtils';
import DeviceStorage from '../utils/Storage';
import DeviceInfo from 'react-native-device-info';
import {
  md5Salt
} from '../utils/Crypto';
export function loadUser() {
  return async dispatch => {
    dispatch(fetchLoadUser());
    try {
      var ret = await DeviceStorage.get("auth");
    } catch (e) {
      console.log(e);
      return;
    }
    console.log('===auth===');
    console.log(ret);
    if (ret && ret.expire > time()) {
      try {
        var userinfo = await requestWithAuth("users/");
      } catch (e) {
        if (e.id === 'unauthorized') {
          try {
            var userLoginInfo = await postUserSession(ret.account);
            await DeviceStorage.save("auth", {
              token: userLoginInfo.token,
              expire: userLoginInfo.expire,
              id: userLoginInfo.user.id,
              account: userLoginInfo.user.account,
              type: "device",
            });
            dispatch(receiveUser(userLoginInfo));
            return;
          } catch (e) {
            //注册
            console.log(e);
            try {
              await DeviceStorage.remove("auth");
              var user = await postUser();
              var userLoginInfo = await postUserSession(user.account);
              await DeviceStorage.save("auth", {
                token: userLoginInfo.token,
                expire: userLoginInfo.expire,
                id: userLoginInfo.user.id,
                account: userLoginInfo.user.account,
                type: 'device'
              });
            } catch (e) {
              console.log(e);
              return;
            }
            dispatch(receiveUser(userLoginInfo));
            return;
          }
        } else if (e.id === 'not_found') {
          try {
            await DeviceStorage.remove("auth");
            var user = await postUser();
            var userLoginInfo = await postUserSession(user.account);
            await DeviceStorage.save("auth", {
              token: userLoginInfo.token,
              expire: userLoginInfo.expire,
              id: userLoginInfo.user.id,
              account: userLoginInfo.user.account,
              type: 'device'
            });
          } catch (e) {
            console.log(e);
            return;
          }
          dispatch(receiveUser(userLoginInfo));
          return;
        } else {
          console.log(e);
          return;
        }
      }
      dispatch(receiveUser({
        user:{
          id:userinfo.id,
          account:userinfo.account,
          avatar:userinfo.avatar,
          name:userinfo.name
        },
        token:ret.token,
        expire:ret.expire
      }));
    } else if (ret && ret.expire < time()) {
      try {
        var userLoginInfo = await postUserSession(ret.account);
        await DeviceStorage.save("auth", {
          token: userLoginInfo.token,
          expire: userLoginInfo.expire,
          id: userLoginInfo.user.id,
          account: userLoginInfo.user.account,
          type: "device"
        });
      } catch (e) {
        console.log(e);
        return;
      }
      dispatch(receiveUser(userLoginInfo));

    } else {
      try {
        var user = await postUser();
      } catch (e) {
        if (e.id === 'conflict') {
          try {
            var userLoginInfo = await postUserSession();
          } catch (e) {
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
            console.log(e);
            return;
          }
          dispatch(receiveUser(userLoginInfo));
          return;
        } else {
          console.log(e);
          return;
          //todo
        }
        return;
      }
      console.log('===user new===')
      console.log(user);
      try {
        var userLoginInfo = await postUserSession(user.account);
        await DeviceStorage.save("auth", {
          token: userLoginInfo.token,
          expire: userLoginInfo.expire,
          id: userLoginInfo.user.id,
          account: userLoginInfo.user.account,
          type: "device"
        });
      } catch (e) {
        console.log(e);
        return;
      }

      dispatch(receiveUser(userLoginInfo));
    }
  }

}

function fetchLoadUser() {
  return {
    type: types.FETCH_LOAD_USER
  }
}

function receiveUser(user) {
  return {
    type: types.RECEIVE_LOAD_USER,
    data: user
  }
}

function postUser() {
  return new Promise(async(s, f) => {
    const account = DeviceInfo.getUniqueID();
    try {
      var user = await requestWithAuth("users/", "post", {
        "account": account,
        "type": "device",
        "token": md5Salt(md5Salt(account, 'device'), 'device')
      });
    } catch (e) {
      f(e);
      return;
    }
    s(user);
  });

}

function postUserSession(account) {
  return new Promise(async(s, f) => {
    if(!account){
      account = DeviceInfo.getUniqueID();
    }
    try {
      var refreshToken = md5Salt(md5Salt(account, 'device'), "device");
      var userLoginInfo = await requestWithAuth(`users/${account}/sessions`, 'post', {
        type: "device",
        token: refreshToken
      })
    } catch (e) {
      f(e);
      return;
    }
    s(userLoginInfo);
  });

}
