const url = 'https://demo.sibers.com/users';
const method = 'GET';

const optionsArray = ['id', 'name', 'phone', 'username', 'email', 'avatar', 'website', { 'address': ['country', 'city', 'streetA'] }]; // list of data that i want to receive 

const contactsLeftColumn = document.querySelector('.contacts__left-column');
const contactsWrapper = document.querySelector('.contacts__left-column-wrapper');
const inputSearch = document.querySelector('.contacts__actions-search');
const sortButtonAsc = document.querySelector('.contacts__actions-asc');
const sortButtonDesc = document.querySelector('.contacts__actions-desc');

const contactsRightColumn = document.querySelector('.contacts__right-column');
const contactsTop = document.querySelector('.contacts__right-column-top');
const topImage = document.querySelector('.top__information-image');
const topImageBg = document.querySelector('.top__bg-image');
const topName = document.querySelector('.top__information-name');
const contactsContent = document.querySelector('.contacts__right-column-content');
const mainInformation = document.querySelector('.main-information');
const contactsInformation = document.querySelector('.contacts__right-column-information');
const contactsInformationWrapper = document.querySelector('.contacts__right-column-information-wrapper');
const contactsChange = document.querySelector('.contacts__right-column-change-information-wrapper');
const changeForm = document.querySelector('.change__form');
;
const buttonTopChange = document.querySelector('.top__change');
const buttonTopClose = document.querySelector('.top__close');
const changeButtons = document.querySelector('.change_buttons');
const topInformationButtons = document.querySelector('.top__information-buttons');

const loading = document.querySelector('.loading__section');
const error = document.querySelector('.error__section');

setAdaptiveClass();
window.addEventListener('resize', () => { // checking screen resizing
    setAdaptiveClass();
})

setLocalStorage()
    .then(data => { //If localstorage exist then draw contacts and hiding loading animation
        drawContact(Object.keys(JSON.parse(data)).length, JSON.parse(localStorage.getItem('sibersServersData')));
        loading.classList.add('hidden');
    })
    .then(data => { //After drawing contacts, I start sorting, searching and tracking functions
        sorting();
        groupingByWord();
        buttonSortAsc();
        buttonSortDesc();
        search();
        contactsTrackingClick();
        topTrackingClick();
        chageButtonsTrackingClick();
    })
    .catch(function () { //If localstorage doesn't exist and the server response is an error, show the error message.
        error.classList.remove('hidden');
        loading.classList.add('hidden');
    })

function setLocalStorage() { // Getting server response and set localstorage
    return new Promise((resolve, reject) => {
        if (localStorage.getItem('sibersServersData') === null) {
            const sibersAjaxRequest = new AjaxRequest(method, url);
            const sibersServersResponse = sibersAjaxRequest.getServerResponse();

            sibersServersResponse
                .then(data => {
                    localStorage.setItem('sibersServersData', JSON.stringify(sortingServerResponse(JSON.parse(data), optionsArray)));
                    resolve(localStorage.getItem('sibersServersData'));
                })
                .catch(() => {
                    reject(console.log('Something went wrong'));
                })
        } else {
            resolve(localStorage.getItem('sibersServersData'))
        }
    })
}

function sortingServerResponse(obj, options) { //sorting the server response with the options i provided 
    const users = new Object();
    let values = new Object();

    for (let i = 0; i < obj.length; i++) { //cycle for objects index
        for (let j = 0; j < options.length; j++) { //cycle for objects values
            if (typeof options[j] == "object") { //if item of options is an object, make it a list and take value
                values[Object.keys(options[j])] = (objUnfold(obj[i][Object.keys(options[j])], options[j][Object.keys(options[j])]))
            } else {
                values[options[j]] = Object.getOwnPropertyDescriptor(obj[i], options[j]).value; // take value
            }
        }
        users[i] = values; //create array of objects
        values = new Object(); //nullify values for next iteration
    }

    function objUnfold(obj, options) { //expand the object and take the value 
        let values = new Object();

        for (let i = 0; i < options.length; i++) {
            values[options[i]] = Object.getOwnPropertyDescriptor(obj, options[i]).value;
        }

        return values;
    }

    return users;
}

