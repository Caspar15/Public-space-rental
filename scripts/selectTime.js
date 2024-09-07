document.addEventListener('DOMContentLoaded', function() {
<<<<<<< HEAD
    const selectedVenue = JSON.parse(localStorage.getItem('selectedVenue'));
    const backButton = document.getElementById('backButton');
=======
<<<<<<< HEAD
    const selectedVenue = JSON.parse(localStorage.getItem('selectedVenue'));
    const backButton = document.getElementById('backButton');
=======
    // 解析 localStorage 中的選擇地點資料
    const selectedVenue = JSON.parse(localStorage.getItem('selectedVenue'));
    const backButton = document.getElementById('backButton');
    
    // 當用戶點擊「上一步」時，跳轉回 rent.html
    backButton.addEventListener('click', function() {
        window.location.href = 'rent.html'; // 確保 rent.html 路徑正確
    });
    // 顯示選中的地點資料
    if (selectedVenue) {
        const locationLink = document.querySelector('.location-link');
        locationLink.textContent = selectedVenue.name;
        locationLink.href = '#'; // 這裡可以設置成地點的具體鏈接，或維持空的錨點
    }

>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
    const calendar = document.querySelector('.calendar');
    const monthDisplay = calendar.querySelector('.current-month');
    const daysContainer = calendar.querySelector('.days');
    const prevMonthBtn = calendar.querySelector('.prev-month');
    const nextMonthBtn = calendar.querySelector('.next-month');
    const timePeriodsContainer = document.getElementById('time-periods');

    let currentDate = new Date();
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
    let selectedDate = null;

    backButton.addEventListener('click', function() {
        window.location.href = 'rent.html';
    });

    // 顯示選中的地點資料
    if (selectedVenue) {
        const locationLink = document.querySelector('.location-link');
        locationLink.textContent = selectedVenue.location;
        locationLink.href = '#';
    }
<<<<<<< HEAD
=======
=======
    let selectedDate = null; // 初始化為 null
    let selectedSlot = null; // 用於跟踪當前選中的時段
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        monthDisplay.textContent = `${year}年${month + 1}月`;

        daysContainer.innerHTML = '';

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const today = new Date();

        for (let i = 0; i < firstDay.getDay(); i++) {
            daysContainer.innerHTML += '<div></div>';
        }

        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = i;
            dayElement.classList.add('day');

            const currentDayDate = new Date(year, month, i);
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9

            if (compareDates(currentDayDate, today) < 0) {
                dayElement.classList.add('disabled');
            } else {
                dayElement.classList.add('available');
                dayElement.addEventListener('click', () => selectDate(i, month, year));
<<<<<<< HEAD
=======
=======
            
            if (compareDates(currentDayDate, today) < 0) {
                dayElement.classList.add('disabled');
            } else {
                dayElement.addEventListener('click', () => selectDate(i, month, year));
                if (selectedDate && compareDates(currentDayDate, selectedDate) === 0) {
                    dayElement.classList.add('selected');
                }
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
            }

            daysContainer.appendChild(dayElement);
        }
    }

    function selectDate(day, month, year) {
        const selectedDay = new Date(year, month, day);
        const today = new Date();

<<<<<<< HEAD
        console.log('Selected date:', selectedDay.toISOString()); // 調試日誌

=======
<<<<<<< HEAD
        console.log('Selected date:', selectedDay.toISOString()); // 調試日誌

=======
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
        if (compareDates(selectedDay, today) >= 0) {
            const previousSelected = daysContainer.querySelector('.selected');
            if (previousSelected) {
                previousSelected.classList.remove('selected');
            }

            selectedDate = selectedDay;
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
            
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
            const newSelected = Array.from(daysContainer.querySelectorAll('.day:not(.disabled)'))
                .find(dayEl => parseInt(dayEl.textContent) === day);
            if (newSelected) {
                newSelected.classList.add('selected');
            }

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
            fetchAvailableTimeSlots(selectedVenue.location, selectedDay);
        }
    }

    function fetchAvailableTimeSlots(location, date) {
        // 使用本地時間格式化日期
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

        console.log('Fetching time slots for date:', formattedDate);

        fetch('https://82e1-211-75-133-2.ngrok-free.app/select_date', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                location: location,
                date: formattedDate
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Received data:', JSON.stringify(data, null, 2));
            if (data.status === "success" && Array.isArray(data.time)) {
                console.log('Available time slots:', data.time);
                displayTimeSlots(data.time);
            } else {
                console.error('Unexpected data format:', data);
                timePeriodsContainer.innerHTML = '<p>無可預約時段</p>';
            }
        })
        .catch(error => {
            console.error('獲取可預約時段時發生錯誤:', error);
            timePeriodsContainer.innerHTML = '<p>無法加載可預約時段，請稍後再試。</p>';
        });
<<<<<<< HEAD
=======
=======
            console.log('Selected date:', selectedDate.toLocaleDateString('zh-TW'));
            fetchAvailableTimeSlots(selectedDate);
        }
    }

    function fetchAvailableTimeSlots(date) {
        console.log('Fetching time slots for:', date.toLocaleDateString('zh-TW'));
        
        // 根據選擇的日期返回不同的時間段
        let timeSlots;
        if (date.getDate() === 5) {
            timeSlots = [
                '08:00~12:00',
                '13:00~17:00',
                '18:00~22:00'
            ];
        } else if (date.getDate() === 6) {
            timeSlots = [
                '09:00~13:00',
                '14:00~18:00',
                '19:00~23:00'
            ];
        } else {
            timeSlots = [
                '08:00~12:00',
                '13:00~17:00',
                '18:00~22:00'
            ];
        }

        displayTimeSlots(timeSlots);
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
    }

    function displayTimeSlots(timeSlots) {
        timePeriodsContainer.innerHTML = '<h3>可預約時段：</h3>';
        
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
        if (timeSlots.length === 0) {
            timePeriodsContainer.innerHTML += '<p>無可預約時段</p>';
            return;
        }

        timeSlots.forEach(slot => {
            const button = document.createElement('button');
            
            // 假設 slot.StartTime 和 slot.EndTime 現在是 "hh:mm" 格式的字串
            const startTimeStr = slot.StartTime;
            const endTimeStr = slot.EndTime;
            
            button.textContent = `${startTimeStr} ~ ${endTimeStr}`;
            button.classList.add('time-slot');

            if (slot.IsBooked) {
                button.classList.add('booked');
                button.disabled = true;
            } else {
                button.addEventListener('click', () => selectTimeSlot(button));
            }

<<<<<<< HEAD
=======
=======
        timeSlots.forEach(slot => {
            const button = document.createElement('button');
            button.textContent = slot;
            button.classList.add('time-slot');
            button.addEventListener('click', () => selectTimeSlot(button));
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
            timePeriodsContainer.appendChild(button);
        });
    }

    function selectTimeSlot(button) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
        // 取消所有其他時段的選中狀態
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
        timePeriodsContainer.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('selected');
        });

