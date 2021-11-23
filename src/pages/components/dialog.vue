<template>	
	 <div @click="close"> 点击关闭 </div> 
</template>

<script>
	 export default{
     data(){
       return{
         
       }
     },
     
     methods: {
     	close() {
        this.$emit('close')
         }
     }
  }
</script>

<style>
</style>