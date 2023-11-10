const loadPhones = async (serachText, limitdata) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${serachText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data, limitdata)
}



const displayPhones = (phones, limitdata) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerText = '';
    const showAll = document.getElementById('show-all');
    if (limitdata && phones.length > 5) {
        phones = phones.slice(0, 5)
        showAll.classList.remove('show-all')
    }
    else {
        showAll.classList.add('show-all')
    }



    //display no phone found
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('display-none')
    }
    else {
        noPhone.classList.add('display-none')
    }
    toggleLoader(false);



    // display all phone
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('single-phone')
        phoneDiv.innerHTML = `
        <img class="w-2/4" src="${phone.image}">
        <p class="font-bold  text-2xl text-gray-600">${phone.phone_name}</p>
        <p class="font-semibold text-center text-sm">${phone.slug}</p>
        <button onclick="loadPhoneDetails('${phone.slug}'), phoneDetailModal.showModal()" class="bg-blue-600 text-white rounded py-2 px-5 mt-5">Details</button> 
     `
        phonesContainer.appendChild(phoneDiv);
        // stop loader
        toggleLoader(false);
    });
}



const processData = (limitdata) => {
    toggleLoader(true);
    const searchField = document.getElementById('search-field');
    const serachText = searchField.value;
    loadPhones(serachText, limitdata)
}



document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processData(5);
    }
})



document.getElementById('btn-search').addEventListener('click', function () {
    processData(5);
})



const toggleLoader = isLoading => {
    const loaderSpiner = document.getElementById('loader');
    if (isLoading === true) {
        loaderSpiner.classList.remove('display-none')
    }
    else {
        loaderSpiner.classList.add('display-none')
    }
}



document.getElementById('btn-show-all').addEventListener('click', function () {
    processData();
})



const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = phone => {
    console.log(phone)
    const modalTitle = document.getElementById('modal_title');
    modalTitle.innerText = phone.name;
    //--------------------------------------------------------
    const modalDescription = document.getElementById('modal_description');
    modalDescription.innerText = phone.slug;
    //--------------------------------------------------------
    const modalImg = document.getElementById('modal_img');
    modalImg.src = phone.image;
    //--------------------------------------------------------
    const phoneDetails = document.getElementById('phone_details');
    phoneDetails.innerHTML = `
        <li>1. ${phone.mainFeatures.chipSet}</li>
        <li>2. ${phone.mainFeatures.displaySize}</li>
        <li>3. ${phone.mainFeatures.memory}</li>
        <li>4. ${phone.mainFeatures.storage}</li>
    `
    const releaseDate = document.getElementById('release_date');
    releaseDate.innerText = phone.releaseDate ? phone.releaseDate : 'No Release Date found';
}

loadPhones('apple')