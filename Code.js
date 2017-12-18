
/*属性
	字母表、几个字符、生命、关卡、速度
	方法
	开始、产生、下落、消失、进入下一关、重新开始
	*/
class Code{
	constructor(){
		this.char = ['Q','W','E','R','T','Y','U','I','O','P'];
		this.length = 5;
		this.current = [];
		this.speed = 10;
	}
	start(){
		this.getChars(this.length);
		this.drop();
	}
	getChars(length){
		for(let i=0; i<length; i++){
			this.getChar();
		}
	}
	getChar(){
		let num = Math.floor(Math.random()*this.char.length);
		let divs = document.createElement('div');
		let tops = Math.floor(Math.random()*100);
		let lefts = Math.floor((window.innerWidth - 400)*Math.random() + 200);
		divs.style.cssText=`
		width:100px;
		height:100px;
		background:orange;
		border-radius:20%;
		text-align:center;
		line-height:100px;
		font-size:30px;
		position:absolute;
		top:${tops}px;
		left:${lefts}px;
		`
		divs.innerText = this.char[num];
		document.body.appendChild(divs);
		this.current.push(divs);
	}
	drop(){
		let that = this;
		setInterval(function(){
			for(let i =0; i < that.length; i++){
				let tops = that.current[i].offsetTop + that.speed;
				that.current[i].style.top = tops + 'px';
				if(tops >= 500){
					document.body.removeChild(that.current[i]);
					that.current.splice(i,1);
					that.getChar();
				}
				
			}
		},100)
	}
}