<template>
	<div class="all">
    <p @click='test4()'>测试02{{test2}}{{message}}</p>
    <router-link :to="{name:'test01',params:{id:'01'}}">test01</router-link><router-link :to="{name:'father'}">father</router-link>
    <div class='container'>    	    		    	
	 	<div class="title">
	 		<div>时间</div><div>组号</div><div>单数（单）</div><div>单组金额（元）</div><div>出单总数量（单）</div><div>出单金额（元）</div><div>选择</div>
	 	</div>
	 	<!--<div v-for='item,index in list' v-on:click="showFun(item)">
		 	<div class='childItem white'>
		 		  <div>{{item.time}}</div><div>{{item.zu}}</div><div>{{item.dan}}</div><div>{{item.dj}}</div><div>{{item.num}}</div><div>{{item.money}}</div>
		 		  <div><input type="checkbox"/></div>
		 	</div>
		 	<transition name="ul" @enter="menuEnter" @leave="menuLeave">
			 	<div class='ul-box' v-if='item.act'>
				 	<div class="title">
				 		<div>时间</div><div>组号</div><div>单数（单）</div><div>单组金额（元）</div><div>出单总数量（单）</div><div>出单金额（元）</div>
				 	</div>
				 	<div class='childItem' v-for='ite in item.ch'>
			 		  <div>{{ite.time}}</div><div>{{ite.zu}}</div><div>{{ite.dan}}</div><div>{{ite.dj}}</div><div>{{ite.num}}</div><div>{{ite.money}}</div>		 		  
			 	    </div>
			 	</div>
		 	</transition>
	 	</div>-->
	 	<!--第二种方式-->
	 	<!--<div v-for='item,index in list' v-on:click="showFun(item)">
		 	<div class='childItem white'>
		 		  <div>{{item.time}}</div><div>{{item.zu}}</div><div>{{item.dan}}</div><div>{{item.dj}}</div><div>{{item.num}}</div><div>{{item.money}}</div>
		 		  <div><input type="checkbox" @click.stop="showFun(item)"/></div>
		 	</div>
		 	<collapse-transition>
			 	<div class='ul-box' v-if='item.act'>
				 	<div class="title">
				 		<div>时间</div><div>组号</div><div>单数（单）</div><div>单组金额（元）</div><div>出单总数量（单）</div><div>出单金额（元）</div>
				 	</div>
				 	<div class='childItem' v-for='ite in item.ch'>
			 		  <div>{{ite.time}}</div><div>{{ite.zu}}</div><div>{{ite.dan}}</div><div>{{ite.dj}}</div><div>{{ite.num}}</div><div>{{ite.money}}</div>		 		  
			 	    </div>
			 	</div>
		 	</collapse-transition>
	 	</div>-->
	 	<div v-for='item,index in list' @click="showFun2(item,index)">
		 	<div class='childItem white'>
		 		  <div>{{item.time}}</div><div>{{item.zu}}</div><div>{{item.dan}}</div><div>{{item.dj}}</div><div>{{item.num}}</div><div>{{item.money}}</div>
		 		  <div><input type="checkbox" @click.stop="check($event)"/></div>
		 	</div>
		 	<collapse-transition>
			 	<div class='ul-box' v-if='item.flag'>
				 	<div class="title">
				 		<div>时间</div><div>组号</div><div>单数（单）</div><div>单组金额（元）</div><div>出单总数量（单）</div><div>出单金额（元）</div>
				 	</div>
				 	<div class='childItem' v-for='ite in item.ch'>
			 		  <div>{{ite.time}}</div><div>{{ite.zu}}</div><div>{{ite.dan}}</div><div>{{ite.dj}}</div><div>{{ite.num}}</div><div>{{ite.money}}</div>		 		  
			 	    </div>
			 	</div>
		 	</collapse-transition>
	 	</div>
    </div>
    <list :list="testlist"/>
 </div>
 
</template>

