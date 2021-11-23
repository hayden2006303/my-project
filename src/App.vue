<template>
  <div id="app">
     <!--动态获得transition 的name值-->
     <Test></Test>
     <display></display>
     <increment></increment>
     <router-view class="app-view" wechat-title></router-view>
    
  </div>
</template>

<script>
  import display from "./pages/components/display.vue";
  import increment from "./pages/components/increment.vue";
  import Test from "./pages/components/Test.vue";
export default {
  name: 'App',
   components: {
    display,
    increment,
    Test
  },
  mounted () {
  	window.addEventListener("popstate", function(e) {  
      console.log(window.location.hash);
      alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能  
      }, false); 	
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
