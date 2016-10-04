<Navigator
initialRoute={{
component:ChannelContainer,
name: '主题推荐'
}}
configureScene = {(route) =>{
return Navigator.SceneConfigs.VerticalDownSwipeJump;
}}
renderScene = {
(route,navigator)=>{
 let Component = route.component;
 return <Component route={route} {...route.params} navigator = {navigator} />
}
}
/>
