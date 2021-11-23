<template>
	<div>
	 <keep-alive><router-view></router-view></keep-alive>
      <!--<router-view></router-view>-->
   </div>
</template>

<script>
  export default{
  	name: "all",
    data(){
      return{
      	  
      }
    },
    created(){
    	 window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext; 
    	 try { 
    	 	var context = new window.AudioContext();
    	 	var source = null; 
    	 	var audioBuffer = null;
    	 	function stopSound() { 
    	 		if (source) { source.stop(0); } //立即停止 
    	 	}
    	 	function playSound() { 
    	 		source = context.createBufferSource(); 
    	 		source.buffer = audioBuffer;
    	 		source.loop = true; 
    	 		source.connect(context.destination); 
    	 		source.start(0);
    	 		 } //立即播放
    	 	function initSound(arrayBuffer) { 
    	 		context.decodeAudioData(arrayBuffer, function (buffer) { //解码成功时的回调函数
    	 		     audioBuffer = buffer; 
    	 		     playSound(); 
    	 			},
    	 			function (e) { //解码出错时的回调函数 
    	 				console.log('Error decoding file', e); }); 
    	 		}
    	 	function loadAudioFile(url) { 
    	 		var xhr = new XMLHttpRequest(); //通过XHR下载音频文件
    	 				xhr.open('GET', url, true); 
    	 				xhr.responseType = 'arraybuffer';
    	 				xhr.onload = function (e) { //下载完成
    	 					initSound(this.response); 
    	 				};
    	 				xhr.send(); 
    	 			}
    	 	loadAudioFile('../Content/public/mp3/music2.mp3'); 
    	 	$("#stop").click(function () { stopSound(); }); } 
    	 catch (e) { console.log('!Your browser does not support AudioContext'); }
 
    },
  }
</script>

<style scoped>
	
</style>