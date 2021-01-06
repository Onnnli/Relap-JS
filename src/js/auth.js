import {сlickToRegister} from './helperForAuth'

import {mailValidationCheck} from './helperForAuth'
import {registrationForm} from './helperForAuth'
import {registrationSubmit} from './helperForAuth'
import {mailRegistration} from './helperForAuth'
import {passRegistration} from './helperForAuth'

import {passwordValidationCheck} from './helperForAuth'
import {passwRegistrationCheck} from './helperForAuth'

import {comparisonOfPasswords} from './helperForAuth'
import {registerNow} from './helperForAuth'
import {singUp} from './helperForAuth'
import {authWithEmail} from './helperForAuth'
import {checkToken} from './helperForAuth'
import {content} from './helperForAuth'


const registrationButton = document.querySelector('.reg');


registrationButton.addEventListener('click', сlickToRegister)

registrationForm.addEventListener('submit', singUp); 
registrationSubmit.disabled = true;

mailRegistration.addEventListener('input', mailValidationCheck);

passRegistration.addEventListener('input', passwordValidationCheck);

passwRegistrationCheck.addEventListener('input', comparisonOfPasswords);
    
registrationSubmit.addEventListener('click', registerNow);

let authorizationForm = document.querySelector('#auth'); //добавляем форму
authorizationForm.addEventListener('submit', authWithEmail);

window.onload = function() {
    if(checkToken()){
        content()
    }
}
