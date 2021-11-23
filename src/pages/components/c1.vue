<template>
	<div>
        <span>A组件->{{msg}}</span>
        <span>父组件->{{msg2}}</span>
        <input type="button" value="把a组件数据传给b" @click ="send">
    </div>
</template>

<script>
import vmson from "../emptyVue"
export default {
    data(){
        return {
            msg:{
            	a:'111',
            	b:'222'
            }
        }
    },
    props: [ 'msg2' ],
    methods:{
        send:function(){
        	//console.log(vmson)
            this.$emit("my-event",'1222')
        }
    }
}
</script>

<style>
</style>