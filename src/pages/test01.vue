<template>
	<div>
    <p>测试01</p><p>{{this.$store.state.testDatanum}}</p>
     <router-link :to="{name:'test01',params:{id:'01',toNum:this.toNum}}">test01</router-link>
    <router-link :to="{name:'test02'}">test02</router-link>
    <router-link :to="{name:'test03',params:{id:'03'}}">test03</router-link>
    <router-link :to="{name:'father'}">father</router-link>
    <select  v-model="form.region">
    	<option>A</option>
    	<option>B</option>
    	<option>C</option>
    </select>
    {{change}}-{{this.$route.params.id}}
    <input type='text' @blur='printNum($event)' style='background:#fff;width:300px;height:30px;margin:0 auto 10px auto;display:block;border-radius: 3px;border:1px solid #E1E1E1;' placeholder="请输入列号以英文逗号隔开" v-model='toNum'/><a class="show-button" @click='changeData()'>升降</a>	
    <div class="wrapper"  @scroll="scollp()">
    <table>
		<col v-for='item,index in list1' v-show='num2.includes(item.num)' :span="item.col" :class='[ins[index]?"act1":"act2",fw[index]?"white":""]'>
		<thead>
		<tr><!--表格一级数字名称-->
			<td v-for='item,index in list1' :colspan="item.col"  v-show='num2.includes(item.num)' :class="['border-right',index<=2?'th_blue':'th_red']"><div><strong>{{item.num}}</strong></div></td>
		</tr>
		<tr><!--表格一级属性名称-->
			<td v-for='item,index in list1' v-show='num2.includes(item.num)' :colspan='item.col'  @click="changeColor(index)" :class="['border-right',index<=2?'th_blue':'th_red']"><div>{{item.name}}</div></td>
		</tr>
		<tr><!--表格二级属性名称-->
			<td  v-for='item,index in list2'  v-show='item.upname&&num2.includes(item.chnum)' :ref='item.upname' :class="index<=6? 'th_blue' : 'th_red'">
			  <div>
			  {{item.name}}
			  <input type="checkbox"  v-show='item.isup' :name="item.upname" @change="ch2($event,1)" />
			  <input type="checkbox"  v-show='item.isup' :name="item.upname" @change="ch2($event,2)" />
			  <input type="checkbox"  v-show='item.ischecked' :name="item.isname" :data-value='list404[index+1]' @change="ch($event,item.isname)" v-model='check[index+1]'/>
			  </div>
			</td>
		</tr>
		<tr><!--表格单条数据-->
			<td v-for='(value,key,ind) in list4newArr'  v-show='(key=="id"?false:true)&&num2.includes(nb[ind-1])' :ref='key' :class="ind<=7? 'th_blue' : 'th_red'">
				<div><div @click='showMatch(list4.id,key)' class='val'>{{value}}</div><input type='text' :data-name='key' @blur="inputData($event,ind)"/></div>
			</td>
		</tr>
		</thead>
		<tbody><!--表格筛选出的数据-->
		<tr v-for='item,index in list303' @click='changeTColor(index)' :class='[{"bg":indexarr[index]},"border"]'>
			<td v-for='(value,key,ind) in item'  @click='showMatch(item.id,key)' v-show='(key=="id"?false:true)&&num2.includes(nb[ind-1])' :ref="'c_'+ index+ind" :id="'c_'+ index+ind" :class="ind<=7? 'td_blue' : 'td_yellow'"><div>{{value}}</div></td>
		</tr>
		</tbody>
	</table>
  </div>
 </div>
</template>

