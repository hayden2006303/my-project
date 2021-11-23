<template>
	<div style="background: #e7e7e7;">
	<div id='newImg'>
	 <router-link :to="{name:'test01',params:{id:'01',toNum:this.toNum}}">test01</router-link>
	 <router-link :to="{name:'test03',params:{id:'03'}}">test03</router-link>
	 <router-link :to="{name:'test02'}">test02</router-link>
	 <router-link :to="{name:'fa'}">fa</router-link>
	 <a @click='test()'>测试传输数据到test01</a>
    <p>{{ total }}</p><div> <a @click='testnum()'>测试vue异步操作改变数据</a>{{this.$store.state.testDatanum}}</div>
    <child @increment1="incrementTotal1(arguments)" :counte="cou" :attrs='attrs' v-model='foo' v-bind="$attrs"/>    <!--自定义方法increment1监听子组件触发情况-->
    <child @increment2="incrementTotal2(arguments)" :counte="cou" v-model='foo' v-bind="$attrs"/>
    <input type="text" v-model="childrens.name" />
    <input type="text" v-model="lastName" />
    <!--<child> 
    	<template slot-scope="use">
        <ul>
          <li v-for="item in use.data">{{item}}</li>
        </ul>
       </template>
    </child>-->
    <!--自定义方法increment2监听子组件触发情况-->
    <p>{{this.num[0]}}|{{this.num[1]}}</p>
    <span @click=change>改变</span>
    <p v-show='isShowInfo'>{{arr}}-{{obj}}</p>
    <dia v-if="isDialog" @close="closeDialog"></dia>
    <span @click='showDialog'>showDialog</span> 
    <button @click='setImage'>测试截图</button>
    <button @click="switchCpt">动态切换组件</button>
    <button @click="reset">重置数据</button>
    				
    <component
            :is="currentView"
            @my-event="changeViewFun"
            @my-event2="changeViewFun"
            :msg2="msg"
        ></component>
    <!--<childa @my-event="getMyEvent" :msg2='msg' ref="child"></childa>	
      <br />
    <childb></childb> -->
 </div>
 <div><img :src='imgJt'/></div>
 <input type='text' @blur='printNum($event)' style='background:#fff;width:300px;height:30px;margin:0 auto 10px auto;display:block;border-radius: 3px;border:1px solid #E1E1E1;' placeholder="请输入列号以英文逗号隔开"/><a class="show-button" @click='changeData()'>升降</a>	
 <div class="wrapper2"  @scroll="scollp()">
  <table> 	    
		<col v-for='item,index in list1' v-show='num2.includes(item.num)' :span="item.col" :class='[ins[index]?"act1":"act2",fw[index]?"white":""]'>
		<thead>
		<tr><!--表格一级数字名称-->
			<td v-for='item,index in list1' :colspan="item.col"  v-show='num2.includes(item.num)' :class="['border-right',index<=2?'th_blue':'th_red']">
				<div><strong>{{item.num}}</strong></div></td>
		</tr>
		<tr><!--表格一级属性名称-->
			<td v-for='item,index in list1' v-show='num2.includes(item.num)' :colspan='item.col' :rowspan='item.row' @click="changeColor(index)" :class="['border-right',index<=2?'th_blue':'th_red']">
				<div>{{item.name}}</div>
			</td>
		</tr>
		<tr><!--表格二级属性名称-->
			<td  v-for='item,index in list2'  v-show='item.upname&&num2.includes(item.chnum)' :id="item.upname" :ref='item.upname' :class="index<=6? 'th_blue' : 'th_red'">
			  <div>{{item.name}}
			  <input type="checkbox"  v-show='item.isup' :name="item.upname" @change="ch2($event,1)" />
			  <input type="checkbox"  v-show='item.isup' :name="item.upname" @change="ch2($event,2)" />	
			  </div>
			</td>
		</tr>
		<tr><!--表格输入筛选项-->
			<td v-for='keyname,index in listname' :id='keyname' v-show='num2.includes(nb[index])' :ref='keyname' :class="index<=6? 'th_blue' : 'th_red'">
				<div><input type='text' :data-name='keyname' @blur="inputData($event)"/></div></td>
		</tr>
		</thead>
		<tbody><!--表格筛选出的数据-->
		<tr v-for='item,index in list303' @click='changeTColor(index)' :class='[{"bg":indexarr[index]},"border"]'>
			<td v-for='(value,key,ind) in item' :id="'c_'+ index+ind" @click='showMatch(item.id,key)' v-show='(key=="id"?false:true)&&num2.includes(nb[ind-1])' :ref="'c_'+ index+ind" :class="ind<=7? 'td_blue' : 'td_yellow'"><div>{{value}}</div></td>
		</tr>
		</tbody>
	</table>
  </div>
 </div>
