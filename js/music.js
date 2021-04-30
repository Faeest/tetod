const base_URL 	= "./assets/SFX/"
,	SFX 		=
{
			bg_music_1 	: new Audio(base_URL + "background_music_1.mp3")
		,	click_1		: new Audio(base_URL + "click_retro_1.mp3")
		,	click_2		: new Audio(base_URL + "click_retro_2.mp3")
		,	click_3		: new Audio(base_URL + "click_retro_3.mp3")
		,	click_4		: new Audio(base_URL + "click_retro_4.mp3")
		,	rotate_1	: new Audio(base_URL + "rotate_effect_1.mp3")
		,	boom_1		: new Audio(base_URL + "boom_1.mp3")
		,	boom_2		: new Audio(base_URL + "boom_2.mp3")
}
SFX.click_1.volume = .2
SFX.click_2.volume = .5
SFX.click_3.volume = .1
SFX.click_4.volume = .2
SFX.rotate_1.volume = .2
SFX.bg_music_1.volume = .1
function playSFX(key) {
	if(SFX[key] != undefined){
		let copy = SFX[key].cloneNode(true)
		copy.volume = SFX[key].volume
		copy.play()
	}
}
SFX.bg_music_1.addEventListener("ended",() => {
	setTimeout(function () {
		if (isLooping() || !onPause){
		SFX.bg_music_1.play()
		}
	}, random(2000,7000))
});