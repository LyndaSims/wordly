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
  wordResult.textContent = data.word
  pronunciation.textContent = data.entries[0].pronunciations[0].text
  partOfSpeech.textContent = data.entries[0].partOfSpeech
  definition.textContent = data.entries[0].senses[0].definition
  example.textContent = data.entries[0].senses[0].examples[0]
  source.textContent = data.source.url

  if (data.entries[0].synonyms.length > 0) {
    synonyms.textContent = data.entries[0].synonyms.join(', ')
  } else if (data.entries[0].senses[0].synonyms.length > 0) {
    synonyms.textContent = data.entries[0].senses[0].synonyms.join(', ')
  } else {
    synonyms.textContent = 'No synonyms found'
  }
}