<script>  
  import CollapseTransition from './components/collapseTransition'
  import List from "./components/List";
  export default{
  	 components: {
      'collapse-transition': CollapseTransition,List
    },
  	name: "test02",
    data(){
      return{
      	show:[false],
      	ins:0,
      	message:'测试信息'  ,
      	testlist: [{
          name: "经济",
          children: [{
              name: "如家",
              children: [{
                  name: "上江路-如家"
                },
                {
                  name: "望江路-如家"
                }]
            },{
              name: "7天",
              children: [{
                  name: "长江路-7天"
                },
                {
                  name: "望江路-7天"
                }]
            }]
        }],
      	list:[
      	{time:'2015-02-05 15:00',zu:562012,dan:'02单',dj:'28',num:3800,money:'32600.00',flag:true,ch:[
      	{time:'2015-02-05 12:00',zu:369520,dan:'02单',dj:'28',num:2800,money:'35652.00'},
      	{time:'2015-02-05 19:00',zu:666666,dan:'02单',dj:'28',num:1800,money:'78600.00'},
      	{time:'2015-02-05 12:00',zu:369520,dan:'02单',dj:'28',num:2800,money:'35652.00'},
      	{time:'2015-02-05 19:00',zu:666666,dan:'02单',dj:'28',num:1800,money:'78600.00'},
      	{time:'2015-02-05 12:00',zu:369520,dan:'02单',dj:'28',num:2800,money:'35652.00'},
      	{time:'2015-02-05 19:00',zu:666666,dan:'02单',dj:'28',num:1800,money:'78600.00'},
      	{time:'2015-02-05 12:00',zu:369520,dan:'02单',dj:'28',num:2800,money:'35652.00'},
      	{time:'2015-02-05 19:00',zu:666666,dan:'02单',dj:'28',num:1800,money:'78600.00'},
      	{time:'2015-02-05 12:00',zu:369520,dan:'02单',dj:'28',num:2800,money:'35652.00'},
      	{time:'2015-02-05 19:00',zu:666666,dan:'02单',dj:'28',num:1800,money:'78600.00'},
      	]},
      	{time:'2015-02-05 16:00',zu:562078,dan:'02单',dj:'28',num:2000,money:'15600.00',flag:false,ch:[{time:'2015-02-05 11:00',zu:556923,dan:'02单',dj:'28',num:2200,money:'22600.00'}]},
      	{time:'2015-02-05 17:00',zu:562022,dan:'02单',dj:'28',num:500,money:'75600.00',flag:false,ch:[{time:'2015-02-05 08:00',zu:234779,dan:'02单',dj:'28',num:4800,money:'39600.00'}]},
      	{time:'2015-02-05 18:00',zu:562036,dan:'02单',dj:'28',num:2900,money:'39600.00',flag:false,ch:[{time:'2015-02-05 19:00',zu:666666,dan:'02单',dj:'28',num:1800,money:'78600.00'}]},
      	]
      }
    },
    beforeCreate() {    	
    this.$nextTick(function () {
    	this.message='变了的信息2'
      console.log(this.message);
    })
},
    created(){
    	   this.message='变了的信息created后'
    	   console.log(this.message);
    	   console.log(this.$route.query.name)
    	   //this.showFun2(this.list[1],1)
    },
    watch:{//需要设置children子路由才能监听到，如果HelloWord加了<keep-alive>子组件也能监听到路由
         '$route' (to, from) {
			if(from.name==='father'){				
				  console.log(this.$route.path+'我从father来0000')	
						}
		    if(to.name==='test01'){				
				  console.log(to+'我到test01去')	
						}
		    if(to.name==='test03'){				
				  console.log('我到test03去')	
						}
		    if(to.name==='father'){				
				  console.log('我到father去')	
						}
					}
		},
    methods:{
    	menuEnter(el, done) {
    	  console.log(el.children,el.children.length)
	      el.offsetWidth;
	      el.style.maxHeight =  el.children.length*40+'px';
	      el.style.transition = "all 0.4s ease-in";
	      //done();
        },
        menuLeave(el) {
	      el.offsetWidth;
	      el.style.maxHeight = 0;
	      el.style.transition = "all 0.4s ease-out";
        },
    	showFun(item){     		
    		if(item.act){
					   this.$set(item, 'act', false);					  
			        	}
      	    else{					
					   this.$set(item, 'act', true);　
				   }  
    	},
    	showFun2(item,index){ 
    		this.ins=index      		
    		this.list.map((item,inde)=>{
    			if(inde!=index)
    			item.flag=false
    		})   		
    		item.flag=!item.flag
    		
            console.log(this.list)
			console.log(index,this.ins,item.flag)
    	},
    	check(e){
    		 
    		console.log(e.target.checked)
    	},
    	test3(){
    		console.log('测试监听路由')
    	},
    	test4(){ 		
    		console.log('不加括号行不')
    		return 'OK'
    	}
    },
    computed:{
    	 test2(){
        	return 'OK2'
        }
    },
   
  }
</script>

<style scoped="">
	.all{
		width:100%
	}
	.white{
		background: white;
	}
   .title{
   	  display: grid;
      grid-template-columns: repeat(6, 1fr) 50px;
   }
   .childItem{   	   
   	  display: grid;
      grid-template-columns:  repeat(6, 1fr) 50px;
   }
    .title>div,.childItem>div{
    	height:40px;
    	line-height: 40px;
    }
    .ul-box{
    	background: gray;
    	color:whitesmoke;     	
    }
    /*.ul-enter-active,   //第一种方法需要的样式
    .ul-leave-active {
       transition: all 0.2s;
                  }*/
    /*.ul-enter,
    .ul-leave-to {
       max-height: 0; 
       opacity: 0;     
       }*/
    .showClass{
    	display:block
    }
    .hidden{
    	display:none  	
    }
</style>