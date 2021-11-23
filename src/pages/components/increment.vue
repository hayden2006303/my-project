<template>
    <div>
        <button @click="add">+1</button>
        <button @click="plus">-1</button>
        <input type="text" v-model="incrementValue">
        <button @click="incrementWithValue">incr</button>
        <button @click="incrementWithValue2(incrementValue)">incr2</button>
        <button @click='test' style="vertical-align: 18px;">测试按钮</button>{{testData}}{{this.$store.state.testData}}
        <!-- 展示信息 -->
        <div v-if ="show">
            waiting 
        </div>
    </div>
</template>

<script>
	 import {mapActions} from "vuex";
     export default {
     	data(){
     		return{
     			 incrementValue: 0,
     			 testData:1
     		}
     	},
        methods: {
            //...mapActions(["decrement","increment"]),
　　　　　　　// 如果增加的名字与actions里面的名字不一样，mapActions 对应做出改变
            ...mapActions({
                add: "increment",
                plus:'decrement',
                incrementWithValue2:'incrementWithValue2'
            }),
             incrementWithValue() {
                this.$store.dispatch("incrementWithValue", this.incrementValue)
            },
            test(){           	
            	this.testData++
            	this.$store.dispatch("test",['testData',this.testData])
            }
        },
         computed: {
            show() {
                return this.$store.state.waiting;
            }
        },
    }
</script>

<style scoped>
	  button  {
        width: 100px;
        height: 100px;
        font-size: 30px;
    }
</style>