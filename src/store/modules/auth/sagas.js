import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '../../../services/history';
import api from '../../../services/api';

import {signInSuccess, signFailure} from './actions';

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;

        const response = yield call(api.post, '/session', {
            email,
            password,
        });

        const { token, user } = response.data;

        //Verificando se o usuario é prestador
        if(!user.provider){
            toast.error('Usuario não é um prestador!', {
                position:"top-center"
            });
            yield put(signFailure());
            return;
        }

        //setando o token como default nas chamadas API
        api.defaults.headers.Authorization = `Bearer ${token}`; 

        yield put(signInSuccess(token, user));
        
        history.push('/dashboard');
    } catch (err) {
        toast.error('Falha na autenticação, verifique os seus dados!', {
            position:"top-center"
        });
        yield put(signFailure());
    }
    
}

export function* signUp({ payload }) {
    try {
        const { name, email, password } = payload;

        yield call(api.post, '/users', {
            name,
            email,
            password,
            provider: true,
        });

        history.push('/');

    } catch (err) {
        toast.error('Falha no cadastro, verifique seus dados!', {
            position: "top-center"
        });

        yield put(signFailure());
    }
    
}

export function setToken({ payload }) {
    if(!payload) return;

    const { token } = payload.auth;

    if(token){
        api.defaults.headers.Authorization = `Bearer ${token}`; 
        //setando o token em todas as chamadas na API como default
    }
}

export function signOut() {
    history.push('/');
}

export default all([
    takeLatest('persist/REHYDRATE', setToken), //fica ouvindo a camada de persistencia
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    takeLatest('@auth/SIGN_OUT', signOut),
]);