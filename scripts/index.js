document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://82e1-211-75-133-2.ngrok-free.app/search_history';
    const userID = 'A123456789';

    // 在點擊「歷史紀錄」卡片時發送 API 請求
    const historyCard = document.querySelector('.history-card');
    historyCard.addEventListener('click', function(event) {
        event.preventDefault(); // 防止立即跳轉

        // 添加點擊動畫
        historyCard.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        historyCard.style.transform = 'scale(0.95)';
        historyCard.style.opacity = '0.7';

        // 發送 POST 請求
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ ID: userID }) // 傳送用戶 ID
        })
        .then(response => {
            // 檢查回應的狀態碼
            if (!response.ok) {
                return response.text().then(text => { // 取得回應文本（可能是錯誤訊息）
                    throw new Error(`HTTP error! Status: ${response.status}. Response: ${text}`);
                });
            }
            return response.json(); // 如果回應成功，解析為 JSON
        })
        .then(data => {
            if (data.length === 0) {
                throw new Error("No history records found.");
            }
            // 將返回的歷史紀錄數據存儲在 localStorage 中
            localStorage.setItem('historyRecords', JSON.stringify(data));
            console.log("歷史紀錄已加載並存儲", data);

            // 延遲 300ms 進行頁面跳轉
            setTimeout(() => {
                window.location.href = historyCard.href;
            }, 300);
        })
        .catch(error => {
            // 捕捉所有錯誤並顯示詳細訊息
            console.error("無法加載歷史紀錄:", error.message);
            alert(`無法加載歷史紀錄，錯誤訊息: ${error.message}`);
            
            // 重置卡片樣式
            historyCard.style.transform = '';
            historyCard.style.opacity = '';
        });
    });

    // 其他卡片（如租借場地）的點擊動畫和跳轉邏輯
    document.querySelectorAll('.card').forEach(card => {
        if (card !== historyCard) {
            card.addEventListener('click', function(event) {
                event.preventDefault(); // 防止立即跳轉

                // 添加點擊動畫
                card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                card.style.transform = 'scale(0.95)';
                card.style.opacity = '0.7';

                // 延遲一點再進行頁面跳轉
                setTimeout(() => {
                    window.location.href = card.href;
                }, 300); // 動畫持續 300ms
            });
        }
    });
});
