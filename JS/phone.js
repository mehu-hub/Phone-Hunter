const loadPhones = async (serachText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${serachText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data)
}

const displayPhones = phones => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerText = '';
    phones = phones.slice(0, 5)

    //display no phone found
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('display-none')
    }
    else{
        noPhone.classList.add('display-none')
    }

    // display all phone
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('single-phone')
        phoneDiv.innerHTML = `
        <img class="w-2/4" src="${phone.image}">
        <p class="font-bold  text-2xl text-gray-600">${phone.phone_name}</p>
        <p class="font-semibold text-center text-sm">${phone.slug}</p>
     `
        phonesContainer.appendChild(phoneDiv);
    })
}

document.getElementById('btn-search').addEventListener('click', function () {
    const searchField = document.getElementById('search-field');
    const serachText = searchField.value;
    loadPhones(serachText)

})

// loadPhones()