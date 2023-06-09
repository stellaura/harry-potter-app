const tableBtn = document.querySelector('.choseClasses')
const dropdown = document.querySelector('.dropdown')
const classData = document.querySelector('.classData')
const tableTitle = document.querySelector('.tableTitle')
const teacher = document.querySelector('.teacher')
const sortBtns = document.querySelector('.sortBtns')

let recordsArray = []

const classes = [
  {
    class: 'Potions',
    teacher: 'Severus Snape',
  },
  {
    class: 'Transfiguration',
    teacher: 'Minerva McGonagall',
  },
  {
    class: 'Defense Against the Dark Arts',
    teacher: 'Alastor "Mad-Eye" Moody',
  },
  {
    class: 'Astronomy',
    teacher: 'Aurora Sinistra',
  },
  {
    class: 'Muggle Studies',
    teacher: 'Charity Burbage',
  },
  {
    class: 'History of magic',
    teacher: 'Cuthbert Binns',
  },
  {
    class: 'Charms',
    teacher: 'Filius Flitwick',
  },
  {
    class: 'Divination',
    teacher: 'Sybill Trelawney',
  },
  {
    class: 'Care of Magical Creaturesation',
    teacher: 'Rubeus Hagrid',
  },
  {
    class: 'Herbology',
    teacher: 'Pomona Sprout',
  },
]

const students = [
  {
    name: 'Harry Potter',
    house: 'Gryffindor',
  },
  {
    name: 'Hermione Granger',
    house: 'Gryffindor',
  },
  {
    name: 'Susan Bones',
    house: 'Hufflepuff',
  },
  {
    name: 'Hannah Abbott',
    house: 'Hufflepuff',
  },
  {
    name: 'Justin Finch-Fletchley',
    house: 'Hufflepuff',
  },
  {
    name: 'Cedric Diggory',
    house: 'Hufflepuff',
  },
  {
    name: 'Colin Creevey',
    house: 'Gryffindor',
  },
  {
    name: 'Lavender Brown',
    house: 'Gryffindor',
  },
  {
    name: 'Dennis Creevey',
    house: 'Gryffindor',
  },
  {
    name: 'Seamus Finnigan',
    house: 'Gryffindor',
  },
  {
    name: 'Percy Weasley',
    house: 'Gryffindor',
  },
  {
    name: 'Ron Weasley',
    house: 'Gryffindor',
  },
  {
    name: 'Ginny Weasley',
    house: 'Gryffindor',
  },
  {
    name: 'Neville Longbottom',
    house: 'Gryffindor',
  },
  {
    name: 'Terry Boot',
    house: 'Ravenclaw',
  },
  {
    name: 'Marietta Edgecombe',
    house: 'Ravenclaw',
  },
  {
    name: 'Vincent Crabbe',
    house: 'Ravenclaw',
  },
  {
    name: 'Luna Lovegood',
    house: 'Ravenclaw',
  },
  {
    name: 'Draco Malfoy',
    house: 'Slytherin',
  },
  {
    name: 'Millicent Bulstrode',
    house: 'Slytherin',
  },
  {
    name: 'Gregory Goyle',
    house: 'Slytherin',
  },
  {
    name: 'Pansy Parkinson',
    house: 'Slytherin',
  },
]
// Array with objects, I can use array methods to receive values from it

// Creating dropdown from classes
for (let i = 0; i < classes.length; i++) {
  let option = document.createElement('option')
  option.setAttribute('value', classes[i].class)
  option.textContent = classes[i].class
  dropdown.append(option)
}

class Record {
  name
  house
  grade

  constructor(name, house, grade) {
    this.name = name
    this.house = house
    this.grade = grade
  }
}

const fillInTitleNTeacher = className => {
  tableTitle.textContent = className
  const teach = classes.find(cl => cl.class === className).teacher
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

const gradeGenerator = () => {
  const grades = []

  while (grades.length < 10) {
    const randomNum = Math.floor(Math.random() * 6) + 1

    switch (randomNum) {
      case 1:
        grades.push('A')
        break
      case 2:
        grades.push('B')
        break
      case 3:
        grades.push('C')
        break
      case 4:
        grades.push('D')
        break
      case 5:
        grades.push('E')
        break
      case 6:
        grades.push('F')
        break
      default:
        console.log('invalid number')
    }
  }
  return grades
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

const sortData = () => {
  recordsArray.sort((record, nextRecord) =>
    record.grade.localeCompare(nextRecord.grade)
  )
}

const handleHermione = () => {
  const hermioneIndex = recordsArray.findIndex(record => record.grade === 'S')
  if (hermioneIndex > -1) {
    const hermioneRecord = recordsArray.splice(hermioneIndex, 1)
    recordsArray.unshift(...hermioneRecord)
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

const handleGradeSort = () => {
  sortData()
  handleHermione()
  fillTable()
}

const handleHouseSort = () => {
  houseSort()
  fillTable()
}

const handleNameSort = () => {
  nameSort()
  fillTable()
}

const houseSort = () => {
  recordsArray.sort((record, nextRecord) =>
    record.house.localeCompare(nextRecord.house)
  )
}

const nameSort = () => {
  recordsArray.sort((record, nextRecord) =>
    record.name.localeCompare(nextRecord.name)
  )
}

const handleSort = btn => {
  switch (btn) {
    case 'nameSort':
      handleNameSort()
      break
    case 'houseSort':
      handleHouseSort()
      break
    case 'gradeSort':
      handleGradeSort()
      break
  }
}

const handleClassSelect = className => {
  fillInTitleNTeacher(className)
  selectStudents()
  addGradesToStudents(gradeGenerator())
  fillTable()
}

dropdown.addEventListener('change', event => {
  handleClassSelect(event.target.value)
})

sortBtns.addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON') {
    handleSort(event.target.classList[0])
  }
})
