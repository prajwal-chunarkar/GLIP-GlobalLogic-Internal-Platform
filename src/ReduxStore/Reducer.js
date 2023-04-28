export const Reducer = (state = {
    isloggedin: localStorage.token ? true : false,
    nameInit: '',
    fullName: ""
}, action) => {
    switch (action.type) {
        case "LOGIN": {
            state = { ...state }              //flow right to left
            state.isloggedin = true
            return state
        }
        case "NAME_INIT": {
            state = { ...state }
            state.nameInit = action.payload
            return state
        }
        case "FULL_NAME": {
            state = { ...state }
            state.fullName = action.payload
            return state
        }
        case "USERS_LENGTH": {
            state = { ...state }
            state.usersLength = action.payload
            return state
        }
        case "EMP_ID": {
            state = { ...state }
            state.empid = action.payload
            return state
        }
        case "EMP_EMAIL": {
            state = { ...state }
            state.empEmail = action.payload
            return state
        }
        case "EMPLOYEE_LENGTH": {
            state = { ...state }
            state.employeeLength = action.payload
            return state
        }
        default: return state
    }
};

export default Reducer