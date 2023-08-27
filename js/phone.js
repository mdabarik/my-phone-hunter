
const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones, isShowAll);
}

const displayPhone = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = "";

    // display show all button if there are more than 12 phones
    if (phones.length > 12 && !isShowAll) {
        document.getElementById('show-all-container').classList.remove('hidden');
    } else {
        document.getElementById('show-all-container').classList.add('hidden');
    }

    if (!isShowAll) {
        // display first 12 phones
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card w-96 bg-grey-100 shadow-xl p-4';
        phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>${"a"}</p>
                <div class="card-actions justify-center">
                    <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary w-full">Show Details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner
    toogleLoadingSpinner(false);
}

// handle search button
const handleSearch = (isShowAll) => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value.trim();
    loadPhone(searchText, isShowAll)
}


const handleSearch2 = () => {
    // document.getElementById('spinner').classList.remove('hidden');
    toogleLoadingSpinner(true);
    const searchField = document.getElementById('search-field2');
    const searchText = searchField.value.trim();
    loadPhone(searchText);
}

const toogleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true);
}

// 
const handleShowDetail = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data.data);
}