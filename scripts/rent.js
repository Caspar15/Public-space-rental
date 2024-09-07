let map;
let mapModal;
let closeModal;
let loadingOverlay;

document.addEventListener('DOMContentLoaded', function () {
    const mapButton = document.getElementById('mapButton');
    mapModal = document.getElementById('mapModal');
    closeModal = document.querySelector('.close');
    loadingOverlay = document.getElementById('loading');

    mapButton.addEventListener('click', function () {
        mapModal.style.display = 'block';
        initMap();  // 點擊按鈕時初始化地圖
    });

    closeModal.addEventListener('click', function () {
        mapModal.style.display = 'none';
    });

    window.onclick = function (event) {
        if (event.target == mapModal) {
            mapModal.style.display = 'none';
        }
    };

    const venueList = document.querySelector('.venue-list');
    const filterButtons = document.querySelectorAll('.filter-button');
    const searchInput = document.querySelector('.search-bar input[type="text"]');
    let selectedButton = null;
    let currentFilteredVenues = []; // 儲存篩選後的地點列表

    // 發送 POST 請求以獲取場地資料
    function fetchVenues(area = "全部") {
        // 顯示加載動畫
        loadingOverlay.style.display = 'block';

        fetch('https://82e1-211-75-133-2.ngrok-free.app/search_companies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                area: area // 傳遞選中的地區
            })
        })
        .then(response => response.json())
        .then(data => {
            // 隱藏加載動畫
            loadingOverlay.style.display = 'none';

            if (data && data.data) {
                renderVenues(data.data); // 渲染場地資料
                currentFilteredVenues = data.data; // 更新目前篩選的地點列表
                if (map) {  // 如果地圖已初始化，更新標記
                    updateMapMarkers(currentFilteredVenues);
                }
            } else {
                console.error('回應的資料格式不正確:', data);
                alert('無法加載場地資料，請稍後再試。');
            }
        })
        .catch(error => {
            // 隱藏加載動畫
            loadingOverlay.style.display = 'none';

            console.error('發送請求時出錯:', error);
            alert('無法加載場地資料，請稍後再試。');
        });
    }

    // 初始載入 "全部" 地區的場地資料
    fetchVenues();

    // 渲染場地資料的函數
    function renderVenues(venues) {
        venueList.innerHTML = ''; // 清空現有的場地列表

        venues.forEach(venue => {
            const venueItem = document.createElement('div');
            venueItem.classList.add('venue-item');

            if (venue.isOpen) {
                venueItem.classList.add('open-venue');
            }

            venueItem.innerHTML = `
                <img src="data:image/jpeg;base64,${venue.image}" alt="Venue" class="venue-image">
                <div class="venue-details">
                    <h2 class="venue-name">${venue.location}</h2>
                    <p class="capacity">容量人數：${venue.people}</p>
                    <p class="location">地址：${venue.address}</p>
                    <p class="contact">聯絡人：${venue.contact}</p>
                    <p class="phone">電話：${venue.phone}</p>
                    <p class="content">類型：${venue.content}</p>
                    <p class="isOpen" style="color: ${venue.isOpen ? 'green' : '#D45251'};">
                        ${venue.isOpen ? '可預約' : '尚未受理期間'}
                    </p>
                </div>
            `;

            venueItem.addEventListener('click', function (event) {
                event.preventDefault();
                
                if (venue.isOpen) {
                    localStorage.setItem('selectedVenue', JSON.stringify(venue));
                    window.location.href = 'selectTime.html';
                }
            });
            
            venueList.appendChild(venueItem);
        });
    }

    // 初始化地圖
    function initMap() {
        const taipei = { lat: 25.033, lng: 121.5654 };  // 台北市的中心點

        map = new google.maps.Map(document.getElementById('map'), {
            center: taipei,
            zoom: 12
        });

        updateMapMarkers(currentFilteredVenues);  // 初始化時添加標記
    }


    // 更新地圖上的標記
    function updateMapMarkers(venues) {
        const geocoder = new google.maps.Geocoder();
        const markers = [];

        venues.forEach(venue => {
            geocodeAddress(geocoder, venue, function(result) {
                if(venue.isOpen){
                    if (result) {
                        const marker = new google.maps.Marker({
                            position: result.geometry.location,
                            map: map,
                            title: venue.location
                        });
    
                        const infoWindow = new google.maps.InfoWindow({
                            content: `<div><strong>${venue.location}</strong><br>${venue.address}</div>
                            <button id="selectVenue_${venue.id}" class="select-venue-btn">選擇此場地</button>
                        </div>`
                            
                        });
                        marker.addListener('click', function () {
                            infoWindow.open(map, marker);
                            setTimeout(() => {
                                const selectButton = document.getElementById(`selectVenue_${venue.id}`);
                                if (selectButton) {
                                    selectButton.addEventListener('click', function() {
                                        localStorage.setItem('selectedVenue', JSON.stringify(venue));
                                        window.location.href = 'selectTime.html';
                                    });
                                }
                            }, 0);
                            
                            ////////////////////////////////////
                        });
                        
                        
                        markers.push(marker);
    
                        // 如果這是最後一個標記，調整地圖視圖
                        if (markers.length === venues.length) {
                            const bounds = new google.maps.LatLngBounds();
                            markers.forEach(m => bounds.extend(m.getPosition()));
                            map.fitBounds(bounds);
                        }
                    }
                }
            });
        });
    }

    // 搜尋功能
    function searchVenues(query) {
        const filteredVenues = currentFilteredVenues.filter(venue => {
            return venue.location.toLowerCase().includes(query.toLowerCase());
        });

        renderVenues(filteredVenues);  // 渲染搜尋結果
        if (map) {
            updateMapMarkers(filteredVenues);  // 更新地圖標記
        }
    }

    searchInput.addEventListener('input', function () {
        const query = this.value.trim(); // 刪除前後空格
        if (query === '') {
            renderVenues(currentFilteredVenues); // 如果搜尋欄為空，顯示目前篩選後的場地
            updateMapMarkers(currentFilteredVenues);  // 更新地圖標記
        } else {
            searchVenues(query); // 根據搜尋內容篩選場地
        }
    });

    // 篩選功能
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedDistrict = this.getAttribute('data-district');

            // 移除上一個選中的按鈕樣式
            if (selectedButton) {
                selectedButton.classList.remove('selected');
            }

            // 設置當前選中按鈕的樣式
            this.classList.add('selected');
            selectedButton = this;

            fetchVenues(selectedDistrict); // 根據選中的區域篩選場地
        });
    });
});

function geocodeAddress(geocoder, venue, callback) {
    geocoder.geocode({ address: venue.address }, function(results, status) {
        if (status === 'OK') {
            callback(results[0]);
            // 更新 venue 對象的經緯度
            venue.lat = results[0].geometry.location.lat();
            venue.lng = results[0].geometry.location.lng();
            console.log(`Geocoded ${venue.location}: Lat ${venue.lat}, Lng ${venue.lng}`);
        } else {
            console.error('Geocode was not successful for the following reason: ' + status);
            callback(null);
        }
    });
}
