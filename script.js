const tableBtn = document.querySelector('.choseClasses')
const dropdown = document.querySelector('.dropdown')
const classData = document.querySelector('.classData')
const tableTitle = document.querySelector('.tableTitle')
const teacher = document.querySelector('.teacher')

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
console.log(students)

// Iterating over the array, and by each iteration, I create a new doc element which is the current elements' (object) "class" property, and I set the same value for the text content
for (let i = 0; i < classes.length; i++) {
  let option = document.createElement('option')
  option.setAttribute('value', classes[i].class)
  option.textContent = classes[i].class
  dropdown.append(option)
}

const fillData = data => {
  tableTitle.textContent = data
  const teach = classes.find(cl => cl.class === data).teacher
  teacher.textContent = teach

  const selectedStudents = selectStudents()
  const grades = gradeGenerator()

  selectedStudents.forEach((student, i) => {
    classData.innerHTML += `
      <tr>
        <td>${student.name}</td>
        <td>${student.house}</td>
        <td>${isHermione(student.name) ? 'S' : grades[i]}</td>
      </tr>
    `
  })
}

const isHermione = name => {
  return name === 'Hermione Granger'
}

const selectStudents = () => {
  const studentArray = []

  while (studentArray.length < 10) {
    const randomIndex = Math.floor(Math.random() * students.length)

    const findSameArr = studentArray.filter(
      student => student.name === students[randomIndex].name
    )

    if (findSameArr.length === 0) {
      studentArray.push(students[randomIndex])
    }
  }

  return studentArray
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

dropdown.addEventListener('change', event => {
  classData.innerHTML = ''
  fillData(event.target.value)
})
