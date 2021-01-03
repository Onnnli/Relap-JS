export function isValidPass(value){
    return value.length >= 6
};


export function isValidEmail(value){
    const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const valid = new RegExp(mailFormat).test(value)
    return valid
}

// YUP
// JOI 