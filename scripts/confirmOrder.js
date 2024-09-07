document.addEventListener('DOMContentLoaded', function() {
    const orderInfo = document.getElementById('orderInfo');
    const formData = JSON.parse(localStorage.getItem('formData'));
    const paymentMethod = localStorage.getItem('paymentMethod');
<<<<<<< HEAD
    const selectedVenue = JSON.parse(localStorage.getItem('selectedVenue'));
    const selectedDate = localStorage.getItem('selectedDate');
    const selectedTimeSlot = localStorage.getItem('selectedTimeSlot');
=======
<<<<<<< HEAD
    const selectedVenue = JSON.parse(localStorage.getItem('selectedVenue'));
    const selectedDate = localStorage.getItem('selectedDate');
    const selectedTimeSlot = localStorage.getItem('selectedTimeSlot');
=======
    const selectedVenue = JSON.parse(localStorage.getItem('selectedVenue')); // 解析保存的場地信息
    const selectedDate = localStorage.getItem('selectedDate'); // 新增
    const selectedTimeSlot = localStorage.getItem('selectedTimeSlot'); // 新增
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9

    let html = '<div class="order-summary">';
    html += '<h3>訂單摘要</h3>';

    // 顯示選擇的場地信息
    if (selectedVenue) {
        html += '<div class="order-section">';
        html += '<h4>租用場地</h4>';
        html += `<div class="order-item"><span class="item-label">場地名稱:</span> <span class="item-value">${selectedVenue.location}</span></div>`;
        html += `<div class="order-item"><span class="item-label">地址:</span> <span class="item-value">${selectedVenue.address}</span></div>`;
        html += '</div>';
    }

    // 顯示選擇的日期和時間段
    if (selectedDate && selectedTimeSlot) {
        html += '<div class="order-section">';
        html += '<h4>預約時間</h4>';
        html += `<div class="order-item"><span class="item-label">日期:</span> <span class="item-value">${formatDate(selectedDate)}</span></div>`;
        html += `<div class="order-item"><span class="item-label">時間段:</span> <span class="item-value">${formatTimeSlot(selectedTimeSlot)}</span></div>`;
        html += '</div>';
    }

<<<<<<< HEAD
    // 從本地儲存中加載個人資訊
=======
<<<<<<< HEAD
    // 從本地儲存中加載個人資訊
=======
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
    if (formData) {
        html += '<div class="order-section">';
        html += '<h4>個人資料</h4>';
        for (const [key, value] of Object.entries(formData)) {
            html += `<div class="order-item"><span class="item-label">${getFieldLabel(key)}:</span> <span class="item-value">${value}</span></div>`;
        }
        html += '</div>';
    }

<<<<<<< HEAD
    // 顯示付款資訊
=======
<<<<<<< HEAD
    // 顯示付款資訊
=======
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
    if (paymentMethod) {
        html += '<div class="order-section">';
        html += '<h4>付款資訊</h4>';
        html += `<div class="order-item"><span class="item-label">付款方式:</span> <span class="item-value">${getPaymentMethodLabel(paymentMethod)}</span></div>`;
        html += '</div>';
    }

    html += '</div>';
    orderInfo.innerHTML = html;

    const confirmButton = document.getElementById("nextButton");
    confirmButton.addEventListener('click', function() {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
        // 清除 localStorage
        localStorage.removeItem('formData');
        localStorage.removeItem('paymentMethod');
        localStorage.removeItem('selectedVenue');
        localStorage.removeItem('selectedDate');
        localStorage.removeItem('selectedTimeSlot');

        // 直接導航到首頁，不發送 API 請求
<<<<<<< HEAD
=======
=======
        // 這裡可以添加發送訂單到服務器的代碼

        // 清除 localStorage
        localStorage.removeItem('formData');
        localStorage.removeItem('paymentMethod');
        localStorage.removeItem('selectedVenue'); // 新增這行
        localStorage.removeItem('selectedDate'); // 新增
        localStorage.removeItem('selectedTimeSlot'); // 新增

        // 顯示訂單完成消息
        
        
        // 可以選擇重定向到首頁或其他頁面
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
        window.location.href = 'index.html';
    });

    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', function() {
<<<<<<< HEAD
        window.location.href = 'selectPayment.html';
    });
=======
<<<<<<< HEAD
        window.location.href = 'selectPayment.html';
    });
=======
        // 導航回選擇時間頁面
        window.location.href = 'selectPayment.html';
    });

>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
});

function getFieldLabel(key) {
    const labels = {
        name: '申請人姓名',
        id: '身分證字號',
        phone: '行動電話',
        email: '電子郵件',
<<<<<<< HEAD
        activate: '活動名稱',
        people: '活動人數',
=======
<<<<<<< HEAD
        activate: '活動名稱',
        people: '活動人數',
=======
        activate: '活動名稱', // 新增
        people: '活動人數',  // 新增
        hello: '問題',
        bye: '問題'
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
    };
    return labels[key] || key;
}

function getPaymentMethodLabel(method) {
    const labels = {
        'credit': '信用卡',
        'external-credit': '外部信用卡',
        'external-debit': '外部扣款卡',
        'cash': '現金',
        'store-credit': '商店信用',
        'cheque': '支票'
    };
    return labels[method] || method;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
<<<<<<< HEAD
    const month = date.getMonth() + 1;
=======
<<<<<<< HEAD
    const month = date.getMonth() + 1;
=======
    const month = date.getMonth() + 1; // getMonth() 返回 0-11
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
    const day = date.getDate();
    const weekday = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
    return `${year}/${month}/${day}(${weekday})`;
}

function formatTimeSlot(timeSlot) {
<<<<<<< HEAD
    // 將時間段從 "08:00~12:00" 格式化為 "08:00 - 12:00"
    return timeSlot.replace('~', '-');
}
=======
<<<<<<< HEAD
    // 將時間段從 "08:00~12:00" 格式化為 "08:00 - 12:00"
    return timeSlot.replace('~', '-');
}
=======
    // timeSlot 現在應該是一個字符串，格式如 "08:00~12:00"
    return timeSlot.replace('~', '-'); // 將 ~ 替換為 -
}
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
