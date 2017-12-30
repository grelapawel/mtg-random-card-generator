
// zmienna url zawiera pełny adres do losowej karty
const url = 'https://api.scryfall.com/cards/random'

// podpinamy pod guzik nasłuchiwanie na kliknięcie tak aby każdorazowo pobierała nam się losowa karta
let button = document.getElementById('get-card')
button.addEventListener('click', function() {
  getCard()
  document.getElementById('loader').style.visibility = 'visible';
})

// ładowanie losowej karty po załadowaniu strony
document.body.onload = function () {
  getCard()
  document.getElementById('loader').style.visibility = 'visible';
}

let nazwa = document.getElementById('card')
let artist = document.getElementById('artist')
let art = document.getElementById('pic')
let type = document.getElementById('type')
let price = document.getElementById('price')
let rarity = document.getElementById('rarity')
let set = document.getElementById('set')
let shop = document.getElementById('shopping')
let oracle = document.getElementById('oracle')

function getCard () {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.addEventListener('load', function () {
    var response = JSON.parse(xhr.response)
    nazwa.innerHTML = response.name
    artist.innerHTML = "<span class='card-name'>autor ilustracji: </span>" + response.artist
    type.innerHTML = "<span class='card-name'>typ: </span>" + response.type_line
    price.innerHTML = "<span class='card-name'>średnia cena to: </span>" + response.eur + ' €'
    rarity.innerHTML = "<span class='card-name'>rzadkość: </span>" + response.rarity
    set.innerHTML = "<span class='card-name'>dodatek: </span>" + response.set_name + ' [' + response.set + ']'
    art.src = response.image_uris.normal
    oracle.innerHTML = "<span class='card-name'>tekst: </span>" + response.oracle_text

    // sprawdzamy czy karta ma cenę jeżeli nie wyświetla się komunikat
    if (response.eur === undefined) {
      price.innerHTML = 'brak ceny'
    }
    // sprawdzamy rzadkość karty i kolorujemy
    if (response.rarity === 'rare') {
      rarity.innerHTML = "<span class='card-name'>rzadkość: </span>" + "<span class='rare'>rare </span>"
    } else if (response.rarity === 'uncommon') {
      rarity.innerHTML = "<span class='card-name'>rzadkość: </span>" + "<span class='uncommon'>uncommon </span>"
    } else if (response.rarity === 'mythic') {
      rarity.innerHTML = "<span class='card-name'>rzadkość: </span>" + "<span class='mythic'>mythic </span>"
    }

    // poniżej generujemy linka do zakupów w magic card market
    let url = response.purchase_uris.magiccardmarket
    let zakupy = 'kup tą kartę w magic card market'
    shop.innerHTML = zakupy.link(url)

    console.log(response)
    document.getElementById('loader').style.visibility = 'hidden'
  })
  xhr.send()
}