function drawContact(amount, usersInfo) {
    for (let i = 0; i < Number(amount); i++) {
        // let imageUrl = usersInfo[i]['avatar']; //Your avatar url is not valid, so i commented it. If u not afraid of two hundred and forty errors in your console, uncomment this.

        // const imageAjaxRequest = new AjaxRequest(method, imageUrl);
        // const imageStatusResponse = imageAjaxRequest.getServerResponse();

        let contactsItem = createNewElement('div', 'contacts__left-column-item');
        let contactsAvatar = createNewElement('div', 'contacts__left-column-avatar');
        let contactsAvatarImage = createNewElement('img', 'contacts__left-column-image');
        let contactsInformation = createNewElement('div', 'contacts__left-column-information');
        let contactsInformationNumber = createNewElement('p', 'contacts__left-column-number');
        let contactsInformationName = createNewElement('p', 'contacts__left-column-name');

        // imageStatusResponse
        //     .then(data => {
        //         contactsAvatarImage.setAttribute('src', imageUrl);
        //         contactsItem.setAttribute('data-image', imageUrl);
        //     })
        //     .catch(data => {
        //         contactsAvatarImage.setAttribute('src', './src/assets/icons/default-user.svg');
        //         contactsItem.setAttribute('data-image', './src/assets/icons/default-user.svg');
        //     });

        contactsAvatarImage.setAttribute('src', './src/assets/icons/default-user.svg'); //and comment this
        contactsAvatar.append(contactsAvatarImage)

        contactsInformationNumber.textContent = usersInfo[i]['phone'];
        contactsInformationName.textContent = usersInfo[i]['name'];
        contactsInformation.append(contactsInformationNumber);
        contactsInformation.append(contactsInformationName);

        contactsItem.setAttribute('data-id', usersInfo[i]['id']);
        contactsItem.setAttribute('data-phone', usersInfo[i]['phone']);
        contactsItem.setAttribute('data-name', usersInfo[i]['name']);
        contactsItem.setAttribute('data-image', './src/assets/icons/default-user.svg'); // and this
        contactsItem.setAttribute('title', usersInfo[i]['name']);
        contactsItem.append(contactsAvatar);
        contactsItem.append(contactsInformation);

        contactsWrapper.append(contactsItem);
    }
}

function drawContactsMoreInfo(dataId, dataImage = '') { // When the user clicks on a contact, this function displays more information about the contact.
    const options = recursionObject(JSON.parse(localStorage.getItem('sibersServersData'))[dataId]);
    mainInformation.setAttribute('data-id', dataId);

    for (let i = 0; i < options.length; i++) {
        let mainInformationItem = createNewElement('div', 'main-information__item');
        let mainInformationLeftSide = createNewElement('div', 'main-information__item-left-side');
        let mainInformationDescription = createNewElement('p', 'main-information__item-description');
        let mainInformationRightSide = createNewElement('div', 'main-information__item-right-side');
        let mainInformationText = createNewElement('p', 'main-information__item-text');

        //In order not to display information about name, avatar url and id, i used the check

        if (options[i][0] == 'name') {
            topName.textContent = options[i][1];
            topName.setAttribute('title', options[i][1]);
        } else if (options[i][0] == 'avatar') {
            topImage.setAttribute('src', dataImage);
            topImageBg.setAttribute('src', dataImage);
        } else if (options[i][0] !== 'id') {
            mainInformationDescription.textContent = `${options[i][0]}:`;
            mainInformationDescription.setAttribute('title', options[i][0])
            mainInformationText.textContent = options[i][1];
            mainInformationText.setAttribute('title', options[i][1])

            mainInformationLeftSide.append(mainInformationText);
            mainInformationRightSide.append(mainInformationDescription);

            mainInformationItem.append(mainInformationRightSide);
            mainInformationItem.append(mainInformationLeftSide);

            mainInformation.append(mainInformationItem);
        }
    }
}

function drawFormInputs(dataId) { //When the user clicks on change button, this function duplicate the information and set it changeable
    const options = recursionObject(JSON.parse(localStorage.getItem('sibersServersData'))[dataId]);
    for (let i = 0; i < options.length; i++) {
        let formItem = createNewElement('div', 'change__form-item');
        let formLeftSide = createNewElement('div', 'change__form-left-side');
        let formDescription = createNewElement('p', 'change__form-description');
        let formRightSide = createNewElement('div', 'change__form-right-side');
        let formInput = createNewElement('input', 'change__form-input');

        if (options[i][0] !== 'id') {
            formDescription.textContent = `${options[i][0]}:`;
            formInput.setAttribute('value', options[i][1]);
            formInput.setAttribute('data-description', options[i][0])

            formLeftSide.append(formDescription);
            formRightSide.append(formInput);

            formItem.append(formLeftSide);
            formItem.append(formRightSide);

            changeForm.append(formItem);
        }
    }
}