</template>

<script>
  import childa from './components/c1.vue';
  import childb from './components/c2.vue';
  import child from './components/child.vue'
  import dia from './components/dialog.vue'
  import html2canvas from 'html2canvas'
  var external = {
    template: '<div>refer external object </div>'
}
  export default{
  	name: "father",
    data(){
      return{
      	  attrs:'attrs属性',
      	  pathUrl:'',
      	  currentView:external,
      	  num2:['1','2','6','3','4','5'],
      	  nb:[],
      	  nbarr:[],
      	  checked:false,
      	  msg:'什么也没有',
      	  isDialog:false,
      	  arr:[1,2,3],
          obj:{
              a: 1,
              b: 2
          },
      	  test2:'',
          total:0,
          num:[0,0],
          cou:0,
          parentMsg: 'a message from parent',
          foo:'dd6',
          childrens: {
             name: '小强',
             age: 20,
             sex: '男'
           },
          tdArray:["1","2"],
          lastName:"张三",
          imgJt:'',
          list1:[
            {name:'对战双方',col:2,row:1,child:[{name:'主',isup:false,upname:'mzup',chnum:'1',ischecked:true,isname:'mz'},{name:'客',isup:false,upname:'mkup',chnum:'1',ischecked:true,isname:'mk'}],num:'1'},
		    {name:'胜平负场次',col:3,row:1,child:[{name:'胜',isup:false,upname:'sup',chnum:'2',ischecked:true,isname:'s'},{name:'平',isup:false,upname:'pup',chnum:'2',ischecked:true,isname:'p'},{name:'负',isup:false,upname:'fup',chnum:'2',ischecked:true,isname:'f'}],num:'2'},
		    {name:'大小球',col:2,row:1,child:[{name:'大球',isup:false,upname:'bup',chnum:'3',ischecked:true,isname:'big'},{name:'小球',isup:false,upname:'smup',chnum:'3',ischecked:true,isname:'small'}],num:'3'},
		    {name:'六场积分差',col:1,row:2,num:'4',child:[{upname:null,chnum:'4',ischecked:true,isname:'six'}]},
		    {name:'让球',col:1,row:2,num:'5',child:[{upname:null,chnum:'5',ischecked:true,isname:'letgoal'}]},
		    {name:'叠金赔率',col:6,row:1,child:[{name:'',isup:false,upname:'dsnum',chnum:'6',isname:'dsnum'},{name:'胜',isup:true,upname:'dsup',chnum:'6',isname:'ds'},{name:'',isup:false,upname:'dpnum',chnum:'6',isname:'dpnum'},{name:'平',isup:true,upname:'dpup',chnum:'6',isname:'dp'},{name:'',isup:false,upname:'dfnum',chnum:'6',isname:'dfnum'},{name:'负',isup:true,upname:'dfup',chnum:'6',isname:'df'}],num:'6'},
	            ],
		  list2:[],
		  list3:[
			  {
			   id:'001',mz:'上海申花',mk:'重庆力帆',s:2.5,p:1.5,f:3.1,big:-2.6,small:6.3,six:5.0,letgoal:1.9,dsup:1,dsnum:5,ds:2.2,dpup:2,dpnum:6,dp:2.6,dfup:1,dfnum:2,df:3.0
			  },
			   {
			   id:'002',mz:'广州恒大',mk:'北京国安',s:3.5,p:2.5,f:1.1,big:-2.8,small:7.3,six:-8,letgoal:-3.0,dsup:2,dsnum:2,ds:5.0,dpup:2,dpnum:7,dp:4.6,dfup:2,dfnum:7,df:4.0
			  },
			   {
			   id:'003',mz:'江苏苏宁',mk:'天津泰达',s:9.1,p:8.5,f:3.6,big:8.6,small:-3.3,six:5.2,letgoal:7.9,dsup:1,dsnum:3,ds:3.2,dpup:1,dpnum:2,dp:3.6,dfup:2,dfnum:29,df:3.8
			  },
			  {
			   id:'004',mz:'河南建业',mk:'山东鲁能',s:2.5,p:1.5,f:3.1,big:-2.6,small:6.3,six:5.0,letgoal:1.9,dsup:1,dsnum:5,ds:2.2,dpup:2,dpnum:1,dp:2.6,dfup:1,dfnum:10,df:3.0
			  },
			   {
			   id:'005',mz:'武汉卓尔',mk:'上海上港',s:3.5,p:2.5,f:1.1,big:-2.8,small:7.3,six:-8,letgoal:-3.0,dsup:2,dsnum:1,ds:5.0,dpup:2,dpnum:3,dp:4.6,dfup:2,dfnum:3,df:4.0
			  },
			  {
			   id:'006',mz:'江苏苏宁',mk:'天津泰达',s:9.1,p:8.5,f:3.6,big:8.6,small:-3.3,six:5.2,letgoal:7.9,dsup:1,dsnum:3,ds:3.2,dpup:1,dpnum:2,dp:3.6,dfup:2,dfnum:29,df:3.8
			  },
			  {
			   id:'007',mz:'河南建业',mk:'山东鲁能',s:2.5,p:1.5,f:3.1,big:-2.6,small:6.3,six:5.0,letgoal:1.9,dsup:1,dsnum:5,ds:2.2,dpup:2,dpnum:1,dp:2.6,dfup:1,dfnum:10,df:3.0
			  },
			   {
			   id:'008',mz:'武汉卓尔',mk:'上海上港',s:3.5,p:2.5,f:1.1,big:-2.8,small:7.3,six:-8,letgoal:-3.0,dsup:2,dsnum:1,ds:5.0,dpup:2,dpnum:3,dp:4.6,dfup:2,dfnum:3,df:4.0
			  }
		  ],
		  list303:[],
		  indexarr:[],
		  listname:[],
		  preparation_arr:[],
		  ins:[],
		  fw:[],
		  newArray:{},
		  newArr:[],
		  toNum:'',
		   opacity: 0
      }
    },
    created(){    	
    // localStorage.changeData=true
     //this.$store.state.changeData=localStorage.changeData
     this.allMethod()
     console.log(1)
    },
    activated(){//需要配合<keep-alive>使用，否则无效
    	console.log('执行了101')
    },
    directives: {
            'fixed-thead': {
                bind: function(el) {
                    el.onscroll=function(){
                        // 获取上下，左右滚动距离
                        let scrollTop=el.scrollTop;
                        let scrollLeft = el.scrollLeft;

                        // 获取组件
                        let theadList = el.querySelectorAll('thead');
                        let thLeftList = document.getElementsByClassName('th_blue');
                        let tdLeftList = document.getElementsByClassName('td_blue');
						let tdYellow = document.getElementsByClassName('td_yellow');

                        // 固定表头
                        if(theadList) {
                            for(let i=0; i<theadList.length; i++) {
                                theadList[i].style.transform='translateY('+scrollTop+'px)'+' '+'translateZ('+400+'px)';	
                            }
                                     
                        }
                        // 固定表格中含有类名为td_blue的元素
                        if(tdLeftList) {
                            for(let i=0; i<tdLeftList.length; i++) {
                                tdLeftList[i].style.transform = 'translateX('+scrollLeft+'px)';										
                            }
                        }                       
                        // 固定表头中含有类名为th_blue的元素
                        if(thLeftList) {
                            for(let i=0; i<thLeftList.length; i++) {
                                thLeftList[i].style.transform = 'translateX('+scrollLeft+'px)';
                            }
                        }
                    };
                }
            }
        },
    watch:{
    	'$route' (to, from) {
    		console.log(to)
						if(from.name==='test01'){
							console.log('我从test01来')	
							this.scollp()							
						}
					},
      childrens:{
        handler:function(val,oldval){
          console.log(val.name)
        },
        deep:true//对象内部的属性监听，也叫深度监听
      },
      'childrens.name':function(val,oldval){
        console.log(val+"aaa")
      },//键路径必须加上引号
      lastName:function(val,oldval){
        console.log(this.lastName)
      }
      
    },//以V-model绑定数据时使用的数据变化监测
    //主动调用$watch方法来进行数据监测
    computed:{    	     
    isShowInfo(){
    	return this.$store.state.changeData==='true'?true:false;
    }
  },
    methods:{
    	reset(){   		
    		Object.assign(this.$data, this.$options.data.call(this))//重置数据，也可用于表单清空
    	},
    	test(){
    		this.$router.push({path:"/test02", query:{name:'nameValue',code:10011}});
    		//this.$router.push({path:"test02", params:{name:'nameValue',id:'01'}});
    	},
    	scollp(){
    		// 获取上下，左右滚动距离
                        let scrollTop=document.getElementsByClassName('wrapper2')[0].scrollTop;
                        let scrollLeft = document.getElementsByClassName('wrapper2')[0].scrollLeft;

                        // 获取组件
                        let theadList = document.getElementsByClassName('wrapper2')[0].querySelectorAll('thead');
                        let thLeftList = document.getElementsByClassName('th_blue');
                        let tdLeftList = document.getElementsByClassName('td_blue');
						let tdYellow = document.getElementsByClassName('td_yellow');						                        
                        // 固定表头
//                      if(scrollTop>0) {
//                          for(let i=0; i<theadList.length; i++) {
//                              theadList[i].style.transform='translateY('+scrollTop+'px)'+' '+'translateZ('+400+'px)';	
//                          }
//                                   
//                      }else{
//                      	for(let i=0; i<theadList.length; i++) {
//                              theadList[i].style.transform='none';	
//                          }
//                      }

                        for(let i=0; i<theadList.length; i++) {
                                theadList[i].style.transform='translateY('+scrollTop+'px)'+' '+'translateZ('+400+'px)';	
                            }
                        // 固定表格中含有类名为td_blue和th_blue的元素
                        
                        for(let i=0; i<tdLeftList.length; i++) {
                                tdLeftList[i].style.transform = 'translateX('+scrollLeft+'px)';									
                            }
                        for(let i=0; i<thLeftList.length; i++) {
                                thLeftList[i].style.transform = 'translateX('+scrollLeft+'px)';
                            }   
//                      if(scrollLeft>=0) {
//                          for(let i=0; i<tdLeftList.length; i++) {
//                              tdLeftList[i].style.transform = 'translateX('+scrollLeft+'px)';										
//                          }
//                           for(let i=0; i<thLeftList.length; i++) {
//                              thLeftList[i].style.transform = 'translateX('+scrollLeft+'px)';
//                          }
//                      }else{
//                      	for(let i=0; i<tdLeftList.length; i++) {
//                              tdLeftList[i].style.transform = 'none';										
//                          }
//                           for(let i=0; i<thLeftList.length; i++) {
//                              thLeftList[i].style.transform = 'none';
//                          }
//                      }                 
    	},
      allMethod(){
      	this.listname=[]
		this.list2=[]
		this.list3=[
			  {
			   id:'001',mz:'上海申花',mk:'重庆力帆',s:2.5,p:1.5,f:3.1,big:-2.6,small:6.3,six:5.0,letgoal:1.9,dsup:1,dsnum:5,ds:2.2,dpup:2,dpnum:6,dp:2.6,dfup:1,dfnum:2,df:3.0
			  },
			   {
			   id:'002',mz:'广州恒大',mk:'北京国安',s:3.5,p:2.5,f:1.1,big:-2.8,small:7.3,six:-8,letgoal:-3.0,dsup:2,dsnum:2,ds:5.0,dpup:2,dpnum:7,dp:4.6,dfup:2,dfnum:7,df:4.0
			  },
			   {
			   id:'003',mz:'江苏苏宁',mk:'天津泰达',s:9.1,p:8.5,f:3.6,big:8.6,small:-3.3,six:5.2,letgoal:7.9,dsup:1,dsnum:3,ds:3.2,dpup:1,dpnum:2,dp:3.6,dfup:2,dfnum:29,df:3.8
			  },
			  {
			   id:'004',mz:'河南建业',mk:'山东鲁能',s:2.5,p:1.5,f:3.1,big:-2.6,small:6.3,six:5.0,letgoal:1.9,dsup:1,dsnum:5,ds:2.2,dpup:2,dpnum:1,dp:2.6,dfup:1,dfnum:10,df:3.0
			  },
			   {
			   id:'005',mz:'武汉卓尔',mk:'上海上港',s:3.5,p:2.5,f:1.1,big:-2.8,small:7.3,six:-8,letgoal:-3.0,dsup:2,dsnum:1,ds:5.0,dpup:2,dpnum:3,dp:4.6,dfup:2,dfnum:3,df:4.0
			  },
			  {
			   id:'006',mz:'江苏苏宁',mk:'天津泰达',s:9.1,p:8.5,f:3.6,big:8.6,small:-3.3,six:5.2,letgoal:7.9,dsup:1,dsnum:3,ds:3.2,dpup:1,dpnum:2,dp:3.6,dfup:2,dfnum:29,df:3.8
			  },
			  {
			   id:'007',mz:'河南建业',mk:'山东鲁能',s:2.5,p:1.5,f:3.1,big:-2.6,small:6.3,six:5.0,letgoal:1.9,dsup:1,dsnum:5,ds:2.2,dpup:2,dpnum:1,dp:2.6,dfup:1,dfnum:10,df:3.0
			  },
			   {
			   id:'008',mz:'武汉卓尔',mk:'上海上港',s:3.5,p:2.5,f:1.1,big:-2.8,small:7.3,six:-8,letgoal:-3.0,dsup:2,dsnum:1,ds:5.0,dpup:2,dpnum:3,dp:4.6,dfup:2,dfnum:3,df:4.0
			  }
		  ]
     	this.newArr=this.list3
      	this.list303 = JSON.parse(JSON.stringify(this.list3));
    	this.list303.map((item,index)=>{
    		   delete item['dsup']
    		   delete item['dpup']
    		   delete item['dfup']    		   
    	})   
        for(let item of this.list1){
		 if(item.child.length>1) this.list2.push(...item.child)	//[{name:'胜',isup:true}]		 	
		 this.nbarr.push(...item.child)  
		 
	 }	
	 for(let item of this.nbarr)  this.nb.push(item.chnum)	
	 this.listname.push(...Object.keys(this.list303[0]))
	 this.listname.splice(0,1)
	 for(let i=0;i<this.list1.length;i++){
	    this.$set(this.fw,i,true)
	  }
	   this.styleF()
	   console.log(this.list2)	
      },
      styleF(){
      	this.$nextTick(()=> {
	   for(let item of this.listname){
	   	  //var idname=document.getElementById(item)
	   	   var idname=this.$refs[item][0]
	   	  if(item=='mk'||item=='f'||item=='small'||item=='six'||item=='letgoal'||item=='df'){	   	 	
	   	 	idname.classList.add("border-right")	   	 	
	   	 }
	   }
	   for(let item of this.list2){
	   	 //var idname=document.getElementById(item.upname)
	   	 var idname=this.$refs[item.upname][0]
	   	 if(item.upname=='mkup'||item.upname=='fup'||item.upname=='smup'||item.upname=='dfup'){	   	 	
	   	     idname.classList.add("border-right")	   	    	
	   	 }	   	 
	   }
	   for(let i=0;i<this.list303.length;i++){
	     for(let list of Object.keys(this.list303[i])){
	    	if(list=='mk'||list=='df'||list=='f'||list=='letgoal'||list=='six'||list=='small'){
	    		var ii= Object.keys(this.list303[i]).findIndex(v=>v==list)
			    //var cId=document.getElementById('c_'+i+ii)
			    var cId=this.$refs['c_'+i+ii][0]
			    cId.classList.add("border-right")
	    	}
	    	if(list=='mk'||list=='mz'){
	    	   var ii= Object.keys(this.list303[i]).findIndex(v=>v==list)
			   //var cId=document.getElementById('c_'+i+ii)
			   var cId=this.$refs['c_'+i+ii][0]
	   	 	   cId.classList.add("pointer")
	   	    }
	    	if(list=='dsnum'||list=='dfnum'||list=='dpnum'){
	    		var ii= Object.keys(this.list303[i]).findIndex(v=>v==list)
			    //var cId=document.getElementById('c_'+i+ii)
			    var cId=this.$refs['c_'+i+ii][0]
			    cId.classList.add("tdwidth")
	    	}
		    if(list=='big'||list=='letgoal'||list=='six'||list=='small'){
			  var ii= Object.keys(this.list303[i]).findIndex(v=>v==list)
			  //var cId=document.getElementById('c_'+i+ii)
			  var cId=this.$refs['c_'+i+ii][0]
			  cId.classList.remove("red");
			  if(cId.firstElementChild.innerHTML<0)  cId.classList.add("red")
			}
              var ii0= Object.keys(this.list303[i]).findIndex(v=>v=='ds')
              //var cId0=document.getElementById('c_'+i+ii0)
              var cId0=this.$refs['c_'+i+ii0][0]
              var ii1= Object.keys(this.list303[i]).findIndex(v=>v=='s')
              //var cId1=document.getElementById('c_'+i+ii1)
              var cId1=this.$refs['c_'+i+ii1][0]
              cId0.classList.remove("red","green");             
              if(cId0.firstElementChild.innerHTML>cId1.firstElementChild.innerHTML) cId0.classList.add("red")
              else if(cId0.firstElementChild.innerHTML<cId1.firstElementChild.innerHTML) cId0.classList.add("green")
              
              var ii2= Object.keys(this.list303[i]).findIndex(v=>v=='dp')
             // var cId2=document.getElementById('c_'+i+ii2)
              var cId2=this.$refs['c_'+i+ii2][0]
              var ii3= Object.keys(this.list303[i]).findIndex(v=>v=='p')
              //var cId3=document.getElementById('c_'+i+ii3)
              var cId3=this.$refs['c_'+i+ii3][0]
              cId2.classList.remove("red","green");
              if(cId2.firstElementChild.innerHTML>cId3.firstElementChild.innerHTML) cId2.classList.add("red")
              else if(cId2.firstElementChild.innerHTML<cId3.firstElementChild.innerHTML) cId2.classList.add("green")
              
              var ii4= Object.keys(this.list303[i]).findIndex(v=>v=='df')
             // var cId4=document.getElementById('c_'+i+ii4)
              var cId4=this.$refs['c_'+i+ii4][0]
              var ii5= Object.keys(this.list303[i]).findIndex(v=>v=='f')
             // var cId5=document.getElementById('c_'+i+ii5)
              var cId5=this.$refs['c_'+i+ii5][0]
              cId4.classList.remove("red","green");
              if(cId4.firstElementChild.innerHTML>cId5.firstElementChild.innerHTML) cId4.classList.add("red")
              else if(cId4.firstElementChild.innerHTML<cId5.firstElementChild.innerHTML) cId4.classList.add("green")
	     
		}
	  }
    })
      	
      },
      changeData(){
      		 let keys = Object.keys(this.newArray)
             var showArr= this.newArr.filter(item => {
                  return keys.every(key => item[key] === this.newArray[key])
              })
	      		 if(keys.length>0){
		      		  this.list3=showArr
		      		  this.list303 = JSON.parse(JSON.stringify(this.list3));
				      this.list303.map((item,index)=>{
				    		   delete item['dsup']
				    		   delete item['dpup']
				    		   delete item['dfup']    		   
				    	})	
				    	this.styleF()
						  }else{						  	
						    this.allMethod() 	
						  }
			   },
      changeTColor(index){     	
      	if(this.indexarr[index]){
					   this.$set(this.indexarr, index, false);//为item添加不存在的属性，需要使用vue提供的Vue.set( object, key, value )方法。					  
			        	}
      	else{					
					   this.$set(this.indexarr, index, true);　
				   }      	
      },
	 inputData(e){
	    var name=e.target.dataset.name;
        var value=e.target.value
		var arr={[name]:value} 
		this.preparation_arr=this.preparation_arr.filter(item=>Object.keys(item)[0]!=name)
		if(value!=""){
      			this.preparation_arr.push(arr)
      		}
		console.log(this.preparation_arr,1)
	 },
	 ch2(e,num){      		
			var name=e.target.name;     		     			    			
      	    var arr={[name]:num}       			
            if(e.target.checked==true){ 
            	  if(num==1){
		      		 e.currentTarget.nextElementSibling.checked=false
		      			}else{  
		      		 e.currentTarget.previousElementSibling.checked=false		
		      			}                       
                        this.newArray[name]=num                                           
      		}else{       			          			                           
                   for(var key in this.newArray){
                       if(key==name){
                          delete this.newArray[key]                       		 
                        	}
                        }
                 
      	 } 
      	},
	 ch(e){
	 	var name=e.target.name;     		
      	var value=e.target.dataset.value     			
        var arr={[name]:value}
	 	if(e.target.checked==true){	 		
	 	    this.preparation_arr=this.preparation_arr.filter(item=>Object.keys(item)[0]!=name)
	 	    this.preparation_arr.push(arr)
	 	}else{
	 		this.preparation_arr=this.preparation_arr.filter(item=>Object.keys(item)[0]!=name)
	 	}
	 	console.log(this.preparation_arr)
	 },
	changeColor(index){ 
		
		if(this.ins[index]){
            this.$set(this.ins, index, false);				  
        }else{					
			this.$set(this.ins, index, true);　
				   } 
		this.$set(this.fw, index, false);//为item添加不存在的属性，需要使用vue提供的Vue.set( object, key, value )方法。					  
			        										  
      	},
    showMatch(id,key){
    	if(key=='mk'||key=='mz') console.log(id,key)
    	else console.log('不跳转')
    },
    printNum(e){
      		var newA=[]
      		if(e.target.value=='all'){
      			  for(var i=1;i<=94;i++){
      			  	  newA.push(i.toString())   			  	
      			  }
      			this.num2=newA
      		}else{
      			this.num2=['1','2'].concat(e.target.value.split(','))
      		}      		     		      		  
      		this.toNum=e.target.value
      		console.log(this.num2)
      	},
    	getData(){
    	 	console.log(0)
    	 },
    	showDialog(){
        this.isDialog = true
//      this.$watch("lastName",function(val,oldval){
//       console.log(val)
//        })
       },
        closeDialog(){
        this.isDialog = false
       },
    	change(){  
    		//localStorage.removeItem('changeData')
    		 localStorage.changeData=true
    		 //this.$store.state.changeData=localStorage.changeData
    		 //console.log(this.$store.state.changeData)
    		 setTimeout(()=>{
    		 	localStorage.changeData=false
    		 	 this.$set(this.$store.state,'changeData',localStorage.changeData)
    		 	//this.$store.state.changeData=localStorage.changeData
    		 	//console.log(this.$store.state.changeData)
    		 	//this.$set(this.arr,0,localStorage.changeData)
    		 },2000)
    		 //this.$store.state.changeData=localStorage.changeData
    		this.$set(this.$store.state,'changeData',localStorage.changeData)
    		this.$set(this.arr,0,localStorage.changeData)
    		this.$set(this.obj, "c", "OBKoro1")
    		this.childrens['name']='光头'
//  		this.arr[0] = 'OBKoro1';
//		    this.arr.length = 1;
//		    console.log(this.arr);// ['OBKoro1'];
//		    // 数据更新 对象视图不更新
//		    this.obj.c = 'OBKoro1';
//		    delete this.obj.a;
//		    console.log(this.obj);  // {b:2,c:'OBKoro1'}   		
    	},
      incrementTotal1: function (e) {   
      	/*事件incrementTotal触发*/
      	console.log(e)
        this.total += 1 
        this.cou+=1
         //this.num=cout2 
      },
      incrementTotal2: function (cout) {  
      	/*事件incrementTota2触发*/
      	//this.cou+=1
      	console.log(cout)
        this.total += 2
        this.num=cout
      },
      setImage(){
      let that = this;
      event.preventDefault();
      var canvas2 = document.createElement("canvas");
      let _canvas = document.getElementById('newImg');
      var w = parseInt(window.getComputedStyle(_canvas).width);
      var h = parseInt(window.getComputedStyle(_canvas).height);
      //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了  
      canvas2.width = w * 2;
      canvas2.height = h * 2;
      canvas2.style.width = w + "px";
      canvas2.style.height = h + "px";
      //可以按照自己的需求，对context的参数修改,translate指的是偏移量  
      //  var context = canvas.getContext("2d"); 
      //  context.translate(0,0);  
      var context = canvas2.getContext("2d");
      context.scale(2, 2);
      html2canvas(document.getElementById('newImg'), {
        canvas: canvas2
      }).then(canvas=> {
        var blob = that.getBlob(canvas);
        console.log(canvas.toDataURL())
        this.imgJt=canvas.toDataURL()
        //document.querySelector(".down").setAttribute('href', canvas.toDataURL());
//      var oMyForm = new FormData();
//      var fileName = "mobile" + '.jpg'
//      oMyForm.append("file", blob, fileName);
//      //				oMyForm.append("fileName", fileName);　　　　
//      oMyForm.append("fileType", 'image');
//      oMyForm.append("user_id", that.global.company.id)
//      that.uploadFile(that.global.ossservice + "/oss/uploadorgFile", oMyForm).then(res => {
//      if (res.data.errorCode != '00') {
//          that.$message.error(res.data.errorMsg);
//          return;
//        }
//         return res.data.sprbody.urlAddress;
//      });

      });
    },
    getBlob (canvas) { //获取blob对象
      var data = canvas.toDataURL("image/jpeg", 1);
      data = data.split(',')[1];
      data = window.atob(data);
      var ia = new Uint8Array(data.length);
      for (var i = 0; i < data.length; i++) {
        ia[i] = data.charCodeAt(i);
      }
      return new Blob([ia], {
        type: "image/jpeg"
      });
    },
    getMyEvent(msg){
    	  this.msg=msg
          console.log('接收的数据--------->'+msg)//接收的数据--------->我是子组件中的数据
      },
    testnum(){
    	  this.$store.dispatch("testnum",['testDatanum',100])
    },
     changeViewFun(val){
                this.msg = val;
                console.log(2)
            },
     switchCpt(){
            var arr = [external,'childa','childb']
            var index = arr.indexOf(this.currentView)
            if(index < 2){
                this.currentView = arr[index+1]
            }else{
                this.currentView = arr[0]
            }         
        }
    },
    
    components:{                        /*子组件的实例，要尽量放在最后，不然会出现一些不必要的问题*/
      child,dia,childa,childb
    }
  }
