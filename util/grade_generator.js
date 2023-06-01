export const gradeGenerator = () => {
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