function createNewElement(tag, className = '') { //function for creating new elements with class name
    let createElement = document.createElement(tag);

    createElement.classList.add(className);
    return createElement;
}

function contactsTrackingClick() { //Event listener for contacts
    contactsWrapper.addEventListener('click', elem => {

        if (elem.target.hasAttribute('data-id')) {


            if (elem.target.getAttribute('data-id') == mainInformation.getAttribute('data-id') && !contactsInformation.classList.contains('hidden')) {
                openContactsMoreInfo();
            } else {
                openContactsMoreInfo();
                modalWindowsClose(contactsContent, contactsChange);
                modalWindowsOn(contactsInformation, contactsInformationWrapper);
                elem.target.lastChild.classList.add('contacts__left-column-information_active');
            }
        }
        drawContactsMoreInfo(elem.target.getAttribute('data-id'), elem.target.getAttribute('data-image'));
    })
}

function topTrackingClick() { //Event listener for buttons on more information frame
    contactsTop.addEventListener('click', elem => {
        if (elem.target == buttonTopChange || elem.target.classList.contains('top__information-change')) { //for change button
            removeAllChilds(changeForm);
            modalWindowsClose(contactsInformationWrapper, contactsContent);
            modalWindowsOn(contactsInformation, contactsChange);
            drawFormInputs(mainInformation.getAttribute('data-id'));
        } else if (elem.target == buttonTopClose || elem.target.classList.contains('top__information-close')) { //for close button
            closeContactsMoreInfo();
        }
    })
}

function chageButtonsTrackingClick() { //Event listener for submit or change buttons
    changeButtons.addEventListener('click', elem => {
        let valuesObject = { 'id': +mainInformation.getAttribute('data-id') }; //creating object for replaceing change data on localstorage
        let inputs = document.querySelectorAll('.change__form-input');
        let localData = JSON.parse(localStorage.getItem('sibersServersData'));
        if (elem.target.classList.contains('change_submit')) {
            inputs.forEach(item => {
                valuesObject[item.dataset.description] = item.value //filling the object
            })
            localData[mainInformation.getAttribute('data-id')] = valuesObject;
            localStorage.setItem('sibersServersData', JSON.stringify(localData));
            window.location.reload();
        } else if (elem.target.classList.contains('change_close')) {
            modalWindowsClose(contactsChange)
            modalWindowsOn(contactsInformationWrapper)
        }
    })
}

function openContactsMoreInfo() { //function to show more info about contact
    let screenWidth = window.screen.width;
    const contactsLeftColumnInformation = document.querySelectorAll('.contacts__left-column-information');
    contactsLeftColumnInformation.forEach(elem => elem.classList.remove('contacts__left-column-information_active'));

    if (screenWidth < 1000) { //mobile screen check 
        modalWindowsClose(contactsLeftColumn, contactsContent, contactsChange);
        modalWindowsOn(contactsRightColumn);

        removeAllChilds(mainInformation);
    } else {
        modalWindowsClose(contactsInformation, contactsInformationWrapper, contactsChange);
        modalWindowsOn(contactsContent);

        removeAllChilds(mainInformation);
    }
}

function closeContactsMoreInfo() { // function for hiding more info about the contact
    let screenWidth = window.screen.width;
    const contactsLeftColumnInformation = document.querySelectorAll('.contacts__left-column-information');
    contactsLeftColumnInformation.forEach(elem => elem.classList.remove('contacts__left-column-information_active'));

    if (screenWidth < 1000) { //mobile screen check 
        modalWindowsClose(contactsRightColumn, contactsContent, contactsChange);
        modalWindowsOn(contactsLeftColumn);

        removeAllChilds(mainInformation);
    } else {
        modalWindowsClose(contactsInformation, contactsInformationWrapper, contactsChange);
        modalWindowsOn(contactsContent);

        removeAllChilds(mainInformation);
    }
}

function removeAllChilds(element) { //removing all content in element
    if (element.childNodes.length > 0) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}

