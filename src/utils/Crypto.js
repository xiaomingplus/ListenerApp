import crypto from "crypto-js";
export function md5Salt(value, salt) {
    return crypto.MD5(crypto.MD5(value.toString()).toString(crypto.enc.Hex) + "secret" + crypto.MD5(salt.toString()).toString(crypto.enc.Hex)).toString(crypto.enc.Hex);
}
