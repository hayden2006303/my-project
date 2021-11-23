import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"
import HelloWorld from '@/components/HelloWorld'
import All from '@/pages/all'
import Father from '@/pages/father'
import Fa from '@/pages/components/fa'
import Test01 from '@/pages/test01'
import Test02 from '@/pages/test02'
Vue.use(Router)
const router=new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect: "father",
        children:[          
            {
        path: 'father',
        name: 'father',
        component: Father,
        },
         {
        path: 'fa',
        name: 'fa',
        component: Fa,
        },
          {
	      path: 'test01/id/:id',
	      name: 'test01',
	      component: Test01,
	      beforeEnter: (to, from, next) => {
            	if(to.name === "test01"){    		
            		console.log('test01')
            		next()
            	}
      	},     
	    },
	    {
	      path: 'test03/id/:id',
	      name: 'test03',
	      component: Test01
	    },
	    {
	      path: 'test02',
	      name: 'test02',
	      component: resolve => require(['@/pages/test02.vue'],resolve),//懒加载,路由被访问时才加载组件
	    },	                   
        ]      	           
         
   }
    ],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
     if(to.name=='test02')
      return {x:0,y:20} //对于所有路由导航，简单地让页面滚动到(自定义的位置)
    }
    
})
router.beforeEach((to, from, next) => {
	 const list = ['father', 'test01', 'test02', 'test03']    // 将需要切换效果的路由名称组成一个数组
    const toName = to.name    // 即将进入的路由名字
    const fromName = from.name    // 即将离开的路由名字
    const toIndex = list.indexOf(toName)    // 进入下标
    const fromIndex = list.indexOf(fromName)   // 离开下标
    let direction = ''

    if (toIndex > -1 && fromIndex > -1) {   // 如果下标都存在
      if (toIndex < fromIndex) {          // 如果进入的下标小于离开的下标，那么是左滑
        direction = 'left'
      } else {
        direction = 'right'         // 如果进入的下标大于离开的下标，那么是右滑
      }
    }

    store.state.viewDirection = direction  //这里使用vuex进行赋值  

     next()
})
export default router