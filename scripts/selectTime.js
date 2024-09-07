document.addEventListener('DOMContentLoaded', function() {
    const selectedVenue = JSON.parse(localStorage.getItem('selectedVenue'));
    const backButton = document.getElementById('backButton');
    const calendar = document.querySelector('.calendar');
    const monthDisplay = calendar.querySelector('.current-month');
    const daysContainer = calendar.querySelector('.days');
    const prevMonthBtn = calendar.querySelector('.prev-month');
    const nextMonthBtn = calendar.querySelector('.next-month');
    const timePeriodsContainer = document.getElementById('time-periods');

    let currentDate = new Date();
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

            if (compareDates(currentDayDate, today) < 0) {
                dayElement.classList.add('disabled');
            } else {
                dayElement.classList.add('available');
                dayElement.addEventListener('click', () => selectDate(i, month, year));
            }

            daysContainer.appendChild(dayElement);
        }
    }

    function selectDate(day, month, year) {
        const selectedDay = new Date(year, month, day);
        const today = new Date();

        console.log('Selected date:', selectedDay.toISOString()); // 調試日誌

        if (compareDates(selectedDay, today) >= 0) {
            const previousSelected = daysContainer.querySelector('.selected');
            if (previousSelected) {
                previousSelected.classList.remove('selected');
            }

            selectedDate = selectedDay;

            const newSelected = Array.from(daysContainer.querySelectorAll('.day:not(.disabled)'))
                .find(dayEl => parseInt(dayEl.textContent) === day);
            if (newSelected) {
                newSelected.classList.add('selected');
            }

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
    }

    function displayTimeSlots(timeSlots) {
        timePeriodsContainer.innerHTML = '<h3>可預約時段：</h3>';
        
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

            timePeriodsContainer.appendChild(button);
        });
    }

    function selectTimeSlot(button) {
        timePeriodsContainer.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('selected');
        });

        button.classList.add('selected');
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

    // 初始化日曆
    renderCalendar();

    // 清空時段容器
    timePeriodsContainer.innerHTML = '<p>請選擇一個日期查看可用時段</p>';

    const nextButton = document.getElementById('nextButton');
    nextButton.addEventListener('click', function() {
        const selectedTimeSlot = timePeriodsContainer.querySelector('.time-slot.selected');
        
        if (selectedTimeSlot) {
            const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
            localStorage.setItem('selectedDate', formattedDate);
            localStorage.setItem('selectedTimeSlot', selectedTimeSlot.textContent);
            window.location.href = 'fillInfo.html';
        } else {
            alert('請選擇一個可預約時段');
        }
    });
});


