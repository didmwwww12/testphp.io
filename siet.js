"use strict"
function scrollProducts(direction) {
    const container = document.querySelector('.product-scroll-container');
    const scrollAmount = 300; 

    if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (direction === 'right') {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}
function openOrderForm() {
    const modal = document.getElementById('orderForm');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}
function navigateToCatalog() {
    const catalogSection = document.getElementById('catalog');
    catalogSection.scrollIntoView({ behavior: 'smooth' });
}
function togglePanel() {
    const panel = document.getElementById('side-panel');
    panel.classList.toggle('open');
}

function navigateTo(event, target) {
    event.preventDefault();
    const section = document.querySelector(target);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
    togglePanel();
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}


function filterProducts() {
    const query = document.getElementById('search').value.toLowerCase();
    const products = document.querySelectorAll('.product-ad');
    const productList = document.querySelector('.product-list');

    let matchedProducts = [];

    products.forEach(product => {
        const name = product.dataset.name.toLowerCase();
        if (name.includes(query)) {
            product.classList.remove('hidden');
            product.classList.add('moving');
            productList.prepend(product);
            setTimeout(() => {
                product.classList.remove('moving');
        }, 500);
        } else {
            product.classList.add('hidden');
        }
    });

    matchedProducts.forEach(product => {
        productList.prepend(product);
    });
}

function clearSearch() {
    const searchInput = document.getElementById('search');
    searchInput.value = '';
    const products = document.querySelectorAll('.product-ad');
    products.forEach(product => {
        product.classList.remove('hidden');
    });
}
function toggleExpand() {
    const scrollContainer = document.querySelector('.product-scroll-container');
    const productList = document.querySelector('.product-list');
    const expandButton = document.querySelector('.expand-button');

    scrollContainer.classList.toggle('expanded');
    productList.classList.toggle('expanded');

    if (scrollContainer.classList.contains('expanded')) {
        expandButton.textContent = 'Сховати піньяти';
    } else {
        expandButton.textContent = 'Показати всі піньяти';
    }
}
//Формы(отправка и проверка)
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"); // Укажи правильный селектор формы

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Предотвращаем стандартную отправку формы

        let formData = new FormData(form);

        try {
            let response = await fetch("sendmail.php", {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });
        
            let text = await response.text(); // Получаем сырой ответ сервера
            console.log("Ответ от сервера:", text); 
        
            let result = JSON.parse(text); // Преобразуем в JSON
        
            if (result.status === "success") {
                alert("Форма успешно отправлена!");
                form.reset();
            } else {
                alert("Ошибка: " + result.message);
            }
        } catch (error) {
            console.error("Ошибка при отправке:", error);
            alert("Ошибка соединения!");
        }
    });
});
    function formValidate(form)
    {
        let error = 0;
        let formReq = document.querySelectorAll('._req');
        for(let index = 0;index < formReq.length;index++){
            const input = formReq[index];
            formRemoveError(input);
            //Реализовуем проверку емаила
            if(input.classList.contains('_email')){
                if (emailTest(input)){
                    formAddError(input);
                    error++;
                }
            }else if(input.getAttribute("type") === "checkbox" && input.checked === false){
                formAddError(input);
                error++;
            }else {
                if(input.value === ''){
                    formAddError(input);
                    error++;   
                }
            }
        }
        return error;
    //функция добавления ошибки
    function formAddError(input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    //функция удаления ошибки
    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    //проверка емаил текста
    function emailTest(input){
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
    }
}