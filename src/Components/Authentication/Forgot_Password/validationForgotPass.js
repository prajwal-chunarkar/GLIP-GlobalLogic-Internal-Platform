export default function validationForgotPass(user){
    const { email,password, confirmPass } = user;

    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if(!email){
        return 'Email is Required*'
    } else if (!email.match(regexEmail)){
        return 'Email is Invalid'
    }

    if(!password){
        return 'Password is Required*'
    } else if(password.length <= 5) {
        return 'Password must be more than 5 Character'
    }

    if(!confirmPass){
        return 'Password is Required*'
    }else if(password !== confirmPass){
        return 'Password do not match'
    }

    return null;
}