<template>
 <div>
    <span>b组件,a传的的数据为->{{msg2}}</span>
    <input type="button" value="把a组件数据传给b2" @click ="send">
 </div>
</template>
<script>
	  import vmson from "../emptyVue"
	  export default {
		 data(){
		        return {
		            msg:""
		        }
		    },
		props: [ 'msg2' ],
		 mounted(){
//		        vmson.$on("aevent",(val)=>{//监听事件aevent，回调函数要使用箭头函数;
//		            console.log(val);//打印结果：我是a组件的数据
//		            this.msg = val;
//		        })
		},
		methods:{
        send:function(){
        	//console.log(vmson)
            this.$emit("my-event2",'5555')
        }
    }
	}
</script>
<style>
</style>