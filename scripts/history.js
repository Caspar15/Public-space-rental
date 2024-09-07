document.addEventListener('DOMContentLoaded', function() {
    // 從 localStorage 中獲取歷史紀錄
    const historyRecords = JSON.parse(localStorage.getItem('historyRecords'));
    const recordList = document.querySelector('.record-list');

    // 如果無法加載歷史紀錄，顯示錯誤訊息
    if (!historyRecords) {
        alert('無法加載紀錄，請稍後再試。');
        return;
    }

    console.log("歷史紀錄資料:", historyRecords); // 檢查伺服器返回的資料格式

    // 確保資料結構正確，並提取出 history 陣列
    const records = historyRecords.history || [];

    if (Array.isArray(records)) {
        records.forEach(record => {
            const recordItem = document.createElement('div');
            recordItem.classList.add('record-item');
            
            // 判斷 isEntry 來顯示入場狀態，並賦予顏色
            const entryStatus = record.isEntry === 1 ? '已入場' : '尚未入場';
            const entryColorClass = record.isEntry === 1 ? 'green' : 'red';

            // 將時間減去 8 小時
            const recordTime = new Date(record.time);
            recordTime.setHours(recordTime.getHours() - 8);
            
            
            recordItem.innerHTML = `
                <p class="location">${record.location}</p>
                <p class="time">${recordTime.toLocaleString('zh-TW', { hour12: false })}</p>
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
