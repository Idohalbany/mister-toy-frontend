import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { toyService } from '../services/toy.service.js'
import { utilService } from '../services/util.service.js'
import { loadToys, removeToy, saveToy } from '../store/actions/toy.action.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
  const debouncedLoadToys = utilService.debounce(loadToys, 500)

  useEffect(() => {
    loadToys().catch((err) => {
      showErrorMsg('Cannot load toys')
    })
  }, [])

  function onAddToy() {
    const toyToSave = toyService.getRandomToy()
    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy added (id: ${savedToy._id})`)
      })
      .catch((err) => {
        showErrorMsg('Cannot add toy', err)
      })
  }

  function onEditToy(toy) {
    const price = +prompt('New price?')
    const toyToSave = { ...toy, price }

    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
      })
      .catch((err) => {
        showErrorMsg('Cannot update toy', err)
      })
  }

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => {
        showSuccessMsg('Toy removed')
      })
      .catch((err) => {
        showErrorMsg('Cannot remove toy', err)
      })
  }

  function setFilter(filterBy) {
    debouncedLoadToys(filterBy)
  }

  return (
    <div className='toys-app'>
      <h3>Toys App</h3>
      <main className='toys-app-content'>
        <button className='add-toy-btn' onClick={onAddToy}>
          Add
        </button>
        <ToyFilter onSetFilter={setFilter} />
        {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} onEditToy={onEditToy} />}
      </main>

      {isLoading && <div>Loading...</div>}
    </div>
  )
}
