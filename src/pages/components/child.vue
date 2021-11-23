<template>
	<div>
	 <button @click="incrementCounter">{{$attrs.counte}}|{{counter2}}</button>
	 <span>{{$attrs.counte}}</span>
	 <!--<slot  :data="data"></slot>
	 <slot>gggg</slot>-->
	 <input type="text"  @input="handleInput" :value = "chec"/>
	 <span>child的$attrs: {{ $attrs}}</span>
	 </div>
</template>

<script>
	 export default{
     data(){
       return{
         count:this.$attrs.counte,
         counter2: 0,  
         data: ['zhangsan','lisi','wanwu','zhaoliu','tianqi','xiaoba']
       }
     },
     //inheritAttrs: true,
      model: {
       prop: 'chec',
       event: 'ffk'
           },
     props:['chec'],
     methods: {
     	handleInput (e) {
           this.$emit('ffk', e.target.value)
        },
       incrementCounter: function (){
         //this.counter += 1
         console.log(this.$attrs);
         this.count++
         this.counter2 += 2
         this.$emit('increment1',this.counte,this.counter2)        /*触发自定义事件increment1，也就是父组件中的incrementTotal1事件*/
         this.$emit('increment2',this.count,this.counter2)        /*触发自定义事件increment2，也就是父组件中的incrementTotal2事件*/                                       
         /*这两个事件一次只会触发一个，为什么呢？很简单，因为每次只单击一个按钮*/
       }
     }
  }
</script>

<style>
</style>