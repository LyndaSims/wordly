const form = document.getElementById('search-form')
const input = document.getElementById('word-input')
const errorMessage = document.getElementById('error-message')

const wordResult = document.getElementById('word')
const pronunciation = document.getElementById('pronunciation')
const partOfSpeech = document.getElementById('part-of-speech')
const definition = document.getElementById('definition')
const example = document.getElementById('example')
const synonyms = document.getElementById('synonyms')
const source = document.getElementById('source')

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const word = input.value.trim()

  if (!word) {
    errorMessage.textContent = 'You must enter a word'
    errorMessage.classList.remove('hidden')
    return
  }

  errorMessage.textContent = ''
  errorMessage.classList.add('hidden')

  fetchWord(word)
})

async function fetchWord(word) {
  try {
    const response = await fetch(`https://freedictionaryapi.com/api/v1/entries/en/${word}`)
    const data = await response.json()

    displayWord(data)

    console.log(JSON.stringify(data, null, 2))
  } catch (error) {
    console.log(error)
  }
}

function displayWord(data) {
  const entry = data.entries[0]
  const sense = entry.senses[0]

  wordResult.textContent = data.word
  partOfSpeech.textContent = entry.partOfSpeech
  definition.textContent = sense.definition
  source.textContent = data.source.url

  if (entry.pronunciations.length > 0) {
    pronunciation.textContent = entry.pronunciations[0].text
  } else {
    pronunciation.textContent = 'No pronunciation found'
  }

  if (sense.examples.length > 0) {
    example.textContent = sense.examples[0]
  } else {
    example.textContent = 'No example found'
  }

  if (entry.synonyms.length > 0) {
    synonyms.textContent = entry.synonyms.join(', ')
  } else if (sense.synonyms.length > 0) {
    synonyms.textContent = sense.synonyms.join(', ')
  } else {
    synonyms.textContent = 'No synonyms found'
  }
}