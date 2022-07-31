const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = ([
    {
      title, 
      author, 
      lines
    }
  ]) => {
  let makeTitle = makeTag('h2')
  let italics = makeTag('em')
  let writer = makeTag('h3')
  let renderAuthor = pipe(italics, writer)
  let stanzasArr = []
  let linesArr = []

  lines.forEach((line, index) => {
    if(!line) {
      stanzasArr.push(linesArr)
      linesArr = []
    } else if (index === lines.length -1){
      linesArr.push(line)
      stanzasArr.push(linesArr)
    } else {
      linesArr.push(line)
    }
  });
  console.log(stanzasArr)
  let stanzas = ""
  stanzasArr.forEach((linesArr) => {
    stanzas += makeTag('p')(linesArr.join('<br/>'))
  });
  
  return makeTitle(title) + renderAuthor('by ' + author) + stanzas
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
