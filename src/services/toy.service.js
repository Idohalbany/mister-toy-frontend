import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'toy/'

const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
  'Battery Powered',
]

// _createToys()

export const toyService = {
  query,
  get,
  remove,
  save,
  getEmptyToy,
  getDefaultFilter,
  getDefaultSort,
  getRandomToy,
  getLabels,
}

function query(filterBy = {}) {
  return httpService.get(BASE_URL, filterBy)
}

function get(toyId) {
  return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
  if (toy._id) {
    return httpService.put(BASE_URL, toy)
  } else {
    return httpService.post(BASE_URL, toy)
  }
}

function getEmptyToy() {
  return { name: '', price: '', labels: [], createdAt: null }
}

function getDefaultFilter() {
  return { name: '', inStock: null, labels: [] }
}

function getRandomToy() {
  const toy = getEmptyToy()
  toy.name = 'Random ' + utilService.getRandomIntInclusive(4000, 8000)
  toy.price = utilService.getRandomIntInclusive(1, 500)
  toy.labels = _getRandomLabels()
  toy.createdAt = Date.now()
  toy.inStock = utilService.getRandomIntInclusive(1, 4) >= 2 ? true : false
  return toy
}

function _getRandomLabels() {
  const selectedLabels = []
  const labelsCopy = [...labels]
  for (let i = 0; i < 3; i++) {
    const randomIndex = utilService.getRandomIntInclusive(0, labelsCopy.length - 1)
    const [selectedLabel] = labelsCopy.splice(randomIndex, 1)
    selectedLabels.push(selectedLabel)
  }

  return selectedLabels
}

function getDefaultSort() {
  return { sortBy: '' }
}

function getLabels() {
  return ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
}
