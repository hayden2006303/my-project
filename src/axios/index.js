//axios在多处都会被用到,在这里对axios进行一次封装
import axios from "axios";
import qs from "qs";
let  instance = axios.create({//创建axios通用配置实例
	   //baseURL:'http://192.168.1.134',
	  //baseURL:'http://192.168.1.134:81',
	  //baseURL:'http://www.d6.me',
	  //baseURL:'http://120.78.80.31',
	 //baseURL:'http://www.qiuxball.com',
	 baseURL:'http://localhost:8082',
	  //timeout: 1000
});
	
let http = {
	post:"",
	get:""
}
http.post = function(url,data){
	if(data && data.constructor !== FormData){//如果是FormData格式的数据就不再qs为json格式的字符串，否则无法做图片的上传
		data = qs.stringify(data);
	}
	return new Promise((resolve,reject)=>{
		instance.post(url,data).then((res)=>{
			resolve(res);
		}).catch((error)=>{
			reject(error);
		})
	})
}

http.get = function(url,data){//data为一个json对象
	return new Promise((resolve,reject)=>{
		instance.get(url,{params:data}).then((res)=>{
			resolve(res);
		}).catch((error)=>{
			reject(error);
		})
	})
}
export default http;