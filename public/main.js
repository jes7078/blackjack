const ranks = [
  'ace',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'jack',
  'queen',
  'king'
]
const suits = ['hearts', 'spades', 'diamonds', 'clubs']
const deck = []
const playerHand = []
const dealerHand = []

const getCardValue = rank => {
  if (rank === 'ace') {
    return 11
  } else if (rank === 'king' || rank === 'queen' || rank === 'jack') {
    return 10
  } else {
    return parseInt(rank)
  }
}

const main = () => {
  document.querySelector('.hit-button').disabled = true
  document.querySelector('.stay-button').disabled = true
  document.querySelector('.play-again').disabled = true
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      const card = {
        rank: ranks[j],
        suit: suits[i],
        value: getCardValue(ranks[j]),
        cardPic: ranks[j] + '_of_' + suits[i] + '.svg'
      }
      deck.push(card)
    }
    console.log(deck)
  }

  for (let i = 0; i < deck.length; i++) {
    const j = Math.floor(Math.random() * 52)
    const temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }
}

const shuffleUpAndDeal = () => {
  let playerSum = 0

  for (let i = 0; i < 2; i++) {
    const drawnCard = deck.pop()
    dealerHand.push(drawnCard)
    //const cardLi = document.createElement('LI')
    // cardLi.textContent = drawnCard.rank + ' of ' + drawnCard.suit
    //document.querySelector('.dealer-hand').appendChild(cardLi)
    //append image
    if (i === 0) {
      var img = document.createElement('img')
      //img.src = 'images/' + dealerHand[i].cardPic
      img.src = 'images/back_of_card.jpg'
      var src = document.getElementById('dealer-image')
      src.appendChild(img)
    } else {
      var img = document.createElement('img')
      img.src = 'images/' + dealerHand[i].cardPic
      var src = document.getElementById('dealer-image')
      src.appendChild(img)
    }
  }
  let dealerSum = 0

  for (let i = 0; i < dealerHand.length; i++) {
    dealerSum += dealerHand[i].value
  }

  //document.querySelector('.dealer-sum').textContent = dealerSum

  for (let i = 0; i < 2; i++) {
    const drawnCard = deck.pop()
    playerHand.push(drawnCard)
    //const cardLi = document.createElement('LI')
    //cardLi.textContent = drawnCard.rank + ' of ' + drawnCard.suit
    //document.querySelector('.player-hand').appendChild(cardLi)
    //append image
    var img = document.createElement('img')
    img.src = 'images/' + playerHand[i].cardPic
    var src = document.getElementById('player-image')
    src.appendChild(img)
  }

  let sum = 0
  for (let i = 0; i < playerHand.length; i++) {
    sum += playerHand[i].value
  }

  if (sum === 21) {
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.stay-button').disabled = true
    document.querySelector('.shuffle-up-and-deal').disabled = true
    document.querySelector('.final-message').textContent =
      'Player 1 Black Jack, You win!!!'
    document.querySelector('.final-message').classList.add('winner')
    document.querySelector('.play-again').disabled = false
  } else {
    document.querySelector('.player-sum').textContent = sum
    document.querySelector('.shuffle-up-and-deal').disabled = true
    document.querySelector('.hit-button').disabled = false
    document.querySelector('.stay-button').disabled = false
  }
}

const hitMe = () => {
  for (let i = 0; i < 1; i++) {
    const drawnCard = deck.pop()
    playerHand.push(drawnCard)
    // const cardLi = document.createElement('LI')
    // cardLi.textContent = drawnCard.rank + ' of ' + drawnCard.suit
    //document.querySelector('.player-hand').appendChild(cardLi)
    //append image
    var img = document.createElement('img')
    img.src = 'images/' + drawnCard.cardPic
    var src = document.getElementById('player-image')
    src.appendChild(img)
  }
  let sum = 0
  for (let i = 0; i < playerHand.length; i++) {
    sum += playerHand[i].value
  }
  document.querySelector('.player-sum').textContent = sum

  if (sum > 21) {
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.stay-button').disabled = true
    document.querySelector('.final-message').textContent =
      'Player 1 busted, House Wins!!!'
    document.querySelector('.final-message').classList.add('busted')
    document.querySelector('.play-again').disabled = false
  }
}

const stay = () => {
  document.querySelector('.hit-button').disabled = true
  document.querySelector('.stay-button').disabled = true
  dealerHandPlay()
}

const dealerHandPlay = () => {
  var images = document.getElementsByTagName('img')
  while (images.length > 0) {
    images[0].parentNode.removeChild(images[0])
  }
  let dealerSum = 0
  for (let i = 0; i < dealerHand.length; i++) {
    dealerSum += dealerHand[i].value
    var img = document.createElement('img')
    img.src = 'images/' + dealerHand[i].cardPic
    var src = document.getElementById('dealer-image')
    src.appendChild(img)
  }
  for (let i = 0; i < playerHand.length; i++) {
    var img = document.createElement('img')
    img.src = 'images/' + playerHand[i].cardPic
    var src = document.getElementById('player-image')
    src.appendChild(img)
  }

  document.querySelector('.dealer-sum').textContent = dealerSum

  while (dealerSum < 17) {
    for (let i = 0; i < 1; i++) {
      const drawnCard = deck.pop()
      dealerHand.push(drawnCard)
      //const cardLi = document.createElement('LI')
      //cardLi.textContent = drawnCard.rank + ' of ' + drawnCard.suit
      //document.querySelector('.dealer-hand').appendChild(cardLi)
      //append image
      var img = document.createElement('img')
      img.src = 'images/' + drawnCard.cardPic
      var src = document.getElementById('dealer-image')
      src.appendChild(img)
      dealerSum = 0
    }
    for (let i = 0; i < dealerHand.length; i++) {
      dealerSum += dealerHand[i].value

      document.querySelector('.dealer-sum').textContent = dealerSum
    }
  }
  document.querySelector('.final-message').textContent = 'dealer done!!!'
  checkWinner()
}

const checkWinner = () => {
  let dealerSum = 0
  let playerSum = 0
  for (let i = 0; i < dealerHand.length; i++) {
    dealerSum += dealerHand[i].value
  }
  for (let i = 0; i < playerHand.length; i++) {
    playerSum += playerHand[i].value
  }
  if (playerSum > dealerSum) {
    document.querySelector('.final-message').textContent = 'You Win!!!'
    document.querySelector('.final-message').classList.add('winner')
  } else if (dealerSum > playerSum) {
    if (dealerSum > 21) {
      document.querySelector('.final-message').textContent = 'You Win!!!'
      document.querySelector('.final-message').classList.add('winner')
    } else {
      document.querySelector('.final-message').textContent = 'House Wins!!!'
      document.querySelector('.final-message').classList.add('house-wins')
    }
  } else {
    document.querySelector('.final-message').textContent = 'Draw'
    document.querySelector('.final-message').classList.add('draw')
  }
  document.querySelector('.play-again').disabled = false
}

const play = () => {
  console.log('reload')
  location.reload(true)
}

document.addEventListener('DOMContentLoaded', main)
document
  .querySelector('.shuffle-up-and-deal')
  .addEventListener('click', shuffleUpAndDeal)
document.querySelector('.hit-button').addEventListener('click', hitMe)
document.querySelector('.stay-button').addEventListener('click', stay)
document.querySelector('.play-again').addEventListener('click', play)
