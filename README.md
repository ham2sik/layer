# layer


```javascript
// jsPromise 함수
lazy.jsPromise = function(url, callback) {
	return new Promise(function(resolve, reject) {
		lazy.js(url, function() {
			callback();
			resolve(url+" loaded");
		});
	});
};

// 사용예
var start = Date.now();
$('.jsPromise-result').append('<p>Promise 시작('+formatDate(start)+')</p><br>');
Promise.all([
	mon.lazy.jsPromise("https://m.jobkorea.co.kr/include/JS/naverLogin_implicit-1.0.2.js", function() {
		var end = Date.now();
		var elapsed = (end - start) / 1000;
		$('.jsPromise-result').append('<p>https://m.jobkorea.co.kr/include/JS/naverLogin_implicit-1.0.2.js loaded<br>: Promise 시작으로 부터 '+elapsed+'초 경과되었습니다.('+formatDate(end)+')</p><br>');
	}),
	mon.lazy.jsPromise("https://developers.kakao.com/sdk/js/kakao.min.js", function() {
		var end = Date.now();
		var elapsed = (end - start) / 1000;
		$('.jsPromise-result').append('<p>https://developers.kakao.com/sdk/js/kakao.min.js loaded<br>: Promise 시작으로 부터 '+elapsed+'초 경과되었습니다.('+formatDate(end)+')</p><br>');
	}),
	mon.lazy.jsPromise("https://connect.facebook.net/ko_KR/all.js", function() {
		var end = Date.now();
		var elapsed = (end - start) / 1000;
		$('.jsPromise-result').append('<p>https://connect.facebook.net/ko_KR/all.js loaded<br>: Promise 시작으로 부터 '+elapsed+'초 경과되었습니다.('+formatDate(end)+')</p><br>');
	})
]).then(function (values) {
	var end = Date.now();
	var elapsed = (end - start) / 1000;
	$('.jsPromise-result').append('Promise 완료<br>: Promise 시작으로 부터 '+elapsed+'초 경과되었습니다.('+formatDate(end)+')</p>');
});
```
