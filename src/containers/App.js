import React from 'react';
import {Navigator,View,Text} from 'react-native';
import SplashContainer from '../containers/SplashContainer';

class App extends React.Component {
    render() {
        return (
            <Navigator initialRoute={{
                component: SplashContainer
            }} configureScene= {(route) =>{ return Navigator.SceneConfigs.PushFromRight; }} renderScene= { (route,navigator)=>{ let Component = route.component; return <Component route={route} {...route.params} navigator = {navigator} /> } }/>
        )
    }
}

export default App;
