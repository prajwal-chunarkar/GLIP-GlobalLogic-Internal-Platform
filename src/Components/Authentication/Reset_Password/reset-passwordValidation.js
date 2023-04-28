export default function validationResetPass(user){
    const { password, confirmPass } = user;

    if(!password){
        return 'Password is Required *'
    } else if(password.length <= 5) {
        return 'Password must be more than 5 Character'
    }

    if(!confirmPass){
        return 'Password is Required *'
    }else if(password !== confirmPass){
        return 'Password do not match'
    }

    return null;
}