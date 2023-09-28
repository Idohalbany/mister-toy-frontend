import { toyService } from '../../services/toy.service.js'
import { store } from '../store.js'
import { SET_TOYS, SET_IS_LOADING, UPDATE_TOY, ADD_TOY, REMOVE_TOY } from '../reducers/toy.reducer'

// add filterBy after !!
export function loadToys(filterBy) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  return toyService
    .query(filterBy)
    .then((toys) => {
      store.dispatch({ type: SET_TOYS, toys })
      return toys
    })
    .catch((err) => {
      console.log('Had issues loading toys', err)
      throw err
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    })
}

export function removeToy(toyId) {
  return toyService
    .remove(toyId)
    .then(() => {
      store.dispatch({ type: REMOVE_TOY, toyId })
    })
    .catch((err) => {
      console.log('Had issues Removing toy', err)
      return Promise.reject(err)
    })
}

export function saveToy(toy) {
  console.log('saveToy called with:', toy)
  const type = toy._id ? UPDATE_TOY : ADD_TOY

  return toyService
    .save(toy)
    .then((savedToy) => {
      console.log('saveToy got toy from service:', savedToy)
      console.log('Toy saved:', savedToy)
      store.dispatch({ type, toy: savedToy })
      return savedToy
    })
    .catch((err) => {
      console.error('Cannot save toy:', err)
      return Promise.reject(err)
    })
}
