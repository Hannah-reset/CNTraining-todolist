let allItems = []

function addTodoItem(e) {
  let inputText = document.getElementById('item-input-text').value
  if (e.keyCode !== 13) {
    return
  }
  
  let li = document.createElement('li')
  li.setAttribute(
    'style',
    'font-size: 2rem; padding-top: 0.6rem; word-break: break-all;height: 2rem;justify-content: space-between;display: flex;align-items: center;'
  )

  let checkAndLabel = document.createElement('div')

  let checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')
  checkbox.setAttribute('name', 'todo-item')
  checkbox.setAttribute('onclick', 'checkboxOnclick(this)')
  checkbox.setAttribute('style', 'margin: 3px; transform: scale(1/1.4, 1/1.4);')
  checkAndLabel.appendChild(checkbox)
  let label = document.createElement('label')
  label.setAttribute('style', 'margin-left:0.5rem;')
  label.innerText = inputText.trim()
  checkAndLabel.appendChild(label)
  let img = document.createElement('img')
  img.setAttribute('src','./picture/X.png');
  img.setAttribute('style','width:1rem;height:1rem;margin-right:1rem;')
  img.setAttribute('onclick', 'checkboxDelete(this)')
  li.appendChild(checkAndLabel);
  li.appendChild(img);
  allItems.push(li)
  if (!document.getElementById('radio-finished').checked) {
    document.getElementById('todo-item-ul-id').appendChild(li)
  }
  document.getElementById('item-input-text').value = ''
  clearRadioStatus()
  setAll()
  getLiCount()
}

function checkboxOnclick(checkbox) {
  checkbox.nextElementSibling.setAttribute('style', 'color: #000000;')
  // if (!document.getElementById('radio-all').checked) {
  //   document
  //     .getElementById('todo-item-ul-id')
  //     .removeChild(checkbox.parentElement.parentElement)
  // }
  if (checkbox.checked === true) {
    checkbox.nextElementSibling.setAttribute(
      'style',
      'color: #808080; text-decoration:line-through;'
    )
  }
  getLiCount()
}

function checkboxDelete(img) {
  let liItems = document.getElementById('todo-item-ul-id')
  allItems = allItems.filter((each) => {
    if (each.outerText === img.parentElement.innerText) {
      liItems.removeChild(each);
    }
    return each.outerText !== img.parentElement.innerText
  })
  console.log(allItems)
  getLiCount()
}

function clearRadioStatus() {
  const siblings = Array.from(document.getElementById('radio-id').children)
  siblings.forEach((each) => {
    if (each.className === 'radio-item') {
      return each.nextElementSibling.setAttribute('style', 'border:0')
    }
  })
}
function setAll() {
  document.getElementById('radio-all-label').setAttribute('style', 'border:1px solid darkorange;')
  let liItems = document.getElementById('todo-item-ul-id')
  liItems.innerHTML = ''
  allItems.forEach((item) => {
    liItems.appendChild(item)
  });
  getLiCount()
}
function radioChange(radio) {
  clearRadioStatus()
  radio.setAttribute('checked', true)
  radio.nextElementSibling.setAttribute('style', 'border:1px solid darkorange;')
  let liItems = document.getElementById('todo-item-ul-id')
  liItems.innerHTML = ''
  allItems.forEach((item) => {
    liItems.appendChild(item)
    if (item.firstChild.firstChild.checked && radio.value === 'Active') {
      liItems.removeChild(item)
    }
    if (!item.firstChild.firstChild.checked && radio.value === 'Finished') {
      liItems.removeChild(item)
    }
    if (item.firstChild.firstChild.checked && radio.value === 'Clear completed') {
      liItems.removeChild(item)
      console.log('item', item.innerText)
      console.log('allItems', allItems)
      allItems = allItems.filter((each) => {
        return each.outerText !== item.innerText
      })
      radio.nextElementSibling.setAttribute('style', '');
      document.getElementById('radio-all-label').setAttribute('style', 'border:1px solid darkorange;');
    }
  })
  getLiCount()
}

function getLiCount() {
  const countUI = document.getElementById('total-count')
  countUI.innerText = ''
  const ul = document.getElementById('todo-item-ul-id')
  const countData = ul.childNodes.length
  const spanUI = document.createElement('span')
  spanUI.setAttribute(
    'style',
    'height: 1rem; font-size: 1rem; display:inline-block;line-height: 3rem;margin-left: 0.5rem;'
  )
  spanUI.innerText =
    countData + (countData > 1 ? '   items left' : '   item left')
  countUI.appendChild(spanUI)
}

function setVisible() {
  const trian = document.getElementById('content')
  const value = trian.getAttribute('value');
  const list = document.getElementsByClassName('todo-item-list')[0];
  const tool = document.getElementsByClassName('toolbar')[0];
  console.log('start',value)
  if (value.length === 0) {
    trian.setAttribute(
      'style',
      'width: 10px;height: 10px; border:#666 solid; border-width: 3px 3px 0 0; transform: rotate(-45deg);margin-bottom: 10px;'
    )
    trian.setAttribute('value','1');
    list.setAttribute('style','visibility:hidden;position:absolute;')
    tool.setAttribute('style','visibility:hidden;position:absolute;')

  }else{
    trian.setAttribute(
        'style',
        'width: 10px;height: 10px; border:#666 solid; border-width: 3px 3px 0 0; transform: rotate(135deg);margin-bottom: 10px;'
      )
      trian.setAttribute('value','');
      list.setAttribute('style','visibility:visible')
      tool.setAttribute('style','visibility:visible')

  }
  
  console.log('end',value)
}
