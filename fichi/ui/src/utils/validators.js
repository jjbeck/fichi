const stringPattern = /[a-z,A-Z]/;
const emailPattern = /^\S+@\S+\.\S+$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

class ValidationResponse{
    constructor(msg, isValid){
        this.msg = "ok";
        this.isValid =true;
    }
}

export function validateString(test) {
    const rs = new ValidationResponse();
    if(stringPattern.test(test)) {
        return rs;
    }
    rs.msg = "Should only contain letters";
    rs.isValid = false;
    return rs;
}

export function validateEmail(test) {
    const rs = new ValidationResponse();
    if(emailPattern.test(test)) {
        return rs;
    }
    rs.msg = "Invalid Email";
    rs.isValid = false;
    return rs;
}

export function validatePassword(test) {
    const rs = new ValidationResponse();
    if(passwordPattern.test(test)) {
        return rs;
    }
    rs.msg = "Invalid Password";
    rs.isValid = false;
    return rs;
}


