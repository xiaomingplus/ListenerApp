
import Storage from 'react-native-storage';
let storage = new Storage({
  size: 1000,
  defaultExpires: 1000 * 3600 * 24 * 7,
  enableCache: true,
  sync : {
  }
});
global.storage = storage;