</script>

<style scoped vars="{ opacity }">
.wrapper2 {
            height: 200px;
            overflow: auto;
            width:700px;
           
		}
table{	  
		  border-collapse: collapse;
          border-spacing: 0;        
          background: #ffffff;
          font-size: 16px;
          transform-style: preserve-3d
		}
td{
		  /*border-bottom:1px solid #e7e7e7;*/
		  padding:0 5px;
		  text-align:center;
		  min-width: 50px; 
		  height: 30px; 		   
		}
td>div{
	   height: 100%;
	   padding-right:10px;
	   /*padding:5px 10px 5px 0;*/
	   width:calc(100% - 15px);
	   white-space:nowrap;	
	   line-height: 30px; 
}
.bg td{
		   background:yellow
		}
input[type="checkbox"]{
		width: 13px;
		height:13px;
		vertical-align:-2px;
		margin: 0;
	} 
input[type="text"]{
  	      width: 30px;
  	      text-align: center;
  	      background: none;
  	      border:none 	
  }
  .act1{
          background:lightcyan; 
         }
  .act2{
      	background: lightgoldenrodyellow;  	
        }
  .white{
    	background:none
       }
 .red{
  	    color:red
       }
  .green{
  	     color:green
       }
  tr.border td{
  	border:0
  }
 tr td.border-right>div{
  	border-right:10px solid #e7e7e7
  }
 tr.border:nth-child(2n+1){
		background: rgba(245,245,245,.4);
	}
tr td.pointer{
	cursor: pointer;
}
tr td.tdwidth{
	font-weight: bold;	
}
a.show-button{
  	background: #fff;
  	text-align: center;
  	padding:0px 11px;
  	color:#000;
  	border:1px solid #999;
  	border-radius: 3px;
  	height: 51px;
  	line-height: 51px;
  }
.th_blue {
                background-color: #ffffff;
                      
              }

.th_red {
               background-color: #ffffff;
                       
                    }

 .td_blue {
               background-color: #ffffff;
                              	                     
                    }
                    #color: rgb(65, 184, 131);
 #newImg{
 	
 	--color:red
 }
 button{
 	color: var(--color);
    opacity: var(--opacity);
 }

</style>