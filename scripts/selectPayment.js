document.addEventListener('DOMContentLoaded', function() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    const nextButton = document.getElementById('nextButton');
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
            alert('訂單已完成！');
            window.location.href = 'confirmOrder.html';
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
});


