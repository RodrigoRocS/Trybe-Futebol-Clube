const validUser = {
    email: 'user@user.com',
    password: 'secret_user'
}

const userNoEmail = {
    password: 'secret_user'
}

const userNoPsw = {
    email: 'user@user.com'
}

const tokenValid = {
    token: 'abc123'
}

const noExistentEmail = 'null@null.com';

export default {validUser, userNoEmail, userNoPsw, tokenValid, noExistentEmail}