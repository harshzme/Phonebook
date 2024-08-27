
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function isNumeric(event) {
    const keyCode = event.keyCode;
    
    if (keyCode === 8 || keyCode === 46 || (keyCode >= 37 && keyCode <= 40)) {
        return true;
    }
    
    if (keyCode >= 48 && keyCode <= 57) {
        return true;
    }
    return false;
}

function validateName() {
    const nameInput = document.getElementById('name').value;

    if (/^\d/.test(nameInput)) {
        alert('Name cannot start with a number.');
        document.getElementById('name').value = '';
    }
}

function addContact() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    if (name === '' || phone === '') {
        alert('Please enter both name and phone number.');
        return;
    }

    if (!isNumericString(phone)) {
        alert('Phone number should contain only numeric characters.');
        return;
    }

    contacts.push({ name, phone });

   
    contacts.sort((a, b) => a.name.localeCompare(b.name));

    displayContacts();
    clearInputFields();

    
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function isNumericString(str) {
    return /^\d+$/.test(str);
}

function displayContacts(contactArray = contacts) {
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';

    for (const contact of contactArray) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${contact.name}</strong>: ${contact.phone} <button onclick="deleteContact('${contact.name}')">Delete</button>`;
        contactList.appendChild(li);
    }
}

function deleteContact(name) {
    if (name === 'Emergency') {
        alert('You cannot delete the Emergency contact.');
        return;
    }

    contacts = contacts.filter(contact => contact.name !== name);
    displayContacts();

   
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function clearInputFields() {
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
}

function searchContacts() {
    const searchInput = document.getElementById('search').value.toLowerCase();

    const filteredContacts = contacts.filter(contact => {
        return contact.name.toLowerCase().includes(searchInput);
    });

    displayContacts(filteredContacts);
}



displayContacts();
