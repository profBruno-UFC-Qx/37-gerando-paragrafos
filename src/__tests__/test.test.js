const fs = require('fs');
import {screen, fireEvent} from '@testing-library/dom'

beforeEach(() => {
  const fileContent = fs.readFileSync('src/index.html', 'utf8');
  const cssContent = fs.readFileSync('src/css/estilo.css', 'utf-8')
  

  const style = document.createElement("style")
  style.innerHTML = cssContent

  
  document.head.appendChild(style)

  document.body.innerHTML = fileContent
  
  const jsContent = fs.readFileSync('src/js/script.js', 'utf-8')
  const f = new Function('', `${jsContent}`)
  f()

});

afterEach(() => {
  // cleanup on exiting
   document.body.innerHTML = ""
   document.head.innerHTML = ""
});


test('O botão existe', () => {
  const list = screen.getAllByText("Criar parágrafo");
  expect(list.length).toBe(1)
})

test('Ao clicar no botão um novo parágrafo deve ser adicionado', () => {
  const button = screen.getByText("Criar parágrafo");
  let list = document.getElementsByTagName("p");
  expect(list.length).toBe(0)
  button.click()
  expect(list.length).toBe(1)
  button.click()
  button.click()
  button.click()
  button.click()
  let total = 0
  for (const paragafo of list) {
    total++
    expect(paragafo.innerHTML).toBe(`Parágrafo ${total}`)
  }
  expect(total).toBe(5)
})

