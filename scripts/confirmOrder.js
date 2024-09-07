document.addEventListener('DOMContentLoaded', function() {
    const orderInfo = document.getElementById('orderInfo');
    const formData = JSON.parse(localStorage.getItem('formData'));
    const paymentMethod = localStorage.getItem('paymentMethod');
    const selectedVenue = JSON.parse(localStorage.getItem('selectedVenue')); // 解析保存的場地信息
    const selectedDate = localStorage.getItem('selectedDate'); // 新增
    const selectedTimeSlot = localStorage.getItem('selectedTimeSlot'); // 新增

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

    if (formData) {
        html += '<div class="order-section">';
        html += '<h4>個人資料</h4>';
        for (const [key, value] of Object.entries(formData)) {
            html += `<div class="order-item"><span class="item-label">${getFieldLabel(key)}:</span> <span class="item-value">${value}</span></div>`;
        }
        html += '</div>';
    }

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
        // 這裡可以添加發送訂單到服務器的代碼

        // 清除 localStorage
        localStorage.removeItem('formData');
        localStorage.removeItem('paymentMethod');
        localStorage.removeItem('selectedVenue'); // 新增這行
        localStorage.removeItem('selectedDate'); // 新增
        localStorage.removeItem('selectedTimeSlot'); // 新增

        // 顯示訂單完成消息
        
        
        // 可以選擇重定向到首頁或其他頁面
        window.location.href = 'index.html';
    });

    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', function() {
        // 導航回選擇時間頁面
        window.location.href = 'selectPayment.html';
    });

});

function getFieldLabel(key) {
    const labels = {
        name: '申請人姓名',
        id: '身分證字號',
        phone: '行動電話',
        email: '電子郵件',
        activate: '活動名稱', // 新增
        people: '活動人數',  // 新增
        hello: '問題',
        bye: '問題'
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
    const month = date.getMonth() + 1; // getMonth() 返回 0-11
    const day = date.getDate();
    const weekday = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
    return `${year}/${month}/${day}(${weekday})`;
}

function formatTimeSlot(timeSlot) {
    // timeSlot 現在應該是一個字符串，格式如 "08:00~12:00"
    return timeSlot.replace('~', '-'); // 將 ~ 替換為 -
}