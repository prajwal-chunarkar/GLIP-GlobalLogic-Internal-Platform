export default function validationRegister(user){
    const { fname, lname, email, phone, workLocation, address, gender, dob, password, confirmPass } = user;

    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const regexPhone = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    const regexDob = /^((0[1-9])|(1[0-2]))\/(\d{4})$/

    //Designation validation Logic
    // const positions = ['Intern','Associate Software Engineer','Software Engineer','Senior Software Engineer','Manager','HR','Payroll Emp', 'Transport Emp']
    // var isdesignation = false;
    // positions.forEach((pos)=> {
    //     if(pos === designation){
    //         isdesignation = true;
    //         return;
    //     }
    // })

    //Work Location Logic
    const locations = ['Nagpur','Noida','Pune','Hyderabad','Banglore']
    var islocation = false;
    locations.forEach((loc)=> {
        if(loc === workLocation){
            islocation = true;
            return;
        }
    })

    if(!fname && !lname && !email && !phone && !address && !gender && !dob && !password && !confirmPass){
        return 'Enter All Mandatory Details*'
    }
    
    if(!fname){
        return 'First Name is Required*'
    }

    if(!lname){
        return 'Last Name is Required*'
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

    
    if(!workLocation){
        return 'Work Location is Required *'
    }  else if (islocation === false){
        return 'Work Location is Invalid'
    }

    if(!address){
        return 'Address is Required*'
    }

    if(!gender){
        return 'Gender is Required'
    }

    if(!dob){
        return 'Date of Birth is Required *'
    }  else if (!dob.match(regexDob)){
        return 'Date of Birth is Invalid'
    }

    if(!designation){
        return 'Designation is Required *'
    }  else if (isdesignation === false){
        return 'Designation is Invalid'
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