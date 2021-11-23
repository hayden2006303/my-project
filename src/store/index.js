import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex);


const test1 = {
  namespaced: true,
  state: {
    name: 'moduleA',
    type: 'module A'
  },
  mutations: {
    updateNameByMutation(state, appendStr){
      state.name = state.name + " append Str: " + appendStr
    }
  },
  actions: {
    udpateNameByAction({commit}, appendStr) {
      commit("updateNameByMutation", appendStr)
    }
  },
  getters: {
    getNameA(state){
      return state.name
    }
  }
}

const test2 = {
  // 当namespaced=true 时， vuex, 将会自动给各自module 添加访问路径名。 方便区分moduel
  namespaced: true,
  state:{
    name: 'moduleB',
    type: 'module B'
  },
  mutations: {
    updateNameByMutation(state, appendStr){
      state.name = state.name + " append Str: " + appendStr
    }
  },
  actions: {
    // 如果不使用命名空间， 那么view 指向actions 的该方法时，会执行所有与指定action名相同的函数（即：这里module A,B 中该action都会执行）
    udpateNameByAction({commit}, appendStr){
      commit("updateNameByMutation", appendStr)
    }
  },
  getters: {
    getNameB(state){
      return state.name
    }
  }
}



let store = new Vuex.Store({
	state:{
		count:0,
		waiting: false,
		testData:0,
		testDatanum:0,
		changeData:localStorage.changeData,
		name:'I am root state name'
	},
	mutations:{
		 // 加1
        INCREMENT(state) {
            state.count++;
             state.count=Math.round(state.count*100)/100
        },
        // 减1
        DECREMENT(state) {
            state.count--
             state.count=Math.round(state.count*100)/100
        },
         INCREMENT_WITH_VALUE(state, value){
            state.count +=value;
            state.count=Math.round(state.count*100)/100
        },
        // 显示和隐藏waiting
        SHOW_WAITING_MESSAGE(state){
            state.waiting = true;
        },
        HIDE_WAITING_MESSAGE(state){
            state.waiting = false;
        },
        TEST(state,data){
      	   state[data[0]]=data[1]       	
        },
        incrementWithValue2(state,data){
        	
        	state.count +=+data;
        	state.count=Math.round(state.count*100)/100
        }
	},
	actions:{
//		increment(context) {
//          context.commit("INCREMENT");
//      },
//      decrement(context) {
//          context.commit("DECREMENT");
//      }
        test({commit,state},data){
        	console.log(data)
         	//commit('TEST',data)
         	state[data[0]]=data[1]//在这里用了state,上面的TEST无效了
         },
        testnum({commit,state},data){
        	console.log(data)
         	//commit('TEST',data)
         	state[data[0]]=data[1]
         },
        increment({commit}){//函数会自动获得一个默认参数context,  它是一个store 实例，通过它可以获取到store 实例的属性和方法,如 context.state 就会获取到 state 属性， context.commit 就会执行commit命令。通过对象的解构赋值直接获取到该方法
            commit("INCREMENT")           
        },
        decrement({commit}){
            commit("DECREMENT")
        },
        incrementWithValue({commit}, value){
            commit("SHOW_WAITING_MESSAGE");
            let intValue = parseFloat(value)
            setTimeout(function() {
                if(isNaN(intValue)) {
                    alert("Not an Interger")
                }else {    
                    commit("HIDE_WAITING_MESSAGE");
                    commit("INCREMENT_WITH_VALUE", intValue)
                }
            }, 2000)
        },
        incrementWithValue2({commit}, value){        	
        	commit('incrementWithValue2',value)
        }
	},
	getters:{
		getData(){
			return state
		}
	},
	modules:{
    // 这里的路径名： test1, test2, 在view 中 通过 mapActions('test1', [actionName]) 使用并区分需要使用的module
    test1,
    test2
   }

})

export default store;