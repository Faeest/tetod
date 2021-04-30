function getButton(){
	descE[0] += descE[1]? 1 : -1
	if(descE[0] > 360){descE[1] = false}
	if(descE[0] < 2){descE[1] = true}
	const	origin 			= [0,180]
	,		heightButton 	= 65
	,		widthButton	 	= (panjang / maxInline * ratioBoard)
	,		marginButton 	= 10
	,		textS 		 	= 18
	push()
	textSize(40)
	textAlign(CENTER,CENTER)
	strokeWeight(15)
	fill(255)
	stroke(getColor(background_awal))
	textFont("impact")
	text("L E V E L",panjang*ratioBoard*0.5,100)
	textSize(12)
	fill(0)
	strokeWeight(0)
	text("𝙋𝙧𝙚𝙨𝙨  𝙀𝙉𝙏𝙀𝙍  𝙩𝙤 𝙨𝙩𝙖𝙧𝙩",panjang*ratioBoard*0.5,100+textS*3)
	pop()
	for(let i =0; i <= maxLevel; i++){
		let position = [((i % maxInline) * panjang / maxInline * ratioBoard)+origin[0]+(marginButton*0.5),(floor(i/maxInline)*heightButton)+origin[1]]
		push()
		let warna = "whitesmoke"
		strokeWeight(buttonKey==i?1:0.2)
		fill(buttonKey==i?warna:250)
		strokeJoin(ROUND)
		stroke(buttonKey==i? getColor(background_awal) : 0)
		rect(position[0],position[1],widthButton-marginButton,heightButton - marginButton)
		pop()
		push()
		textAlign(CENTER,CENTER)
		textSize(textS)
		textFont('monospace')
		text(`Level ${i}`,position[0] - textS/8 + widthButton*0.5,position[1] - textS/8 + heightButton*0.5)
		pop()
	}
}
function buttonKeyControl(way){
	if(way=='up' && buttonKey > maxInline - 1){
		buttonKey = (buttonKey + (maxLevel + 1 - (1 * maxInline))) % (maxLevel + 1)
	} else if(way=='down' && buttonKey < maxLevel + 1 - maxInline){
		buttonKey = (buttonKey + (maxLevel + 1 + (1 * maxInline))) % (maxLevel + 1)
	} else if(way=='right' && (buttonKey == 0 || (buttonKey + 1) % maxInline != 0) && buttonKey + 1 < maxLevel + 1){
		buttonKey +=1
	} else if(way=='left' && buttonKey % maxInline > 0){
		buttonKey -=1
	} else if(way=='enter'){
		playSFX('click_2')
		setTimeout(function () {
			level = buttonKey
			downTiming 	=	1000 * (8 * (maxLevel-level+1) / 100)
			start()
		}, 200)
	} else{return ''}
	if(way != "enter"){
		playSFX('click_1')
	}
}