function search() {
    let contactsItem = document.querySelectorAll('.contacts__left-column-item');

    inputSearch.addEventListener('input', () => {
        removeAllChilds(contactsWrapper);

        contactsItem.forEach(item => {
            contactsWrapper.append(item)

            if ((item.dataset.name.substring(0, inputSearch.value.length)).toLowerCase() == (inputSearch.value).toLowerCase() || (item.dataset.phone.substring(0, inputSearch.value.length)).toLowerCase() == (inputSearch.value).toLowerCase()) { //Checking if the name or phone number equalse what is entered in the search
                item.classList.remove('hidden');
            } else if (inputSearch.value == '') {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        })
    })

    inputSearch.addEventListener('blur', () => { //Clearing from check 
        if (inputSearch.value == '') {
            groupingByWord();
        }
    })
}

function buttonSortAsc() { //Event listener on button
    sortButtonAsc.addEventListener('click', () => {
        sortingLetterGroup('asc');
    })
}

function buttonSortDesc() {
    sortButtonDesc.addEventListener('click', () => {
        sortingLetterGroup('desc');
    });
}

function sorting() { //Sorts contacts by alphabetically
    let elementsArray = [...contactsWrapper.children];

    let sorted = elementsArray.sort((a, b) => {
        if (a.dataset.name[0] > b.dataset.name[0]) {
            return 1;
        } else if (a.dataset.name[0] < b.dataset.name[0]) {
            return -1;
        } else {
            return 0;
        }
    })

    removeAllChilds(contactsWrapper);

    sorted.forEach(elem => contactsWrapper.appendChild(elem));
}

function groupingByWord() { //Grouping by the first word of name or second name
    let contactsItem = document.querySelectorAll('.contacts__left-column-item');
    let elementsArray = Object.assign(contactsItem, []);
    removeAllChilds(contactsWrapper);

    let currentWord = '';
    elementsArray.forEach(item => {
        const groupingLetter = createNewElement('div', 'contacts__left-column-grouping-letter');
        const groupingTitle = createNewElement('h3', 'contacts__left-column-grouping-letter-title');
        if (item.dataset.name[0] !== currentWord) {
            currentWord = item.dataset.name[0]
            groupingTitle.textContent = currentWord;

            groupingLetter.append(groupingTitle);
            groupingLetter.setAttribute('data-word', currentWord);

            contactsWrapper.append(groupingLetter);
        }
    })

    let groupingLetters = document.querySelectorAll('.contacts__left-column-grouping-letter');
    groupingLetters.forEach(elem => {
        elementsArray.forEach(item => {
            if (elem.dataset.word == item.dataset.name[0]) {
                elem.append(item);
            }
        })
    })
}

function sortingLetterGroup(direction) { //sorting contacts by direction 'asc' or 'desc'
    let elementsArray = [...contactsWrapper.children];

    let sorted = elementsArray.sort((a, b) => sortDirection(a, b, direction))

    removeAllChilds(contactsWrapper);

    sorted.forEach(elem => contactsWrapper.appendChild(elem));

    function sortDirection(item1, item2, direction) {
        if (direction == 'asc') {
            if (item1.dataset.word > item2.dataset.word) {
                return 1;
            } else if (item1.dataset.word < item2.dataset.word) {
                return -1;
            } else {
                return 0;
            }
        } else {
            if (item1.dataset.word > item2.dataset.word) {
                return -1;
            } else if (item1.dataset.word < item2.dataset.word) {
                return 1;
            } else {
                return 0;
            }
        }
    }
}

function modalWindowsOn(...modals) { //show frames
    modals.map(modal => {
        modal.classList.remove('hidden');
    })
}

function modalWindowsClose(...modals) {//hiding frames
    modals.map(modal => {
        modal.classList.add('hidden');
    })
}

function setAdaptiveClass() {
    let screenWidth = window.screen.width;

    if (screenWidth < 1000) {
        modalWindowsClose(contactsRightColumn, buttonTopChange, buttonTopClose);
        modalWindowsOn(topInformationButtons);
    } else {
        modalWindowsOn(contactsRightColumn, contactsContent, buttonTopChange, buttonTopClose);
        modalWindowsClose(topInformationButtons, contactsInformation, contactsChange);
    }
}

function recursionObject(obj, resultArray = []) {
    obj = Object.entries(obj);
    for (let i = 0; i < obj.length; i++) {
        if (typeof obj[i][1] == 'object') {
            recursionObject(obj[i][1], resultArray)
        } else {
            resultArray.push(obj[i]);
        }
    }
    return resultArray
}