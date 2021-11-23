<template>
 <div>
  <child-com1
   :name="name"
   :age="age"
   :gender="gender"
   :height="height"
   title="程序员成长指北"
   v-on:test1="onTest1"
  ></child-com1>
  <form method="post" action="http://localhost:8888/">
    <input type="text" name="name" />
    <input type="text" name="url" />
    <input type="submit" value="提交"/>
  </form>
  <!--<form action="http://127.0.0.1:8081/process_get" method="GET">-->
  <!--<form>-->
     First Name: <input type="text"  v-model='v1'>  <br>
 
     Last Name: <input type="text"  v-model='v2'>
     <input type="submit" value="Submit" @click='sub()'>
     	
  <!--</form>-->
  <div>{{LastName}}-{{FirstName}}</div>
 </div>
</template>
<script>
//const childCom1 = () => import("./childCom1.vue");
import childCom1 from './childCom1.vue';
export default {
 components: { childCom1 },
 data() {
  return {
   name: "zhang",
   age: "18",
   gender: "女",
   height: "158",
   FirstName:'',
   LastName:'',
   v1:'',
   v2:''
  };
 },
 mounted(){
  this.age='这是新的 age'
},
  methods: {
        onTest1() {
        	var http=require('http')
			var fs=require('fs')			
			var events=require('events')
			var eventEmitter=new events.EventEmitter()
            console.log( __dirname );
            var util = require('util'); 
function Person() { 
    this.name = 'byvoid'; 
    this.toString = function() { 
    return this.name; 
    }; 
} 
var obj = new Person(); 
console.log(util.inspect(obj)); 
console.log(util.inspect(obj, true)); 
            console.log('test1 running...');           
        },
        sub(){
        	let data={
        		first_name:this.v1,
        		last_name:this.v2     		
        	}
        	this.$http.post("/process_post",data).then(res=>{ //fs.js里面有接口
        		console.log(res)
      			this.LastName=res.data.first_name
      			this.FirstName=res.data.last_name
      		}).catch(error=>{      			
      			   console.log(error) 
      		})
        	
        }
    }//
};
</script>