import Record from './model/Record.js'
import { mock_students, mock_classes } from './mock/index.js'
import { getStudents, getClasses } from './service/index.js'
import { gradeGenerator } from './util/grade_generator.js'
import { sortEnums } from './enum/sort_enum.js'

const dropdown = document.querySelector('.dropdown')
const classData = document.querySelector('.classData')
const tableTitle = document.querySelector('.tableTitle')
const teacher = document.querySelector('.teacher')
const sortBtns = document.querySelector('.sortBtns')
const spinner = document.querySelector('.spinner')
const dropdownContainer = document.querySelector('.dropdownContainer')

let recordsArray = []

//deconstruction to emulate Enums
const { UNORDERED, ASCENDING, DESCENDING } = sortEnums

const sortState = {
  name: UNORDERED,
  house: UNORDERED,
  grade: UNORDERED,
}

let classes = mock_classes
let students = mock_students
// Array with objects, I can use array methods to receive values from it

// Creating dropdown from classes
const createDropdownList = () => {
  for (let i = 0; i < classes.length; i++) {
    let option = document.createElement('option')
    option.setAttribute('value', classes[i].name)
    option.textContent = classes[i].name
    dropdown.append(option)
  }
}

const fillInTitleNTeacher = className => {
  tableTitle.textContent = className
  const teach = classes.find(cl => cl.name === className).teacher
  teacher.textContent = teach
}

const selectStudents = () => {
  recordsArray = []
  while (recordsArray.length < 10) {
    // creating a random number based on the length of the students, until recordsArray filled up with 10 number
    const randomIndex = Math.floor(Math.random() * students.length)
    // this returns one element that matches to one in the recordsArray, can be either 0/1
    const findSameArr = recordsArray.filter(
      student => student.name === students[randomIndex].name
    )

    if (findSameArr.length === 0) {
      recordsArray.push(students[randomIndex])
    }
  }
}

const addGradesToStudents = grades => {
  recordsArray = recordsArray.map(
    (record, i) =>
      new Record(
        record.name,
        record.house,
        record.name === 'Hermione Granger' ? 'S' : grades[i]
      )
  )
}

const changeSortDirection = type => {
  sortState[type] = sortState[type] !== ASCENDING ? ASCENDING : DESCENDING
}

const sortData = type => {
  changeSortDirection(type)

  recordsArray.sort((record, nextRecord) => {
    const comparison = record[type].localeCompare(nextRecord[type])

    return sortState[type] === ASCENDING ? comparison : -comparison
  })
}

const handleHermione = () => {
  const hermioneIndex = recordsArray.findIndex(record => record.grade === 'S')

  if (hermioneIndex > -1) {
    const hermioneRecord = recordsArray.splice(hermioneIndex, 1)

    sortState.grade === ASCENDING
      ? recordsArray.unshift(...hermioneRecord)
      : recordsArray.push(...hermioneRecord)
  }
}

const fillTable = () => {
  classData.innerHTML = ''

  recordsArray.forEach(record => {
    classData.innerHTML += `
      <tr>
        <td>${record.name}</td>
        <td>${record.house}</td>
        <td>${record.grade}</td>
      </tr>
    `
  })
}

const handleSort = btn => {
  switch (btn) {
    case 'nameSort':
      sortData('name')
      break
    case 'houseSort':
      sortData('house')
      break
    case 'gradeSort':
      sortData('grade')
      handleHermione()
      break
  }
  fillTable()
}

const handleClassSelect = async className => {
  fillInTitleNTeacher(className)
  selectStudents()
  addGradesToStudents(gradeGenerator())
  fillTable()
}

const toggleSpinner = () => {
  if (spinner.style.display === 'none') {
    spinner.style.display = 'block'
    dropdownContainer.style.display = 'none'
  } else {
    spinner.style.display = 'none'
    dropdownContainer.style.display = 'block'
  }
}

const fetchData = async () => {
  spinner.style.display = 'none'
  toggleSpinner()
  try {
    students = await getStudents().data.students
  } catch (e) {
    toggleSpinner()
    console.error(e)
  }

  try {
    classes = await getClasses().data.classes
    createDropdownList()
    toggleSpinner()
  } catch (e) {
    toggleSpinner()
    console.error(e)
  }
}

dropdown.addEventListener('change', event => {
  handleClassSelect(event.target.value)
})

sortBtns.addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON') {
    handleSort(event.target.classList[0])
  }
})

document.addEventListener('DOMContentLoaded', createDropdownList)
