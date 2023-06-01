const BASE_URL = 'http://192.168.0.103:8080/student/'

const getStudents = async () => {
  const response = await fetch(BASE_URL + 'list')
  return (data = await response.json())
}

export { getStudents }
