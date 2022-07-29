const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

const italics = makeTag('em')
const writer = makeTag('h3')

// complete this function
const makePoemHTML = ([
    {
      title, 
      author, 
      lines
    }
  ]) => {
  const renderAuthor = pipe(italics, writer)
  // console.log(title, author, lines)
  poemEl.innerHTML=`
  ${makeTag('h2')(title)}
  ${renderAuthor(`by ${author}`)}`
  

  // const makeTitle = makeTag('h2')
  // const stanzas = makeTag('p')

  // const renderPoem = pipe(makeTitle, makeAuthor, stanzas)
  // renderPoem({title, author, lines})
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}

//Write code in the makePoemHTML function
//output a single string of HTML inside #poem div
//string should have h2, em inside h3, and p tags for each stanza
//p tags should contain linebreak tags
//use the makeTag and pipe starter code
//split, join, and map can help separate poem into stanzas