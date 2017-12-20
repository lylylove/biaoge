/*
属性: 1.创建字母
	  2.字母个数
方法: 1.开始函数
	  2.遍历个数
	  3.一个函数的创建方法
	  4.下落方法
 */
console.log()
class Code{
		// 创建一个类
		// 设置属性
		constructor(){
			this.code = [
							['A','img/A.png'],['B','img/B.png'],
							['C','img/C.png'],['D','img/D.png'],['E','img/E.png'],
							['F','img/F.png'],['G','img/G.png'],['H','img/H.png'],
							['I','img/I.png'],['J','img/J.png'],['K','img/K.png'],
							['L','img/L.png'],['M','img/M.png'],['N','img/N.png'],
							['O','img/O.png'],['P','img/P.png'],['Q','img/Q.png'],
							['R','img/R.png'],['S','img/S.png'],['T','img/T.png'],
							['U','img/U.png'],['V','img/V.png'],['W','img/W.png'],
							['X','img/X.png'],['Y','img/Y.png'],['Z','img/Z.png'],
							
						];
			this.length = 5;
			// 定义一个空数组,方便遍历
			this.arr = [];
			this.positions = [];
			this.speed = 5;
			this.fenshu = document.querySelector('.box1>span:first-child')
			this.kaishi = $('button')[0];
			this.zanting = $('button')[1];

			this.tim = 0;
			this.gq = 5;
			this.life = document.querySelector('.box2>span:first-child')
			this.shengming = 10;
		}
	

		// 开始函数,调用方法
		start(){
			this.getcode(this.length)
			this.drop()
			this.shifts()
		}


		// 接受length参数;遍历length并调用创建一个的方法,相当于创建length个;
		getcode(length){
			for(let i = 0; i <= length;i++){
				this.one()
			}
		}



		// 禁止重复方法,返回数组里页面内容包含创建的code内容,在69行进行循环调用,如果相等了,就
		// 再次获取item
		repeat(cod){
			return this.arr.some(ele =>ele.innerText == cod)
		}

		repeatpositions(lefts){
			
			return this.positions.some(ele =>Math.abs(ele - lefts) <= 50)
			console.log(lefts)
		}
		// 创建一个元素的方法
		// 1.设置元素随机的下标item;
		// 2.给创建的元素添加类名;
		// 3.设置它的初始top值为随机的0-100;
		// 4.left值为页面中左右各200之间
		// 5.设置颜色为随机的rgba函数

		one(){
			let divs = $('<div>');
			let item = Math.floor(Math.random()*this.code.length);
			divs.className = 'boxs';
			do{
				item = Math.floor(Math.random()*this.code.length);

			}while(this.repeat(this.code[item][0]))

			divs.innerText = this.code[item][0];
			console.log(this.code[item][1])
			document.body.append(divs);
			this.arr.push(divs)
			
			divs.style.top = Math.floor(Math.random()*100) + 'px';

			let left1 = Math.floor(Math.random()*(window.innerWidth -400) + 200);

			do{
				left1 = Math.floor(Math.random()*(window.innerWidth -400) + 200);

			}while(this.repeatpositions(left1))

			divs.style.left =left1 + 'px';
			console.log(left1);
			this.positions.push(left1)
			divs.style.background =`url('${this.code[item][1]}') center/cover`;

			// console.log(this.positions)
			// function rgb(){
			// 	let r = Math.floor(Math.random()*255);
			// 	let g = Math.floor(Math.random()*255);
			// 	let b = Math.floor(Math.random()*255);
			// 	let a = Math.random()*0.3+0.4;
			// 	return `rgba(${r},${g},${b},${a})`

			// }
			// divs.style.background = rgb();

		}



		// 下落方法
		// 1.让数组元素里每个div的高度等于自身高度+速度;
		// 2.如果高度大于500的时候从页面删除该元素,并在数组里清除该元素;
		// 然后调用创建一个div的方法,相当于每删除一个div就创建一个
		// 3.判断生命值如果小于0;判断是否重新开始
		drop(){
			let that = this;
			that.t = setInterval(move,100)
			function move(){
				for(let i = 0;i < that.arr.length;i++){
					let tops1 = that.arr[i].offsetTop + that.speed;
					that.arr[i].style.top = tops1 + 'px';
					if(tops1 >= 500 ){
						document.body.removeChild(that.arr[i])
						that.arr.splice(i,1)
						that.positions.splice(i,1)
						that.one()
						that.shengming--;
						that.life.innerText = that.shengming;
						if(that.shengming <= 0){
							let flag = confirm('是否重新开始');
							if(flag){
								that.restart()
							}else{
								close()
							}
						}
					}
				// console.log(that.speed)
				}
			}
			let flags = true;
			that.zanting.onclick = function(){
				if(flags == true){
					console.log(1)
					clearInterval(that.t)
					flags = false;
				}
			}	
			that.kaishi.onclick = function(){
				if(flags == false){
				that.t = setInterval(move,100)
				flags = true;
				}
			}
				
		}



		// 删除元素方法
		// 1.在document调用键盘按下onkeydown事件
		// 		遍历数组元素div,按下的事件对象e.key转换大写或者e.keycode转换为String.fromCharCode(e.keyCode)
		// 		然后和数组元素进行比较,如果一样,清除这个元素,并在数组中删除这个元素,然后调用创建一个div的方法
		// 2.累计分数,达到一定数目进入下一关
		// 		获取页面中的fenshu,然后创建一个属性tim;tim++;让页面中的span的innerText等于tim的值;
		// 		设置关卡属性,初始化达到5个晋级,
		// 		判断如果属性tim++ 大于等于关卡;弹出晋级框,调用进入下一关next方法
		// 		
		shifts(){
			let that = this;
			document.onkeydown = function(e){
				// let keys = e.key.toUpperCase();
				let keys = String.fromCharCode(e.keyCode)
				for(let i = 0; i < that.arr.length;i++){
					if(that.arr[i].innerText == keys ){
						document.body.removeChild(that.arr[i])
						that.arr.splice(i,1)
						that.positions.splice(i,1)
						that.one()

						that.fenshu.innerText = ++that.tim;
						if(that.tim >= that.gq){
							alert('恭喜你,进入下一关');
							that.next()
						}
						
					}
				}

			}
		}

		// 重置
		restart(){
			this.arr.forEach(ele =>{
				document.body.removeChild(ele);
			})
			this.arr = [];
			this.splice = [];
			clearInterval(this.t)
			this.length = 5;
			this.speed = 5;
			this.gq = 5;
			this.tim = 0;
			this.shengming = 10;
			this.life.innerText = this.shengming;
			this.fenshu.innerText = this.tim;
			console.log(this.tim)
			this.getcode(this.length)
			this.drop()

		}


		// 下一关
		// 1.停掉时间函数,然后遍历数组,清除页面所有div,然后清除数组,
		// 2.设置下一关需要改变的属性值
		// 3.调用getcode函数,传入的参数为新改变的length属性
		// 4.调用drop下落函数
		next(){
			
			this.arr.forEach(ele =>{
				document.body.removeChild(ele);
			})
			this.arr = [];
			this.positions = [];
			clearInterval(this.t)
			this.length++;
			this.speed++;
			this.shengming = 10;
			this.life.innerText = this.shengming;
			this.tim = 0;

			this.gq += 10;
			this.getcode(this.length)
			this.drop()
		}


	

}




// let arrs = [2,3,5,6]
// console.log(arrs.copyWithin(2,4))


