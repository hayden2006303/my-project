<template>
  <div class="hello">  
  	{{this.$store.state.viewDirection}}
    <transition :name="this.$store.state.viewDirection" transition-mode="out-in">  
      <!--<keep-alive><router-view class="routerView" :key='$route.fullpath'></router-view></keep-alive>-->
     <router-view class="routerView" :key='$route.fullpath'></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      direct:''
    }
  },
//watch:{//需要设置children子路由才能监听到
//       '$route' (to, from) {
//			if(from.name==='father'){				
//				  console.log(this.$route.path+'我从father来')	
//						}
//		    if(to.name==='test01'){				
//				  console.log(to+'我到test01去')	
//						}
//		    if(to.name==='test03'){				
//				  console.log('我到test03去')	
//						}
//		    if(to.name==='father'){				
//				  console.log('我到father去')	
//						}
//					}
//		},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.routerView{
  /*position: absolute;*/
  z-index:10000;
}
.slide-fade-enter-active{
  transition: all .4s ease;
}
.slide-fade-leave-active{
  transition: all .4s ease;
}
.slide-fade-enter{
    transform:translateX(-100%);
    opacity: 0;
  }
.slide-fade-leave-to{
    transform:translate3d(100%,0,0);
    opacity:1;
  }
  
  
.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.view-in-enter-active,
.view-out-leave-active {
  transition: all .4s ease;
}

.view-in-enter{
  transform:translateX(-100%);
  opacity: 0;
}
.view-out-enter{
	transform:translateX(100%);
  opacity: 0;
}
.view-in-leave-to{
  transform:translate3d(100%,0,0);
    opacity:1;
}
.view-out-leave-to{
	transform:translate3d(-100%,0,0);
    opacity:1;
}
.left-enter-active,
.right-leave-active {
  transition: all .5s ease;
}

.left-enter{
  transform:translateX(-100%);
  opacity: 0.5;
}
.right-enter{
	transform:translateX(200%);
  opacity: 0.5;
}
.left-leave-to{
  transform:translate3d(100%,0,0);
    opacity:0;
}
.right-leave-to{
	transform:translate3d(100%,0,0);
    opacity:0;
}
</style>
