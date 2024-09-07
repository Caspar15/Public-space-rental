document.addEventListener('DOMContentLoaded', function () {
    const venueList = document.querySelector('.venue-list');
    const filterButtons = document.querySelectorAll('.filter-button');
    const searchInput = document.querySelector('.search-bar input[type="text"]');
    let selectedButton = null;
    let currentFilteredVenues = []; // 儲存篩選後的地點列表

    // 發送 POST 請求以獲取場地資料
    function fetchVenues(area = "全部") {
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
            if (data && data.data) {
                renderVenues(data.data); // 渲染場地資料
                currentFilteredVenues = data.data; // 更新目前篩選的地點列表
            } else {
                console.error('回應的資料格式不正確:', data);
                alert('無法加載場地資料，請稍後再試。');
            }
        })
        .catch(error => {
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

    // 搜尋功能：根據子字串搜尋篩選後的場地名稱、聯絡人或地址
    function searchVenues(query) {
        const lowerCaseQuery = query.toLowerCase();

        // 根據目前篩選後的地點進行搜尋
        const filteredVenues = currentFilteredVenues.filter(venue => {
            const venueName = venue.location.toLowerCase();
            const contact = venue.contact.toLowerCase();
            const location = venue.address.toLowerCase();

            return venueName.includes(lowerCaseQuery) || contact.includes(lowerCaseQuery) || location.includes(lowerCaseQuery);
        });

        renderVenues(filteredVenues); // 渲染搜尋後的場地列表
    }

    // 搜尋框輸入事件監聽
    searchInput.addEventListener('input', function () {
        const query = this.value.trim(); // 刪除前後空格
        if (query === '') {
            renderVenues(currentFilteredVenues); // 如果搜尋欄為空，顯示目前篩選後的場地
        } else {
            searchVenues(query); // 根據搜尋內容篩選場地
        }
    });

    // 為每個區域按鈕添加點擊事件
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

            filterVenues(selectedDistrict); // 根據區域篩選場地
        });
    });

    // 篩選地點列表的函數
    function filterVenues(district) {
        fetchVenues(district); // 根據選中的區域發送請求以獲取資料
    }

});
