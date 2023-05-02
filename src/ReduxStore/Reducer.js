export const Reducer = (state = {
    isloggedin: localStorage.token ? true : false,
    currUser: {},
    initials: ''
    
}, action) => {
    switch (action.type) {
        case "LOGIN": {
            state = { ...state }              //flow right to left
            state.isloggedin = true
            return state
        }
        case "CURRENT_USER": {
            state = { ...state }              //flow right to left
            state.currUser = action.payload
            return state
        }
        case "NAME_INITIALS": {
            state = { ...state }              //flow right to left
            state.initials = action.payload
            return state
        }
        default: return state
    }
};

export default Reducer