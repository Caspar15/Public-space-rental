document.addEventListener('DOMContentLoaded', function() {
    // 生成假資料
    const fakeHistoryData = {
        history: [
            {
                isEntry: 0,
                location: "林森三區民活動中心 | 區民活動中心",
                price: 255,
                time: "2024-09-07T08:00:00"
            },
            {
                isEntry: 1,
                location: "朱崙區民活動中心 | 區民活動中心",
                price: 125,
                time: "2024-09-06T10:00:00"
            },
            {
                isEntry: 0,
                location: "松山區展覽館 | 展覽中心",
                price: 150,
                time: "2024-09-05T09:30:00"
            }
        ]
    };

    // 將假資料存入 localStorage
    localStorage.setItem('historyRecords', JSON.stringify(fakeHistoryData));

    // 從 localStorage 中獲取歷史紀錄
    const historyRecords = JSON.parse(localStorage.getItem('historyRecords'));
    const recordList = document.querySelector('.record-list');

    if (!historyRecords) {
        alert('無法加載紀錄，請稍後再試。');
        return;
    }

    // 確保資料結構正確，並提取出 history 陣列
    const records = historyRecords.history || [];

    if (Array.isArray(records)) {
        records.forEach(record => {
            const recordItem = document.createElement('div');
            recordItem.classList.add('record-item');
            
            // 判斷 isEntry 來顯示入場狀態，並賦予顏色
            const entryStatus = record.isEntry === 1 ? '已入場' : '未入場';
            const entryColorClass = record.isEntry === 1 ? 'green' : 'red';

            recordItem.innerHTML = `
                <p class="location">${record.location}</p>
                <p class="time">${new Date(record.time).toLocaleString('zh-TW', { hour12: false })}</p>
                <p class="price">價格：${record.price} 元</p>
                <p class="entry-status ${entryColorClass}">狀態：${entryStatus}</p>
            `;

            // 為每個紀錄項目添加點擊和觸摸動畫
            recordItem.addEventListener('touchstart', () => handleTouch(recordItem));
            recordItem.addEventListener('mousedown', () => handleTouch(recordItem));

            recordList.appendChild(recordItem);
        });
    } else {
        console.error("歷史紀錄資料格式錯誤，無法解析:", historyRecords);
        alert("無法加載紀錄，格式錯誤");
    }

    // 點擊或觸摸時觸發動畫的函數
    function handleTouch(item) {
        item.style.transition = 'transform 0.2s ease';
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 200); // 200ms後還原
    }
});
