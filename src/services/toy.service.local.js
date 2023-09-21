import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

// const pageSize = 5
const TOY_KEY = 'toyDB'
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
_createToys()

export const toyService = {
  query,
  get,
  remove,
  save,
  getEmptyToy,
  getDefaultFilter,
  getDefaultSort,
  getRandomToy,
}

// add filterby, sortby after! filterBy = getDefaultFilter(), sortBy = getDefaultSort()

function query(filterBy = getDefaultFilter()) {
  return storageService.query(TOY_KEY).then((toys) => {
    let filteredToys = toys
    if (filterBy.name) {
      const regex = new RegExp(filterBy.name, 'i')
      filteredToys = filteredToys.filter((toy) => regex.test(toy.name))
    }

    if (filterBy.labels && filterBy.labels.length > 0) {
      filteredToys = filteredToys.filter((toy) =>
        filterBy.labels.every((label) => toy.labels.includes(label))
      )
    }

    if (filterBy.inStock) {
      filteredToys = filteredToys.filter((toy) => toy.inStock)
    }

    return Promise.resolve(filteredToys)
  })
}

function get(toyId) {
  return storageService.get(TOY_KEY, toyId)
}

function remove(toyId) {
  return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    return storageService.put(TOY_KEY, toy)
  } else {
    return storageService.post(TOY_KEY, toy)
  }
}

function _createToys() {
  let toys = utilService.loadFromStorage(TOY_KEY)
  if (!toys || !toys.length) {
    toys = []
    toys.push(_createToy('toy1'))
    toys.push(_createToy('toy2'))
    toys.push(_createToy('toy3'))
    utilService.saveToStorage(TOY_KEY, toys)
  }
}

function _createToy(name) {
  const toy = getRandomToy()
  toy._id = utilService.makeId()
  toy.name = name
  return toy
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
  return { name: '' }
}
