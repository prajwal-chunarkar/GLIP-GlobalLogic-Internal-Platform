export default function validationRegister(user,confirmPass){
    const { fname, mname, lname, email, phone, address, gender, dob, password } = user;

    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const regexPhone = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    const regexDob = /^((0[1-9])|(1[0-2]))\/(\d{4})$/
    
    if(!fname){
        return 'First Name is Required *'
    }

    if(!lname){
        return 'Last Name is Required *'
    }

    if(!email){
        return 'Email is Required*'
    } else if (!email.match(regexEmail)){
        return 'Email is Invalid'
    }

    if(!phone){
        return 'Phone Number is Required*'
    } else if (!phone.match(regexPhone)){
        return 'Phone is Invalid'
    }

    if(!address){
        return 'Address Number is Required*'
    }

    if(!gender){
        return 'Gender is Required'
    } else if(gender !== "male" && gender !== "female"){
        return 'Please enter valide gender'
    }

    if(!dob){
        return 'Date of Birth is Required *'
    }  else if (!dob.match(regexDob)){
        return 'Date of Birth is Invalid'
    }

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