<script> 
	import Vue from "vue";
  export default{
    data(){
      return{
      	form:{

         region:""

        },
        num2:['1','2','6','3','4','5'],
        toNum:'',
      	nb:[],
      	nbarr:[],
      	check:[],
      	checked:false,
        list1:[
            {name:'对战双方',col:2,row:1,child:[{name:'主',isup:false,upname:'mzup',chnum:'1',ischecked:true,isname:'mz'},{name:'客',isup:false,upname:'mkup',chnum:'1',ischecked:true,isname:'mk'}],num:'1'},
		    {name:'胜平负场次',col:3,row:1,child:[{name:'胜',isup:false,upname:'sup',chnum:'2',ischecked:true,isname:'s'},{name:'平',isup:false,upname:'pup',chnum:'2',ischecked:true,isname:'p'},{name:'负',isup:false,upname:'fup',chnum:'2',ischecked:true,isname:'f'}],num:'2'},
		    {name:'大小球',col:2,row:1,child:[{name:'大球',isup:false,upname:'bup',chnum:'3',ischecked:true,isname:'big'},{name:'小球',isup:false,upname:'smup',chnum:'3',ischecked:true,isname:'small'}],num:'3'},
		    {name:'六场积分差',col:1,row:1,num:'4',child:[{name:'',upname:'sixup',chnum:'4',ischecked:true,isname:'six'}]},
		    {name:'让球',col:1,row:1,num:'5',child:[{name:'',upname:'letgoalup',chnum:'5',ischecked:true,isname:'letgoal'}]},
		    {name:'叠金赔率',col:6,row:1,child:[{name:'',isup:false,upname:'dsnumup',chnum:'6',isname:'dsnum'},{name:'胜',isup:true,upname:'dsup',chnum:'6',isname:'ds'},{name:'',isup:false,upname:'dpnumup',chnum:'6',isname:'dpnum'},{name:'平',isup:true,upname:'dpup',chnum:'6',isname:'dp'},{name:'',isup:false,upname:'dfnumup',chnum:'6',isname:'dfnum'},{name:'负',isup:true,upname:'dfup',chnum:'6',isname:'df'}],num:'6'},
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
		  list4:{id:'004',mz:'河南建业',mk:'山东鲁能',s:2.5,p:1.5,f:3.1,big:-2.6,small:6.3,six:5.0,letgoal:1.9,dsup:1,dsnum:5,ds:2.2,dpup:2,dpnum:1,dp:2.6,dfup:1,dfnum:10,df:3.0},
		  list4newArr:{},
		  list404:[],
		  indexarr:[],
		  preparation_arr:[],
		  ins:[],
		  fw:[],
		  newArray:{},
		  newArr:[]
      }
    },
    created(){
    	this.allMethod()   	  	
    }, 
     mounted () {
           window.onresize = () => {
           this.scollp()		
                 }
                  },
    beforeRouteEnter(to, from, next){
	if(to.name === "test01"){    		
            		
            		next(vm => {
            			
              console.log(vm.$route.name)
         })
            	}else{
            		next()//进入test03 
            	}
},
    beforeRouteLeave(to, from, next){
	if(to.name === "test02"){    		
            		alert(`是否要到test02`)
            		next()
            	}else{
            		next()
            	}
},
    computed:{
    	change(){
    		    if(this.form.region){
    		    	return `你选择的是:${this.form.region}`
    		    }else{
    		    	return '你还没有选择'
    		    }
    			
    		
    	}
    },
   watch:{
   	'$route' (to, from) {
			if(from.name==='father'){
			  this.allMethod()
			  this.scollp()
						}
					},
	'form.region':function(newValue,oldValue){	
	       console.info(newValue);	
	       console.info(oldValue);	
	       console.log(`你选择了${newValue}`)		
	}	 
},
    methods:{
    	scollp(){
    		// 获取上下，左右滚动距离   
                        let scrollTop=document.getElementsByClassName('wrapper')[0].scrollTop;
                        let scrollLeft = document.getElementsByClassName('wrapper')[0].scrollLeft;

                        // 获取组件 
                        let theadList = document.getElementsByClassName('wrapper')[0].querySelectorAll('thead');
                        let thLeftList = document.getElementsByClassName('th_blue');
                        let tdLeftList = document.getElementsByClassName('td_blue');
						let tdYellow = document.getElementsByClassName('td_yellow');

                        // 固定表头
                        if(scrollTop>0) {
                            for(let i=0; i<theadList.length; i++) {
                                theadList[i].style.transform='translateY('+scrollTop+'px)'+' '+'translateZ('+400+'px)';	
                            }
                                     
                        }else{
                        	for(let i=0; i<theadList.length; i++) {
                                theadList[i].style.transform='none';	
                            }
                        }
                        // 固定表格中含有类名为td_blue和th_blue的元素
                        if(scrollLeft>=0) {
                            for(let i=0; i<tdLeftList.length; i++) {
                                tdLeftList[i].style.transform = 'translateX('+scrollLeft+'px)';										
                            }
                             for(let i=0; i<thLeftList.length; i++) {
                                thLeftList[i].style.transform = 'translateX('+scrollLeft+'px)';
                            }
                        }else{
                        	for(let i=0; i<tdLeftList.length; i++) {
                                tdLeftList[i].style.transform = 'none)';										
                            }
                             for(let i=0; i<thLeftList.length; i++) {
                                thLeftList[i].style.transform = 'none';
                            }
                        }                       
    	},
     allMethod(){
     	this.toNum=this.$route.params.toNum
     	console.log(this.toNum)
     	if(this.toNum!=undefined&&this.toNum!='all'){
      			this.num2=['1','2'].concat(this.toNum.split(','))
      		} 
      	else{
      			 for(var i=1;i<=94;i++){
      			  	  this.num2.push(i.toString())   			  	
      			  }
      		}
	 	this.list404=[]
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
		this.list4newArr= Object.assign({},this.list4)
		       delete this.list4newArr['dsup']
			   delete this.list4newArr['dpup']
			   delete this.list4newArr['dfup']    		   
	  	this.list404.push(...Object.values(this.list4newArr))    
	    for(let item of this.list1){
		  this.list2.push(...item.child)	//[{name:'胜',isup:true}]		 	 
		 
	 }		
	 for(let item of this.list2)  this.nb.push(item.chnum)		 
	 for(let i=0;i<this.list1.length;i++){
	    this.$set(this.fw,i,true)
	 }	 
	  	this.styleF()
	  	console.log(this.list2,this.list404)	  
      },
      styleF(){
      	this.$nextTick(()=> {
		   for(let item of Object.keys(this.list4newArr)){
		   	  //var idname=document.getElementById(item)
		   	   var idname=this.$refs[item][0]    //用ref可让样式时时变更
		   	  if(item=='mk'||item=='f'||item=='small'||item=='six'||item=='letgoal'||item=='df'){	   	 	
		   	 	idname.classList.add("border-right")
		   	    }
		   	  if(item=='mk'||item=='mz'){
		    	  idname.classList.add("pointer")
		   	    }
		   	  if(item=='dsnum'||item=='dfnum'||item=='dpnum'){
		   	  	  idname.classList.add("tdwidth")
		   	  }
		   	  if(item=='big'||item=='letgoal'||item=='six'||item=='small'){			  
				  if(idname.getElementsByClassName('val')[0].innerHTML<0)  idname.classList.add("red")			  
				}
		   }
	   for(let item of this.list2){
	   	 //var idname=document.getElementById(item.upname)
	   	 var idname=this.$refs[item.upname][0]
	   	 if(item.upname=='letgoalup'||item.upname=='sixup'||item.upname=='mkup'||item.upname=='fup'||item.upname=='smup'||item.upname=='dfup'){	   	 	
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
	inputData(e,num){
	    var name=e.target.dataset.name;
        var value=e.target.value
		var arr={[name]:value} 
		this.$set(this.check, num, false);
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
	ch(e,n){
	 	var name=e.target.name;     		
      	var value=e.target.dataset.value     			
        var arr={[name]:value}
	 	if(e.target.checked==true){	 		
	 	    this.preparation_arr=this.preparation_arr.filter(item=>Object.keys(item)[0]!=name)
	 	    this.preparation_arr.push(arr)
	 	}else{
	 		this.preparation_arr=this.preparation_arr.filter(item=>Object.keys(item)[0]!=name)
	 	}	 	
        this.$refs[n][0].getElementsByTagName('input')[0].value=''
	 	console.log(this.preparation_arr,this.$refs[n])
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
      	},
    },
    components:{/*子组件的实例，要尽量放在最后，不然会出现一些不必要的问题*/
     
    }
  }
</script>

<style scoped>
.wrapper {
            height: 200px;
            overflow: auto;
            width:700px
		}
table{	  
		  border-collapse: collapse;
          border-spacing: 0;        
          background: #ffffff;
          transform-style: preserve-3d
		}
td{
		  padding:0 5px;
		  text-align:center;
		  min-width: 50px; 
		  height: 30px; 	
			
		}
td>div{
	   height: 100%;
	   padding-right:10px;
	  /* padding:5px 10px 5px 0;*/
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
  	border-right:10px solid #e7e7e7;
  }
 tr.border:nth-child(2n+1) td{
		background: #f5f5f5
	}
tr td.pointer{
	cursor: pointer;
}
tr td.tdwidth,tr td.tdwidth>div{
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
</style>