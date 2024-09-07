<<<<<<< HEAD
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

=======
document.addEventListener('DOMContentLoaded', function () {
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
    const venueList = document.querySelector('.venue-list');
    const filterButtons = document.querySelectorAll('.filter-button');
    const searchInput = document.querySelector('.search-bar input[type="text"]');
    let selectedButton = null;
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
    let currentFilteredVenues = []; // 儲存篩選後的地點列表

    // 發送 POST 請求以獲取場地資料
    function fetchVenues(area = "全部") {
<<<<<<< HEAD
        // 顯示加載動畫
        loadingOverlay.style.display = 'block';

=======
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
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
<<<<<<< HEAD
            // 隱藏加載動畫
            loadingOverlay.style.display = 'none';

            if (data && data.data) {
                renderVenues(data.data); // 渲染場地資料
                currentFilteredVenues = data.data; // 更新目前篩選的地點列表
                if (map) {  // 如果地圖已初始化，更新標記
                    updateMapMarkers(currentFilteredVenues);
                }
=======
            if (data && data.data) {
                renderVenues(data.data); // 渲染場地資料
                currentFilteredVenues = data.data; // 更新目前篩選的地點列表
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
            } else {
                console.error('回應的資料格式不正確:', data);
                alert('無法加載場地資料，請稍後再試。');
            }
        })
        .catch(error => {
<<<<<<< HEAD
            // 隱藏加載動畫
            loadingOverlay.style.display = 'none';

            console.error('發送請求時出錯:', error);
            alert('無法加載場地資料，請稍後再試。');
        });
=======
            console.error('發送請求時出錯:', error);
            alert('無法加載場地資料，請稍後再試。');
        });
=======

    // 發送 POST 請求以獲取場地資料
    // function fetchVenues(area = "全部") {
    //     fetch('https://82e1-211-75-133-2.ngrok-free.app/search_companies', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             area: area // 傳遞選中的地區
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data && data.data) {
    //             renderVenues(data.data); // 渲染場地資料
    //         } else {
    //             console.error('回應的資料格式不正確:', data);
    //             alert('無法加載場地資料，請稍後再試。');
    //         }
    //     })
    //     .catch(error => {
    //         console.error('發送請求時出錯:', error);
    //         alert('無法加載場地資料，請稍後再試。');
    //     });
    // }

    const fakeVenues = [
        {
            location: "台北市立圖書館總館",
            address: "台北市大安區敦化南路二段125號",
            lat: 25.0286,
            lng: 121.5486,
            capacity: 500,
            contact: "張先生",
            phone: "02-2755-2823",
            isOpen: true
        },
        {
            location: "國立台灣大學綜合體育館",
            address: "台北市大安區羅斯福路四段1號",
            lat: 25.0199,
            lng: 121.5413,
            capacity: 3000,
            contact: "李小姐",
            phone: "02-3366-5959",
            isOpen: true
        },
        {
            location: "台北小巨蛋",
            address: "台北市松山區南京東路四段2號",
            lat: 25.0511,
            lng: 121.5511,
            capacity: 15000,
            contact: "王經理",
            phone: "02-2578-3536",
            isOpen: true
        },
        {
            location: "中正紀念堂",
            address: "台北市中正區中山南路21號",
            lat: 25.0347,
            lng: 121.5222,
            capacity: 2000,
            contact: "陳主任",
            phone: "02-2343-1100",
            isOpen: false
        },
        {
            location: "松山文創園區",
            address: "台北市信義區光復南路133號",
            lat: 25.0436,
            lng: 121.5606,
            capacity: 1000,
            contact: "林小姐",
            phone: "02-2765-1388",
            isOpen: true
        }
    ];

    function fetchVenues(area = "全部") {
        // 模擬 API 請求延遲
        setTimeout(() => {
            let filteredVenues = fakeVenues;
            if (area !== "全部") {
                filteredVenues = fakeVenues.filter(venue => venue.address.includes(area));
            }
            renderVenues(filteredVenues);
            venues = filteredVenues; // 保存場地數據到全局變量，供地圖使用
        }, 500);
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
    }

    // 初始載入 "全部" 地區的場地資料
    fetchVenues();

    // 渲染場地資料的函數
    function renderVenues(venues) {
        venueList.innerHTML = ''; // 清空現有的場地列表

        venues.forEach(venue => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
            const venueItem = document.createElement('div');
            venueItem.classList.add('venue-item');

            if (venue.isOpen) {
                venueItem.classList.add('open-venue');
            }

<<<<<<< HEAD
=======
=======
            const venueItem = document.createElement('div'); // 改為 div 而不是 a
            venueItem.classList.add('venue-item');
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
            venueItem.innerHTML = `
                <img src="data:image/jpeg;base64,${venue.image}" alt="Venue" class="venue-image">
                <div class="venue-details">
                    <h2 class="venue-name">${venue.location}</h2>
                    <p class="capacity">容量人數：${venue.people}</p>
                    <p class="location">地址：${venue.address}</p>
                    <p class="contact">聯絡人：${venue.contact}</p>
                    <p class="phone">電話：${venue.phone}</p>
                    <p class="content">類型：${venue.content}</p>
<<<<<<< HEAD
                    <p class="isOpen" style="color: ${venue.isOpen ? 'green' : '#D45251'};">
                        ${venue.isOpen ? '可預約' : '尚未受理期間'}
                    </p>
=======
<<<<<<< HEAD
                    <p class="isOpen" style="color: ${venue.isOpen ? 'green' : '#D45251'};">
                        ${venue.isOpen ? '可預約' : '尚未受理期間'}
                    </p>
=======
                    <p class="isOpen">${venue.isOpen ? '營業中' : '已關閉'}</p>
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
                </div>
            `;

            venueItem.addEventListener('click', function (event) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
                event.preventDefault();
                
                if (venue.isOpen) {
                    localStorage.setItem('selectedVenue', JSON.stringify(venue));
<<<<<<< HEAD
=======
=======
                event.preventDefault(); // 防止默認行為（如果有的話）
                
                if (venue.isOpen) {
                    // 保存選擇的地點到 localStorage34343
                    localStorage.setItem('selectedVenue', JSON.stringify(venue));
                    
                    // 導航到 selectTime.html 頁面
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
                    window.location.href = 'selectTime.html';
                }
            });
            
            venueList.appendChild(venueItem);
        });
    }

