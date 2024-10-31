function middleTwo(deck) {
  let index1 = (deck.length/2) - 1;
  let index2 = index1 + 2;
  let newArray = deck.slice(index1, index2);
  return newArray
}
function sandwichTrick(deck) {
  let card1 = deck[0];
  let card2 = deck[deck.length - 1];
  let centro = deck.length /2;
  console.log(card1, card2, centro);
  let deck1 = deck.slice(1);
 deck1.pop();
 console.log(deck1);
 let centro2 = deck1.length/2 - 1;
 let final = deck1.splice(centro2, 0, card1, card2)
  
  
  return final
}

let cards = [1,2,3,4,5,6,7,8,9,10];
console.log(sandwichTrick(cards));