<<<<<<< HEAD
        button.classList.add('selected');
=======
<<<<<<< HEAD
        button.classList.add('selected');
=======
        // 選中當前點擊的時段
        button.classList.add('selected');
        
        // 保存選中的時間段到 localStorage
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
        localStorage.setItem('selectedTimeSlot', button.textContent);
    }

    function compareDates(date1, date2) {
        return date1.getFullYear() - date2.getFullYear() ||
               date1.getMonth() - date2.getMonth() ||
               date1.getDate() - date2.getDate();
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
    // 初始化日曆
    renderCalendar();

    // 清空時段容器
    timePeriodsContainer.innerHTML = '<p>請選擇一個日期查看可用時段</p>';
<<<<<<< HEAD
=======
=======
    renderCalendar();

    // 初始選擇當前日期
    const today = new Date();
    selectDate(today.getDate(), today.getMonth(), today.getFullYear());
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9

    const nextButton = document.getElementById('nextButton');
    nextButton.addEventListener('click', function() {
        const selectedTimeSlot = timePeriodsContainer.querySelector('.time-slot.selected');
        
        if (selectedTimeSlot) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
            const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
            localStorage.setItem('selectedDate', formattedDate);
            localStorage.setItem('selectedTimeSlot', selectedTimeSlot.textContent);
            window.location.href = 'fillInfo.html';
        } else {
            alert('請選擇一個可預約時段');
        }
    });
});


<<<<<<< HEAD
=======
=======
            // 用戶已選擇時段，導向到 fillInfo 頁面
            localStorage.setItem('selectedDate', selectedDate.toISOString());
            localStorage.setItem('selectedTimeSlot', selectedTimeSlot.textContent);
            window.location.href = 'fillInfo.html';  // 請確保這是正確的 URL
        } else {
            // 用戶沒有選擇時段，顯示警告訊息
            alert('請選擇一個可預約時段');
        }
    });

    // 在用戶選擇日期和時間段後
});
>>>>>>> d40fb90b736defc09d0bfd3a3b69387f7156fd2c
>>>>>>> bed520f134c245840b8f3775db2422e6360e79a9