<<<<<<< HEAD
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
=======
<<<<<<< HEAD
    // 搜尋功能：根據子字串搜尋篩選後的場地名稱、聯絡人或地址
    function searchVenues(query) {
        const lowerCaseQuery = query.toLowerCase();

        // 根據目前篩選後的地點進行搜尋
        const filteredVenues = currentFilteredVenues.filter(venue => {
            const venueName = venue.location.toLowerCase();
            const contact = venue.contact.toLowerCase();
            const location = venue.address.toLowerCase();
=======
    // 篩選地點列表的函數
    function filterVenues(district) {
        fetchVenues(district); // 根據選中的區域發送請求以獲取資料
    }

    // 搜尋功能：根據子字串搜尋場地名稱、聯絡人或地址
    function searchVenues(query) {
        const lowerCaseQuery = query.toLowerCase();

        // 直接根據當前顯示的場地過濾
        const filteredVenues = Array.from(venueList.children).filter(venueItem => {
            const venueName = venueItem.querySelector('.venue-name').textContent.toLowerCase();
            const contact = venueItem.querySelector('.contact').textContent.toLowerCase();
            const location = venueItem.querySelector('.location').textContent.toLowerCase();
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c

            return venueName.includes(lowerCaseQuery) || contact.includes(lowerCaseQuery) || location.includes(lowerCaseQuery);
        });

<<<<<<< HEAD
        renderVenues(filteredVenues); // 渲染搜尋後的場地列表
=======
        venueList.innerHTML = ''; // 清空現有的場地列表
        filteredVenues.forEach(venueItem => venueList.appendChild(venueItem)); // 重新顯示篩選後的場地
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
    }

    // 搜尋框輸入事件監聽
    searchInput.addEventListener('input', function () {
<<<<<<< HEAD
        const query = this.value.trim(); // 刪除前後空格
        if (query === '') {
            renderVenues(currentFilteredVenues); // 如果搜尋欄為空，顯示目前篩選後的場地
        } else {
            searchVenues(query); // 根據搜尋內容篩選場地
        }
=======
        const query = this.value;
        searchVenues(query); // 根據搜尋內容篩選場地
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
    });

    // 為每個區域按鈕添加點擊事件
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
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

<<<<<<< HEAD
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
=======
            filterVenues(selectedDistrict); // 根據區域篩選場地
        });
    });

<<<<<<< HEAD
    // 篩選地點列表的函數
    function filterVenues(district) {
        fetchVenues(district); // 根據選中的區域發送請求以獲取資料
    }

=======
    // const mapButton = document.getElementById('mapButton');
    // const mapModal = document.getElementById('mapModal');
    // const closeButton = mapModal.querySelector('.close');
    // let map;
    // let markers = [];

    // mapButton.addEventListener('click', function() {
    //     mapModal.style.display = 'block';
    //     initMap();
    // });

    // closeButton.addEventListener('click', function() {
    //     mapModal.style.display = 'none';
    // });

    // window.addEventListener('click', function(event) {
    //     if (event.target == mapModal) {
    //         mapModal.style.display = 'none';
    //     }
    // });

    // function initMap() {
    //     if (!map) {
    //         map = new google.maps.Map(document.getElementById('map'), {
    //             center: {lat: 25.0330, lng: 121.5654}, // 台北市中心
    //             zoom: 12
    //         });
    //     }

    //     // 清除現有的標記
    //     markers.forEach(marker => marker.setMap(null));
    //     markers = [];

    //     // 為每個場地添加標記
    //     fakeVenues.forEach(venue => {
    //         const marker = new google.maps.Marker({
    //             position: {lat: venue.lat, lng: venue.lng},
    //             map: map,
    //             title: venue.location
    //         });
    //         markers.push(marker);

    //         const infoWindow = new google.maps.InfoWindow({
    //             content: `<h3>${venue.location}</h3><p>${venue.address}</p><p>容量：${venue.capacity}</p><p>狀態：${venue.isOpen ? '營業中' : '已關閉'}</p>`
    //         });

    //         marker.addListener('click', () => {
    //             infoWindow.open(map, marker);
    //         });
    //     });
    // }
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
});
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
