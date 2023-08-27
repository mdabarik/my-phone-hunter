
const loadPhone = async (searchText='13', isShowAll) => {
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
                    <button onclick="handleShowDetail('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary w-full">Show Details</button>
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
    const phone = data.data;
    showPhoneDetails(phone);
}


const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt="Image" />
        <p><span>Storage: ${phone?.mainFeatures?.storage}</span></p>
        <p>Display: ${phone?.mainFeatures?.displaySize}</p>
    `;

    // show the modal
    show_details_modal.showModal();
}

loadPhone();