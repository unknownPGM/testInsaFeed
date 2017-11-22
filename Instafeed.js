
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
	// ������������� select element ����ͧ�������
	var locationURLList = [],
		imageObjList = [],
		imageList = [],
		infoBox = $('#ig-info'),
		imgDiv = $('.ig-div');
 
	// ����ٻ����͡ ��к͡ user ��ҡ��ѧ��Ŵ�ٻ��
	imgDiv.remove();
	infoBox.show().removeClass('bg-danger').addClass('bg-info').text("Loading...");
 
	// Make AJAX call
	       // ���ͨ��� array �ͧ location-id
	$.ajax({
		type: 'GET',
		dataType: 'jsonp',
		cache: true,
		url: 'https://api.instagram.com/v1/locations/search?lat=' 
      + lat + '&lng=' + lng + '&distance=100&access_token=178469114.7a4821e.e644fdfb85cf4d8d9c71150764bab0fa'
	}).done(function(data) {
		// ��鹵͹����

	}).done(function(data) {
 
		// ����ͷء���ҧ������� loop ��ҹ���� item � array �������ҧ�� url 
  // �����ҵ�ͧ call 㹤��駷���ͧ
		for (var i = 0; i < data.data.length; i++) {
		// ����� url �ҡ location_id
			var targetURL = 'https://api.instagram.com/v1/locations/' 
       + data.data[i].id + '/media/recent?access_token=178469114.7a4821e.e644fdfb85cf4d8d9c71150764bab0fa';
			locationURLList.push(targetURL);
		}
 
		// ���ͧ�ҡ�ҧ���ͺ� �ԡѴ˹��� ������ location �ҡ �֧������� 10 �ѹ 
  // �����õ�ͧ��÷���������ö�Ѵ��÷Ѵ��������Ѻ
		locationURLList = locationURLList.slice(0, 10);
 
	}).done(function(){
 
		// ��鹵͹����
	

	}).done(function(){
 
		// ���¡ AKAX ���駷���ͧ �������� url � array
		$.when.apply($, locationURLList.map(function(url) {
 
			return $.ajax({
				type: "GET",
				dataType: "jsonp",
				cache: true,
				url: url
			});
 
		})).done(function(){
 
			 // ��͹ᶺ���������͡��� loading...
			 infoBox.hide();
			 // loop ��ҹ object ��� response ��Ѻ��������� image object ���� concat 
    // ����� imageObjList ����� array �ͧ image object
			 for (var i = 0; i < arguments.length; i++) {
				  imageObjList = imageObjList.concat(arguments[i][0].data);
			 }
 
			 // �����ҡ���ٻ�� 10 �ٻ uncomment ��÷Ѵ���
			 // imageObjList = imageObjList.slice(0, 10);
 
    // ����� image div ����Ѻ����ٻ 
    var imageContainer = $('<div>');
 
			 // ������ image object ���Ҥ�ҷ����ҵ�ͧ���
			 for (var j = 0; j < imageObjList.length; j++) {
 
    // �����ҷ�� user ���ҧ�Ҿ����� 
			 var time = new Date(parseInt(imageObjList[j].created_time) * 1000);
			 var fullDate = time.getDate() + '-' + time.getMonth() + '-' 
        + time.getFullYear();
 
    // append ����� element �����ҵ�ͧ���
    imageContainer.append('<div class="ig-div"><a href="' 
      + imageObjList[j].link + '"><img src="' 
      + imageObjList[j].images.low_resolution.url + '" /></a>' 
      + fullDate  +'</div>');
    }
 
    $('#image-area').html(imageContainer);
 
    // ����ͧ�ʴ� error message ����
    clearTimeout(instagramRequestTimeout);
 
    });
});
 
	 // ����ջѭ������� AJAX call ����ʴ� error message
	 var instagramRequestTimeout = setTimeout(function() {
		  infoBox.removeClass('bg-info').addClass('bg-danger').text("Fail to get instagram resources");
	}, 8000);
}
