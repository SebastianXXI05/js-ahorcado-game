const countries = [
  'Colombia', 'Venezuela', 'Ecuador', 'Panama', 'Peru', 'Cuba', 'Argentina', 'Bolivia', 'Brasil',
  'Mexico', 'Guatemala', 'Uruguay', 'Paraguay', 'Chile'
]
const btnPlay = document.querySelector('#btn-play')
const result = document.querySelector('#result')
let scoreLose = 0
let scoreWin = 0
let prevCountry = ''

const person = {
  head: document.querySelector('.cabeza'),
  body: document.querySelector('.torso'),
  arm1: document.querySelector('.brazo1'),
  arm2: document.querySelector('.brazo2'),
  leg1: document.querySelector('.pierna1'),
  leg2: document.querySelector('.pierna2')
}

const reboot = () => {
  btnPlay.style.display = 'block'
  scoreLose = 0
  scoreWin = 0

  person.head.style.display = 'block'
  person.body.style.display = 'block'
  person.arm1.style.display = 'block'
  person.arm2.style.display = 'block'
  person.leg1.style.display = 'block'
  person.leg2.style.display = 'block'
}

const finished = (winner, country) => {
  const div = document.createElement('div')
  const h2 = document.createElement('h2')
  const countryh3 = document.createElement('h3')
  const btnReboot = document.createElement('button')

  while (result.children.length !== 0) {
    result.firstChild.remove()
  }
  div.classList.add('finish')
  h2.textContent = `Tu ${winner ? 'Ganas' : 'Pierdes'}`

  countryh3.textContent = `Pais: ${country}`
  btnReboot.textContent = 'Reiniciar'

  btnReboot.addEventListener('click', () => {
    reboot()
    document.body.lastChild.remove()
  })

  div.appendChild(h2)
  div.appendChild(countryh3)
  div.appendChild(btnReboot)
  document.body.appendChild(div)
}

const win = (country) => {
  finished(true, country)
}

const lose = (country) => {
  switch (scoreLose) {
    case 1:
      person.leg2.style.display = 'none'
      break
    case 2:
      person.leg1.style.display = 'none'
      break
    case 3:
      person.arm2.style.display = 'none'
      break
    case 4:
      person.arm1.style.display = 'none'
      break
    case 5:
      person.body.style.display = 'none'
      break
    default:
      person.head.style.display = 'none'
      finished(false, country)
      break
  }
}

const game = () => {
  const divLetters = document.createElement('div')
  const input = document.createElement('input')
  const btnInsert = document.createElement('button')
  let number = Math.floor(Math.random() * countries.length)
  let country = countries[number]
  while (country === prevCountry) {
    number = Math.floor(Math.random() * countries.length)
    country = countries[number]
  }
  prevCountry = country

  divLetters.classList.add('letters')
  input.setAttribute('placeholder', 'Ingresa una letra')
  btnInsert.textContent = 'Insertar'
  console.log(country)
  for (let i = 0; i < country.length; i++) {
    const letter = document.createElement('i')
    letter.textContent = '_  '
    letter.setAttribute('data-id', i)
    divLetters.appendChild(letter)
    result.appendChild(divLetters)

    result.appendChild(input)
    result.appendChild(btnInsert)
  }
  btnInsert.addEventListener('click', () => {
    let correct = false
    if (input.value === '') {
      alert('Ingresa algo')
    }
    else {
      for (let j = 0; j < country.length; j++) {
        if (country[j] == input.value) {
          divLetters.children[j].textContent = input.value + ' '
          scoreWin++
          correct = true
        }
      }
      if (!correct) {
        scoreLose++
        lose(country)
      }
      else {
        if (scoreWin == country.length) {
          win(country)
        }
      }
      input.value = ''
    }
  })
}

btnPlay.addEventListener('click', () => {
  game()
  btnPlay.style.display = 'none'
})