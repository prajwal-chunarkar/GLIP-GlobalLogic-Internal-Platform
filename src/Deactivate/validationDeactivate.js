export default function validationDeactivate(email, password){
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if(!email){
        return 'Email is Required*'
    } else if (!email.match(regexEmail)){
        return 'Email is Invalid'
    }

    if(!password){
        return 'Password is Required *'
    } 

    return null;
}