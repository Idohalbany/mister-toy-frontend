import { httpService } from './http.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  query,
  getById,
  remove,
  update,
  changeScore,
  getEmptyCredentials,
}

window.userService = userService

function query() {
  // return storageService.query('user')
  return httpService.get(`user`)
}

async function getById(userId) {
  try {
    // const user = await storageService.get('user', userId)
    return await httpService.get(`user/${userId}`)
  } catch (err) {
    console.log('Error while getting user:', userId, err)
  }
}
function remove(userId) {
  // return storageService.remove('user', userId)
  return httpService.delete(`user/${userId}`)
}

async function update(user) {
  // await storageService.put('user', user)
  user = await httpService.put(`user/${user._id}`, user)
  if (getLoggedinUser()._id === user._id) saveLocalUser(user)
  return user
}

async function login(userCred) {
  // const users = await storageService.query('user')
  // const user = users.find(user => user.username === userCred.username)
  const user = await httpService.post('auth/login', userCred)
  if (user) {
    return saveLocalUser(user)
  }
}

async function signup(userCred) {
  userCred.score = 10000
  if (!userCred.imgUrl)
    userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
  const user = await httpService.post('auth/signup', userCred)
  return saveLocalUser(user)
}
async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  return await httpService.post('auth/logout')
}

async function changeScore(by) {
  const user = getLoggedinUser()
  if (!user) throw new Error('Not loggedin')
  user.score = user.score + by || by
  await update(user)
  return user.score
}

function saveLocalUser(user) {
  console.log(user)
  user = {
    _id: user._id,
    fullname: user.fullname,
    isAdmin: user.isAdmin,
    imgUrl: user.imgUrl,
    score: user.score,
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyCredentials() {
  return {
    fullname: 'Ido Halbany',
    username: 'Ido',
    password: 1234,
    score: 10000,
    isAdmin: false,
  }
}