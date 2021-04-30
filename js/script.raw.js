let panjang
,	tinggi
,	ratioBoard
,	tile
,	freedom
,	controlled	=
	{
		rawCord : [],
		cord 	: [],
		type 	: 0,
		rotate 	: 1,
		shape 	: 0
	}
,	score 		= 0
,	downTiming 	= 200 - score/2
,	nextShape
,	onPause		= false
,	downRecursive
/*
fungsi setup dijalan kan oleh p5.js sebelum menjalankan fungsi draw() yang ada dibawah
*/
function setup(){
	//ganti disini !
	panjang 	= 	12; //		<-- 25 > panjang > 4
	tinggi 		= 	24; //		<-- 50 > tinggi > 8
	ratioBoard 	=   15 * 1.5;

	//jangan diganti !
	tile = Array(panjang * tinggi).fill(0)
	freedom = Array(panjang * tinggi).fill(0)
	if(panjang > 25){panjang=25}
	if(panjang < 4){panjang=4}
	if(tinggi > 50){tinggi=50}
	if(tinggi < 8){tinggi=8}
	createCanvas(panjang * ratioBoard,tinggi * ratioBoard)
}
/*
salah satu fungsi penting p5.js dimana akan di ulang ulang terus.
*/
function draw(){
	tile.fill(0)
	for(let i = 0;i< controlled.cord.length;i++){
		tile[controlled.cord[i]] = controlled.type
	}
	background(250)
	getGrid()
	// angka()
	render()
}
/*
fungsi dibawah berguna untuk membuat grid yang ada didalam canvas dengan mengikuti nilai variabel panjang dan lebar.
*/
function getGrid(){
	push()
	stroke(120)
	strokeWeight(.5)
	for(let i = 0; i < panjang; i++){
		line(i * ratioBoard, 0 , i * ratioBoard , tinggi * ratioBoard)
	}
	for(let j = 0; j < tinggi; j++){
		line(0, j * ratioBoard,panjang * ratioBoard, j * ratioBoard)
	}
	pop()
}
/*
fungsi ini untuk merender / menggambar bentuk kotak-kotak tetris didalam canvas
*/
function render(){
	for(let i = 0 ; i < tile.length;i++){
		let xPos = i % panjang
		, yPos = floor(i/panjang)
		let isTile = tile[i]!=0
		if(tile[i]!=0 || freedom[i]!=0){
			push()
			fill(getColor(isTile?tile[i]:freedom[i]))
			strokeWeight(0)
			rect(xPos*ratioBoard,yPos*ratioBoard,ratioBoard,ratioBoard,0)
			pop()
		}
	}
}
function getColor(num){
	let res = '#fff'
	switch(num){
		case 1 :
			res = "#00b4d8";break;//	<-- cyan
		case 2 :
			res = "#0466c8";break;//	<-- blue
		case 3 :
			res = "#e76f51";break;//	<-- orange
		case 4 :
			res = "#e9c46a";break;//	<-- yellow
		case 5 :
			res = "#2bc016";break;//	<-- lime
		case 6 :
			res = "#9d4edd";break;//	<-- purple
		case 7 :
			res = "#e63946";break;//	<-- red
	}
	return res
}
/*
fungsi untuk mengisi nilai variabel controlled
*/
function fillControl(index = 0,rawCord = [],type = 0){
	controlled.cord.push(index)
	controlled.rawCord.push(rawCord)
	controlled.type = type
}
/*
kordinat kartesius biasa seperti (0,1) di ubah menjadi kordinat index pada variabel tile
*/
function fillIt(index = 0,origin = [0,0]){
	controlled.cord = []
	controlled.rotate = 1
	controlled.rawCord = []
	controlled.shape = index
	let theShape = shape[index]
	for(let i = 0; i < theShape.cord.length;i++){
		let theCord = theShape.cord
		,theOrigin = origin[0] + origin[1] * panjang
		fillControl(theOrigin + theCord[i][0] + theCord[i][1]*panjang , theCord[i] , theShape.type)
	}
}
function rotateControl(){
	if(controlled.type == 4){return ''}
	controlled.rotate += controlled.rotate == 4? -3 : 1
	let raw = controlled.rawCord
	, hasilCheck = checkLength(shape[controlled.shape])
	, mojok = checkMojok(true)
	, lepas = false
	, kon1	= false
	console.log(mojok)
	for(let i=0;i<controlled.cord.length;i++){kon1 = !kon1?controlled.cord[i]+panjang > tile.length-1:true}
	for(let i =0; i < controlled.cord.length;i++){
		if( mojok[0] && mojok[1] ||
		 	(mojok[0] || mojok[3]) && floor((controlled.cord[i] + hasilCheck[0]+(!mojok[3]?1:0)) / panjang) != floor(controlled.cord[i]/panjang) || 
		 	(mojok[1] || mojok[4]) && floor((controlled.cord[i] - hasilCheck[2]+(!mojok[4]?1:0)) / panjang) != floor(controlled.cord[i]/panjang)){lepas = true;return ''}
		let minus = 0
		, 	plus  = 0
		, 	xPos  = raw[i][0]
		,	yPos  = raw[i][1]
		if(mojok[0]){minus-=hasilCheck[2]<=hasilCheck[3]?(mojok[3]?1:0):hasilCheck[2]}
		if(mojok[0] && mojok[3]){minus+=hasilCheck[2]-1}
		if(mojok[1]){minus+=hasilCheck[0]<=hasilCheck[1]?(mojok[4]?1:0):hasilCheck[0]}
		if(mojok[1] && mojok[4]){minus-=hasilCheck[0]-1}
		if(mojok[2]){minus+=(hasilCheck[1]==0?0:hasilCheck[1]-(kon1?0:1))*panjang}
		if(mojok[2] && mojok[5]){minus+=(hasilCheck[1] > 1?hasilCheck[1]-1:1)*panjang}
		if(controlled.rotate == 2){
			minus += xPos + yPos * panjang
			plus += -yPos + xPos  * panjang
		} else if(controlled.rotate == 3){
			minus += -yPos + xPos * panjang
			plus += -xPos + -yPos * panjang
		} else if(controlled.rotate == 4){
			minus += -xPos + -yPos * panjang
			plus += yPos + -xPos * panjang
		} else if(controlled.rotate == 1){
			minus += yPos + -xPos * panjang
			plus += xPos + yPos * panjang
		}
		controlled.cord[i] -= minus
		controlled.cord[i] += plus
	}
	if(lepas){controlled.rotate -= controlled.rotate == 0? -3 : 1; return ''}
}
function goX(type = 0){
	let mojok = checkMojok()
	if((!mojok[0] || type > 0) && (!mojok[1] || type < 0)){
		for(let i = 0;i<controlled.cord.length;i++){
			controlled.cord[i] += type
		}
	}
}
/*
event keyboard yang disediakan p5.js
*/
function keyPressed(){
	if(keyCode == 27){
		if(onPause){
			loop()
			getDown()
		} else {
			noLoop()
		}
		onPause = !onPause
	}
	if(onPause){return ''}
	if(keyCode == 87 || keyCode == 38){	//w ^
		rotateControl()
	}
	if(keyCode == 65 || keyCode == 37){	//a <=
		goX(-1)
	}
	if(keyCode == 68 || keyCode == 39){	//d =>
		goX(1)
	}
}
function getDown(){
	let onGround = false
	for(let j =0;j<controlled.cord.length;j++){
		if(controlled.cord[j] > tile.length-1-panjang){
			onGround = true
		}
		for(let k =0;k< freedom.length;k++){
			if(freedom[k] != 0){
				if(controlled.cord[j]+panjang == k){
					onGround = true
				}
			}
		}
	}
	if(onGround == true){
		controlled.cord.forEach((item) => {
			  freedom[item] = controlled.type
		})
		fillIt(nextShape,[round(panjang/2),round(tinggi/6)])
		nextShape = floor(random(0,shape.length))
	}
	for(let i=0;i<controlled.cord.length;i++){
		controlled.cord[i] += panjang
	}
	downRecursive = setTimeout(function () {
		return !onPause?getDown():''
	}, downTiming < 100? 100:downTiming)
}
/*
----------------------------------------------------------------=
																=
fungsi untuk membantu pekerjaan									=
																=
----------------------------------------------------------------=
*/
function checkMojok(onRotate = false){
	let mojokKanan 	= false, mojokKiri 	= false, mojokBawah	= false, mojokBlock1  = false, mojokBlock2	= false, mojokBlock = false
	, 	conKiri 	= false, conKanan 	= false, conBawah 	= false
	,	hasilCheck  = checkLength(shape[controlled.shape],(controlled.rotate % 4) + 1)
	,	hasilCheck2 = checkLength(shape[controlled.shape])
	for(let i = 0; i < controlled.cord.length;i++){
		let controlC = controlled.cord[i]
		,	onCenter = controlled.rawCord[i][0] == 0 && controlled.rawCord[i][1] == 0
		,	kondisi  = controlC % panjang
		,	kondisi2 = -(kondisi - (panjang - 1))
		conKiri	 = !conKiri? hasilCheck2[2] > kondisi && kondisi > 0 && onCenter : true
		conKanan = !conKanan? hasilCheck2[0] > kondisi2 && kondisi < panjang-1 && onCenter : true

		if(kondisi == 0 || conKiri){mojokKiri = true}
		if(kondisi == panjang-1 || conKanan){mojokKanan = true}
		if(controlC > tile.length-1-panjang){mojokBawah=true}
		for(let j=0;j<freedom.length;j++){
			if(freedom[j]!=0){
				let kondisi3 = (floor(j/panjang) - floor(controlC/panjang)) - 1
				conBawah = !conBawah? hasilCheck2[1] > kondisi3 && controlC <= j && onCenter : true
				if(controlC - hasilCheck[2]+1 == j || controlC - 1 == j){mojokKiri = true;mojokBlock = true}
				if(controlC + hasilCheck[0]+1 == j || controlC + 1 == j){mojokKanan = true;mojokBlock = true}
				if(controlC + hasilCheck[1]*panjang == j || controlC + panjang == j || conBawah){mojokBawah = true; mojokBlock = true}
				if(onRotate){
					if(controlC + hasilCheck2[0] == j){mojokKanan = true;mojokBlock = true}
					if(controlC - hasilCheck2[2] == j){mojokKiri = true;mojokBlock = true}
				}
			}
		}
	}
	// console.log(hasilCheck2)
	if(mojokKiri && mojokKanan && !mojokBlock){
		let kurangan = checkLength(shape[controlled.shape]).reduce((a,c)=>a+c)
		kurangan = random(0,2)>1?kurangan:-kurangan
		for(let i = 0; i< controlled.cord.length;i++){
			controlled.cord[i]-= kurangan
		}
		return [false,false,mojokBawah]
	}
	if(conKiri||conKanan || conBawah || onRotate){return [mojokKiri,mojokKanan,mojokBawah,conKiri,conKanan,conBawah]}
	return [mojokKiri,mojokKanan,mojokBawah]
}
function checkLength(shape, simulateRotate = 0){
	let cord = shape.cord
	, rotate = simulateRotate != 0? simulateRotate : controlled.rotate
	, shapeLength = [0,0,0,0] // > v < ^
	for(let i =0;i<cord.length;i++){
		if(cord[i][0] > shapeLength[(0 + (rotate-1))%shapeLength.length]){shapeLength[(0 + (rotate-1))%shapeLength.length] = cord[i][0]}
		if(cord[i][0] < shapeLength[(2 + (rotate-1))%shapeLength.length]){shapeLength[(2 + (rotate-1))%shapeLength.length] = cord[i][0]}
		if(cord[i][1] > shapeLength[(1 + (rotate-1))%shapeLength.length]){shapeLength[(1 + (rotate-1))%shapeLength.length] = cord[i][1]}
		if(cord[i][1] < shapeLength[(3 + (rotate-1))%shapeLength.length]){shapeLength[(3 + (rotate-1))%shapeLength.length] = cord[i][1]}
	}
	shapeLength.forEach((item,index) => {
	  item < 0? shapeLength[index]*=-1:item
	})
	return shapeLength
}
function start(){
	nextShape = floor(random(0,shape.length))
	fillIt(floor(random(0,shape.length)),[round(panjang/2),round(tinggi/6)])
	getDown()
}
function angka(){
	textSize(ratioBoard*0.5)
	for(let i=0;i<tile.length;i++){
		text(i.toString(),(i%panjang)*ratioBoard,floor(i/panjang)*ratioBoard+ratioBoard*0.75)
	}
}