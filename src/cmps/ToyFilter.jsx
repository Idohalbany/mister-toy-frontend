import { useState, useEffect } from 'react'
import { toyService } from '../services/toy.service.js'
import Select from 'react-select'
import * as Yup from 'yup'

const ToyFilterSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
})

export function ToyFilter({ onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(
    toyService.getDefaultFilter(),
    toyService.getDefaultSort()
  )
  const [selectedLabel, setSelectedLabel] = useState([])
  const [nameError, setNameError] = useState('')
  const [nameInput, setNameInput] = useState('')

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    const value = target.value

    if (field === 'name') {
      setNameInput(value)

      if (value === '') {
        setNameError('')
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
      } else {
        ToyFilterSchema.validate({ name: value })
          .then(() => {
            setNameError('')
            setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
          })
          .catch((err) => {
            setNameError(err.message)
          })
      }
    } else {
      setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }
  }

  function handleClick({ target }) {
    const field = target.name
    const value = target.checked
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function handleLabelSelect(selectedOptions) {
    setSelectedLabel(selectedOptions)
    const labels = selectedOptions.map((option) => option.value)
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels }))
  }

  const options = [
    { value: 'On wheels', label: 'On wheels' },
    { value: 'Box game', label: 'Box game' },
    { value: 'Art', label: 'Art' },
    { value: 'Baby', label: 'Baby' },
    { value: 'Doll', label: 'Doll' },
    { value: 'Puzzle', label: 'Puzzle' },
    { value: 'Outdoor', label: 'Outdoor' },
    { value: 'Battary Powered', label: 'Battary Powered' },
  ]

  return (
    <section className='toy-filter full main-layout'>
      <form className='main-toy-form'>
        <label htmlFor='name'></label>
        <input
          type='text'
          className='filter-txt'
          id='name'
          name='name'
          placeholder='Search toy by name...'
          value={nameInput}
          onChange={handleChange}
        />
        {nameError && <p className='error'>{nameError}</p>}

        <br />
        <Select
          name='labels'
          options={options}
          value={selectedLabel}
          isMulti
          onChange={handleLabelSelect}
        />
        <br />
        <input type='checkbox' name='inStock' id='inStock' onChange={handleClick} />
        <label htmlFor='inStock'>Show only in stock</label>
        <select name='sortBy' onChange={handleChange}>
          <option value=''>Sort by</option>
          <option value='name'>Name</option>
          <option value='price'>Price</option>
          <option value='createdAt'>Created At</option>
        </select>
      </form>
    </section>
  )
}
