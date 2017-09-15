# layer


```javascript
var promise = new Promise(
	function(resolve, reject) {
		...
	}
);
```

```javascript
lazy.jsPromise = function(url, callback) {
	return new Promise(function(resolve, reject) {
		lazy.js(url, function() {
			callback();
			resolve(url+" loaded");
		});
	});
};
```
