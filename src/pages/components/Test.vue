<template>
  <div>
    <div>
    <h2>Page Test1</h2>
    </div>
    <div>
    <a href="javascript:" @click="changeName">udpate: 名称Name</a>  &nbsp; &nbsp;
    <a href="javascript:" @click="showName">显示更新后的Name</a> &nbsp; &nbsp;
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data(){
    return {}
  },
  computed: {
//  ...mapState('test1',{
//    state: state => state
//  }),
     ...mapState({//引用不同模块的状态值
      test1: state => state.test1,
      test2: state => state.test2,
    })
  },
  methods: {
    // test1 模块路径名
//  ...mapActions('test1',[
//    'udpateNameByAction'
//  ]),
    ...mapActions([//多个模块引用方式
      'test1/udpateNameByAction','test2/udpateNameByAction'
    ]),
    changeName(){
      this["test1/udpateNameByAction"]('ha ha test1 udpate !!')
      this["test2/udpateNameByAction"]('我是test2模块的内容 !!')
    },
    showName(){
      console.log(this.$store.state.test1.name)//test1的state下面的属性值
      console.log(this.$store.state.test2.name)
    },
  },
  mounted() {
    console.log("store name: ", this.$store)
    console.log("namespace test1 state: ", this.state,this.test1,this.test2)
  }
}
</script>

