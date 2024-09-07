document.addEventListener('DOMContentLoaded', function() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    const nextButton = document.getElementById('nextButton');
    const selectedVenue = JSON.parse(localStorage.getItem('selectedVenue'));
    const selectedDate = localStorage.getItem('selectedDate');
    const selectedTimeSlot = localStorage.getItem('selectedTimeSlot');
    const formData = JSON.parse(localStorage.getItem('formData')); // 使用保存的表單數據
    let selectedMethod = null;

    restorePaymentSelection();

    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            selectPaymentMethod(this.dataset.method);
        });
    });

    nextButton.addEventListener('click', function() {
        if (selectedMethod) {
            localStorage.setItem('paymentMethod', selectedMethod);

            // 準備要發送到 API 的數據
            const requestBody = {
                ID: formData.id, // 身份證
                location: selectedVenue.location, // 場地
                date: selectedDate.split('T')[0], // 只保留日期部分
                start_time: formatDateTime(selectedDate, selectedTimeSlot.split(' ~ ')[0]), // 格式化開始時間
                people_num: formData.people_num || 1 // 如果沒有指定人數，默認為 1
            };

            // 發送 API 請求
            fetch('https://82e1-211-75-133-2.ngrok-free.app/show_success_info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('付款信息已提交成功！');
                    window.location.href = 'confirmOrder.html';
                } else {
                    alert('付款信息提交失敗，請稍後再試');
                }
            })
            .catch(error => {
                console.error('提交付款信息時發生錯誤:', error);
                alert('提交付款信息失敗，請稍後再試');
            });
        } else {
            alert('請選擇一個付款方式');
        }
    });

    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', function() {
        window.location.href = 'fillInfo.html?restore=true';
    });

    function selectPaymentMethod(method) {
        paymentOptions.forEach(opt => {
            if (opt.dataset.method === method) {
                opt.classList.add('selected');
                opt.querySelector('input[type="radio"]').checked = true;
            } else {
                opt.classList.remove('selected');
                opt.querySelector('input[type="radio"]').checked = false;
            }
        });
        selectedMethod = method;
        nextButton.disabled = false;
    }

    function restorePaymentSelection() {
        const savedMethod = localStorage.getItem('paymentMethod');
        if (savedMethod) {
            selectPaymentMethod(savedMethod);
        }
    }

    // 格式化時間段，從 "08:00 ~ 12:00" 轉換為 "2024-09-07 08:00:00"
    function formatTimeSlot(timeSlot) {
        const startTime = timeSlot.split('~')[0].trim();
        return `${formatDateTime(selectedDate)} ${startTime}:00`; // 確保時間格式符合 "YYYY-MM-DD HH:mm:ss"
    }

    function formatDateTime(dateString, timeString) {
        // 從 ISO 日期字符串中提取日期部分
        const date = dateString.split('T')[0];
        // 從時間字符串中提取小時和分鐘
        const time = timeString.substring(0, 5);
        return `${date} ${time}:00`;
    }
});
