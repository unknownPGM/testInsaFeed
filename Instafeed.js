
	var placeData = [
	{
		name: 'The Crest Santora Hua-Hin',
		lat: 12.614550,
		lng: 99.954041,
	}];

	var index = $(this).index();
	var lat = placeData[index].lat;
	var lng = placeData[index].lng;
	getIgPhoto(lat, lng);

function getIgPhoto(lat, lng) {
document.write(lat);
	// เตรียมตัวแปลและ select element ที่ต้องใช้รอไว้
	var locationURLList = [],
		imageObjList = [],
		imageList = [],
		infoBox = $('#ig-info'),
		imgDiv = $('.ig-div');
 
	// เอารูปเดิมออก และบอก user ว่ากำลังโหลดรูปนะ
	imgDiv.remove();
	infoBox.show().removeClass('bg-danger').addClass('bg-info').text("Loading...");
 
	// Make AJAX call
	       // เพื่อจะได้ array ของ location-id
	$.ajax({
		type: 'GET',
		dataType: 'jsonp',
		cache: true,
		url: 'https://api.instagram.com/v1/locations/search?lat=' 
      + lat + '&lng=' + lng + '&distance=100&access_token=178469114.7a4821e.e644fdfb85cf4d8d9c71150764bab0fa'
	}).done(function(data) {
		// ขั้นตอนต่อไป

	}).done(function(data) {
 
		// เมื่อทุกอย่างเสร็จสิ้น loop ผ่านแต่ละ item ใน array เพื่อสร้างเป็น url 
  // ที่เราต้อง call ในครั้งที่สอง
		for (var i = 0; i < data.data.length; i++) {
		// เตรียม url จาก location_id
			var targetURL = 'https://api.instagram.com/v1/locations/' 
       + data.data[i].id + '/media/recent?access_token=178469114.7a4821e.e644fdfb85cf4d8d9c71150764bab0fa';
			locationURLList.push(targetURL);
		}
 
		// เนื่องจากบางทีรอบๆ พิกัดหนึ่งๆ มีหลาย location มาก จึงเอามาแค่ 10 อัน 
  // แต่ถ้าใครต้องการทั้งหมดสามารถตัดบรรทัดนี้ทิ้งได้ครับ
		locationURLList = locationURLList.slice(0, 10);
 
	}).done(function(){
 
		// ขั้นตอนต่อไป
	

	}).done(function(){
 
		// เรียก AKAX ครั้งที่สอง ด้วยแต่ละ url ใน array
		$.when.apply($, locationURLList.map(function(url) {
 
			return $.ajax({
				type: "GET",
				dataType: "jsonp",
				cache: true,
				url: url
			});
 
		})).done(function(){
 
			 // ซ่อนแถบที่เอาไว้บอกว่า loading...
			 infoBox.hide();
			 // loop ผ่าน object ที่ response กลับมาแล้วเอา image object นั้นไป concat 
    // เข้าไปใน imageObjList ซึ่งเป็น array ของ image object
			 for (var i = 0; i < arguments.length; i++) {
				  imageObjList = imageObjList.concat(arguments[i][0].data);
			 }
 
			 // ถ้าอยากได้รูปแค่ 10 รูป uncomment บรรทัดนี้
			 // imageObjList = imageObjList.slice(0, 10);
 
    // เตรียม image div สำหรับใส่รูป 
    var imageContainer = $('<div>');
 
			 // นำแต่ละ image object มาหาค่าที่เราต้องการ
			 for (var j = 0; j < imageObjList.length; j++) {
 
    // หาเวลาที่ user สร้างภาพขึ้นมา 
			 var time = new Date(parseInt(imageObjList[j].created_time) * 1000);
			 var fullDate = time.getDate() + '-' + time.getMonth() + '-' 
        + time.getFullYear();
 
    // append เข้าไปใน element ที่เราต้องการ
    imageContainer.append('<div class="ig-div"><a href="' 
      + imageObjList[j].link + '"><img src="' 
      + imageObjList[j].images.low_resolution.url + '" /></a>' 
      + fullDate  +'</div>');
    }
 
    $('#image-area').html(imageContainer);
 
    // ไม่ต้องแสดง error message แล้ว
    clearTimeout(instagramRequestTimeout);
 
    });
});
 
	 // ถ้ามีปัญหาอะไรใน AJAX call ให้แสดง error message
	 var instagramRequestTimeout = setTimeout(function() {
		  infoBox.removeClass('bg-info').addClass('bg-danger').text("Fail to get instagram resources");
	}, 8000);
}
