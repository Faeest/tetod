# Tetod (tetris kw)
Lagi challange diri sendiri untuk develop game tanpa bantuan google kecuali untuk domentasi dan yang jelas running game nya. Akhir nya milih tetris untuk dibuat karena sepertinya seru. daann, ternyata susah banget :thumbsup:.

Dibuat se ramah mungkin untuk yang ingin meng ulik - ulik code nya maupun untuk yang mau mempelajarinya. Waktu pengerjaan nya 1 bulan sudah termasuk dengan hosting, optimalisasi, bug finding, dan membuat repo.

## Tools
- HTML
- CSS
- Vanilla Javascript
- [P5.js](https://p5js.org/)
- [Numeral.js](http://numeraljs.com/)

## Description
- **Requirement**
  - layar 400 x 560 pixel
  - keyboard input
- **Feature**
  - ratio layar dapat di ubah sesuka hati client hanya dengan mengganti value variabel yang telah disiapkan
  ```
  > script.js
  function setup(){
	panjang     = 12;             // Ganti disini
	tinggi      = 24;             // panjang dan tinggi nya
	ratioBoard  = 15 * 1.5;
	tile        = Array(panjang * tinggi).fill(0);
	freedom     = Array(panjang * tinggi).fill(0);
	createCanvas(panjang * ratioBoard + optionWidth,tinggi * ratioBoard)
    ...
  ```
  - client dapat menambahkan bentuk, warna, dan icon pada game
    - bentuk
      ```
      > shape.js
      getShape([ [0,0] , [-1,0] , [1,0] , [2,0] ] , 1 )
                   ^                                ^
                kordinat                       code warna
      ```
    - warna
      ```
      > script.js
      const colorKind = 7 // samakan nilai dengan banyak nya case yang ada di dalam switch agar tidak muncul error
      function getColor(type){
        let res = '#000'
        switch(type){
          case 1 : res = "#00b4d8"; break;//	<-- cyan
          case 2 : res = "#0466c8"; break;//	<-- blue
          case 3 : res = "#e76f51"; break;//	<-- orange
          case 4 : res = "#e9c46a"; break;//	<-- yellow
          case 5 : res = "#2bc016"; break;//	<-- lime
          case 6 : res = "#9d4edd"; break;//	<-- purple
          case 7 : res = "#e63946"; break;//	<-- red
          // bisa ditambahkan disini
        }
        return res
      }
      ```
      
    - icon

	icon akan berganti sesuai dengan kondisi yang telah ditentukan. jika ingin **mengubah** icon bisa masuk ke dalam directory dibawah ini dan bisa di custom sesuka hati.
		```
		/assets/icon/
		```
	Dan jika ingin **menambah** icon, maka pengguna wajib menambahkan bentuk terlebih dahulu. beri nama sesuai dengan code warna bentuk yang telah dibuat. Jika code warna sama.

## Contact
kalau ada keluhan / bug mohon untuk meng kontak saya.
- [**Instagram**](https://www.instagram.com/faeest/)
- [**Whatsapp**](https://wa.link/4b649e)
- [**Github**](https://github.com/SiMamank115?tab=repositories)





