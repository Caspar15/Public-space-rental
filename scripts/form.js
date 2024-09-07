<<<<<<< HEAD
// document.addEventListener('DOMContentLoaded', function() {
//     // 模擬從後端獲取的用戶數據
//     restoreFormData();

//     const userData = {
//         name: '王小明',
//         id: 'A123456789',
//         phone: '0912345678',
//         email: 'xiaoming.wang@example.com'
//     };

//     // 填充表單
//     document.getElementById('name').value = userData.name;
//     document.getElementById('id').value = userData.id;
//     document.getElementById('phone').value = userData.phone;
//     document.getElementById('email').value = userData.email;

//     // 表單提交處理：
//     const form = document.getElementById('userInfoForm');
//     form.addEventListener('submit', function(e) {
//         e.preventDefault();
//         // 獲取表單數據
//         const formData = new FormData(form);
//         const formValues = Object.fromEntries(formData.entries());
//         localStorage.setItem('formData', JSON.stringify(formValues));
        
//         // 在控制台輸出表單數據
//         console.log('form data:', formValues);
//         window.location.href = 'selectPayment.html';
//         // 這裡可以添加表單驗證邏輯
//         // 如果驗證通過，可以導航到下一個頁面
//         // window.location.href = '下一個頁面的URL';
//     });

//     const backButton = document.getElementById('backButton');
//     backButton.addEventListener('click', function() {
//         // 導航回選擇時間頁面
//         window.location.href = 'selectTime.html';
//     });

//     function restoreFormData() {
//         const savedData = localStorage.getItem('formData');
//         if (savedData) {
//             const formValues = JSON.parse(savedData);
//             for (const [key, value] of Object.entries(formValues)) {
//                 const input = document.getElementById(key);
//                 if (input) {
//                     input.value = value;
//                     // 觸發 input 事件，以確保任何相關的事件監聽器都能正確響應
//                     input.dispatchEvent(new Event('input', { bubbles: true }));
//                 }
//             }
//         }
//     }


// });


document.addEventListener('DOMContentLoaded', function() {
    const selectedVenue = JSON.parse(localStorage.getItem('selectedVenue'));
    const selectedDate = localStorage.getItem('selectedDate');
    const selectedTimeSlot = localStorage.getItem('selectedTimeSlot');

    // 從API加載用戶數據並填充到表單中
    fetch('https://82e1-211-75-133-2.ngrok-free.app/show_people_info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            location: selectedVenue.location,
            date: selectedDate,
            time: selectedTimeSlot.split('~')[0].trim() + ':00' // 提取開始時間作為查詢時間
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            const people = data.people;
            document.getElementById('name').value = people.name;
            document.getElementById('id').value = people.ID;
            document.getElementById('phone').value = people.phone;
            document.getElementById('email').value = people.mail;
        } else {
            alert('無法獲取人員數據，請稍後再試');
        }
    })
    .catch(error => {
        console.error('獲取人員數據時發生錯誤:', error);
        alert('獲取人員數據失敗，請稍後再試');
    });

    // 填充本地存儲的表單數據
    restoreFormData();

    // 表單提交處理
=======
document.addEventListener('DOMContentLoaded', function() {
    // 模擬從後端獲取的用戶數據
    restoreFormData();

    const userData = {
        name: '王小明',
        id: 'A123456789',
        phone: '0912345678',
        email: 'xiaoming.wang@example.com'
    };

    // 填充表單
    document.getElementById('name').value = userData.name;
    document.getElementById('id').value = userData.id;
    document.getElementById('phone').value = userData.phone;
    document.getElementById('email').value = userData.email;

    // 表單提交處理：
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
    const form = document.getElementById('userInfoForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // 獲取表單數據
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());
        localStorage.setItem('formData', JSON.stringify(formValues));
<<<<<<< HEAD

        // 在控制台輸出表單數據
        console.log('form data:', formValues);
        window.location.href = 'selectPayment.html';
=======
        
        // 在控制台輸出表單數據
        console.log('form data:', formValues);
        window.location.href = 'selectPayment.html';
        // 這裡可以添加表單驗證邏輯
        // 如果驗證通過，可以導航到下一個頁面
        // window.location.href = '下一個頁面的URL';
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
    });

    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', function() {
        // 導航回選擇時間頁面
        window.location.href = 'selectTime.html';
    });

<<<<<<< HEAD
    // 恢復本地存儲的表單數據
=======
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
    function restoreFormData() {
        const savedData = localStorage.getItem('formData');
        if (savedData) {
            const formValues = JSON.parse(savedData);
            for (const [key, value] of Object.entries(formValues)) {
                const input = document.getElementById(key);
                if (input) {
                    input.value = value;
                    // 觸發 input 事件，以確保任何相關的事件監聽器都能正確響應
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                }
            }
        }
    }
<<<<<<< HEAD
=======


>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
});
