import Cookies from 'js-cookie'
import store from '../store'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function checkPermission(perm) {
  if (store.getters.permission.indexOf(perm) > -1) {
    return true
  }
  return false
}
