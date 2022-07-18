import { Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';

export namespace Validator {

    export const emailValidator = ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')])
    ];

    export const passwordValidator = ['', [
        CustomValidators.patternValidator(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*[\W_\x7B-\xFF]).{8,50}$/, { pattern: true }),
        Validators.required, Validators.minLength(8)
    ]]

    export const nameValidator = ['', [
        Validators.required,
    ]]

    export const lastname = ['', [
        Validators.required,
    ]]

    export const description = ['', [
        Validators.required,
    ]]


    export const DateOfBirth = ['', [
        Validators.required,
    ]]

    export const ConfirmPassword = ['', [
        Validators.required,
        Validators.minLength(8),
    ]]

    export const MobileNo = ['', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')

    ]]


    export const errorMessages = {
        email: [
            { type: 'required', message: 'Please Enter Email' },
            { type: 'pattern', message: 'Invalid Email' },
        ],
        password: [
            { type: 'required', message: 'Please Enter Password' },
            { type: 'pattern', message: 'Password must be alphanumeric characters' },
            { type: 'minlength', message: 'Please enter a password of at least 8 alphanumeric characters' },
        ],
        ConfirmPassword: [
            { type: 'required', message: 'Please Enter ConfirmPassword' },
            { type: 'minlength', message: 'ConfirmPassword must be a minimum of 8 characters' },
            { type: 'MustMatch', message: 'Password must match' },
        ],

        name: [
            { type: 'required', message: 'Name is required' },
        ],
        lastname: [
            { type: 'required', message: 'lastname is required' },
        ],

        description: [
            { type: 'required', message: 'Description is required' },
        ],

        phone: [
            { type: 'required', message: 'Phone Number is required' },
            { type: 'pattern', message: 'Please enter correct Phone Number' },

        ],
        DateOfBirth: [
            { type: 'required', message: 'Date of birth is required' },
        ],

    }
}