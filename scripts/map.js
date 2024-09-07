let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        // 中心點位置
        center: { lat: 23.197250366210938, lng: 119.42967987060547 }, 
       
        zoom: 18, // 地圖縮放比例 (0-20)
        maxZoom: 20, // 使用者能縮放地圖的最大比例 
        minZoom: 3, // 使用者能縮放地圖的最小比例
        
        streetViewControl: false, // 是否顯示右下角街景小人
        mapTypeControl: false // 使用者能否切換地圖樣式：一般、衛星圖等
      });
}

// 定義打印經緯度的函數
function printLatLng(lat, lng) {
    console.log('經度:', lng, '緯度:', lat);
    alert(`經度: ${lng}, 緯度: ${lat}`);  // 使用 alert 彈窗顯示經緯度
}
