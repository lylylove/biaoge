
	function $(str,ranger = document){
		// ranger代表的是对象,元素节点,选择范围
		if(typeof str == 'string'){
			// ranger = ranger?ranger:document;
			// ranger = ranger || document;
			let str1 = str.trim();
			let str2 = str1.charAt(0);
			if(str2 == '#'){
				return document.getElementById(str1.slice(1));
			}else if(str2 == '.'){
				return ranger.getElementsByClassName(str1.slice(1));
			}else if(/^[a-zA-Z][A-Za-z1-6]{0,10}$/.test(str1)){
				return ranger.getElementsByTagName(str1);
			}else if(/^<[a-zA-Z][A-Za-z1-6]{0,10}>$/.test(str1)){
				return document.createElement(str1.slice(1,-1));
			}
		}else if(typeof str == 'function'){
			window.addEventListener('load',str);
		}
	}

	let arr1 = $('#box');
	let arr2 = $('.box');
	let arr3 = $('div')
	let arr4 = $('<p>')
	let arr5 = $('span')[0]
	let arr6 = $('.con')
	
	
	// // 在父元素最后面添加子元素
	function append(parent,child){

		return parent.appendChild(child)
	}
	// append(arr2[0],arr4)



	// // 在父元素最前面添加子元素
	function prepend(parent,child){
		let first = parent.firstElementChild;
		if(first){
			return parent.insertBefore(child,first)
		}else{
			return parent.appendChild(child)
		}
	}
	// prepend(arr2[0],arr4)
	


	// // 给父元素添加append方法
	HTMLElement.prototype.append = function(child){

		return this.appendChild(child)
	}
	 // arr2[0].append(arr4)
	 


	// // 子元素 prepend To 父元素后面
    HTMLElement.prototype.prependTo = function(parent){
	  
	   parent.append(this)
    }
	 // arr4.prependTo(arr2[0])



	// // 给父元素添加prepend方法
	HTMLElement.prototype.prepend = function(child){
		let first = this.firstElementChild;
		if(first){
			return this.insertBefore(child,first)
		}else{
			return this.appendChild(child)
		}
	}
	// arr2[0].prepend(arr4)



	// 子元素 insertTo 第一个元素 arr4.insertTo(parent)
	HTMLElement.prototype.insertTo = function(parent){
		let parentfather = parent.parentElement;
		parentfather.insertBefore(this,parent)
	}
	// arr4.insertTo(arr2[0])



	//父元素 insert 子元素 arr2[0].insert(子元素)
	HTMLElement.prototype.insert = function(child){
		let parent = this.parentElement
		return parent.insertBefore(child,this)
	}
	// arr2[0].insert(arr4)



	// 兄弟元素 after,在元素之后添加 
	HTMLElement.prototype.after = function(child){
		// 获取下一个兄弟元素
		let next = this.nextElementSibling;
		if(next){
			// 在兄弟元素之前插入
			next.insert(child)
		}else{
			// 如果没有兄弟元素,否则在这个元素的父元素之后插入
			let parent = this.parentNode;
			parent.append(child)
		}	
	}
	// arr6[0].after(arr4)



	// 添加的元素 afterTo 到 某个元素
	HTMLElement.prototype.afterTo = function(parent){
		let next = parent.nextElementSibling;
		if(next){
			next.insert(this)
		}else{
			let parents = parent.parentNode;
			parents.append(this)
		}
	}
	// arr4.afterTo(arr2[0])



	// 查找某个元素的父元素
	HTMLElement.prototype.parent = function(){
	
		return this.parentNode;
	}
	// console.log(arr2[0].parent())
	


	// 查找某个子元素的所有父元素
	HTMLElement.prototype.parentss = function(){
		let arr = [];
		// 定义this的第一个父元素
		let parents = this.parentNode;
		// 如果父元素是body,返回body
		if(parents.nodeName == 'BODY'){
			return this.parentElement;
			// 或者
			return document.body;
		}
		// 遍历到html之前的父元素
		while(parents.nodeName != 'HTML'){
			// 父元素添加到arr
			arr.push(parents);
			//更新父元素每次等于父元素的父元素 
			parents = parents.parentNode;
			// 如果父元素是html
			if(parents.nodeName == 'HTML'){
				// html添加到arr
				arr.push(parents);
			}
		}
		// 返回arr
		return arr;
	}
  	// console.log(arr6[0].parentss())
	// console.log(document.body.parentss())*/
	


	// 查找某个拥有定位属性的父元素
	HTMLElement.prototype.finds = function(){
		let now = null;
		let parent1 = this.parentss();
		console.log(parent1)
		
		for(let i = 0;i < parent1.length;i++){
			let v = window.getComputedStyle(parent1[i],null).position;
			if(v == 'relative' || v =='absolute'){
				now = parent1[i];
				break;
			}
		}
		if(!now){
				now = document.body;
			}
		return now;
	}
	// console.log(arr2[0].finds())



	// app.next(div) app下面的兄弟元素第一个div,所有的div
	
	HTMLElement.prototype.next = function(){
	
		let nexts = this.nextElementSibling;
		let arr = [];
		while(nexts.nodeType == 1){
			// arr.push(nexts)
			nexts = nexts.nextElementSibling;
			if(nexts.nodeName == 'DIV'){
				arr.push(nexts);
			}
		
		}
		return arr
	}


// 	HTMLElement.prototype.div=function(){
//     let arr=[];
//     let node=this.children;
//     for(i=0;i<node.length;i++){
//         if(node[i].nodeName  ==  'DIV'){
//             arr.push(node[i]);
//         }
//     }
//     return arr;
// }




	// 返回函数的子元素方法
	function childnode(boxs){
		let box1 = boxs.childNodes;
		let Arr = [];
		// for(let i = 0; i< box1.length;i++){
		// 	if(box1[i].nodeType == 1){
		// 		Arr.push(box1[i])
		// 	}
		// }
		
		// box1.forEach(function(ele){
		// 	if(ele.nodeType == 1){
		// 		Arr.push(ele);
		// 	}
		// })
	
		Arr = Array.prototype.filter.call(box1,function(ele){
			return ele.nodeType == 1;
		})
		return Arr;
	}
	