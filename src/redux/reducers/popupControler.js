const initialState = {
    selectedWindow: 'placeholder'
}

const popupControler = (state = initialState, action) => {
    if (action.type === 'contactsInformation') {
        return {
            ...state,
            selectedWindow: 'contactsInformation'
        }
    }

    return state
}

export default popupControler;