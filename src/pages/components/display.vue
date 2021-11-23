<template>
    <div>
        <h3>Count is {{count}}</h3>
        <p>组件自己的内部计算属性 {{ localComputed }}</p>
    </div>
</template>

<script>
	import {mapState} from "vuex";
    export default {   	
        computed:{
        	localComputed () {
                return this.count + 10;
            },
        	...mapState(['count'])//不用重复写return this.$store.state
       }
    }
</script>

<style scoped>
    h3 {
        font-size: 30px;
    }
</style>