
// Select The Start Game Button
document.querySelector(".control-button span").onclick = function () {
  // Prompt Window To Ask For Name
  let yourName = prompt("What is Your Name?");

  // If Name Is Empty
  if (yourName == null || yourName == "") {
    // Set Name To Unknown
    document.querySelector(".name span").innerHTML = "Unknown";
    // Name Is Not Empty
  } else {
    document.querySelector(".name span").innerHTML = yourName;
    window.localStorage.setItem("First-player", yourName);
  }
  // Remove Splash Screen
  document.querySelector(".control-button").remove();
};

// Effect Duration
let duration = 1000;
// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");
// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create Range Of Keys
// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {
  // Add CSS Order Property
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener('click', function () {
    // Trigger The Flip Block Function
    flipBlock(block);
  });
});
// Flip Block Function
function flipBlock(selectedBlock) {
  // Add Class is-flipped
  selectedBlock.classList.add('is-flipped');
  // Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter(flipBlock => flipBlock.classList.contains("is-flipped"));
  // If Theres Two Selected Blocks

  if (allFlippedBlocks.length === 2) {
    console.log('Two Flipped Blocks Selected');
    // Stop Clicking Function
    stopClicking();
    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

  }


}
// Stop Clicking Function
function stopClicking() {
  // Add Class No Clicking on Main Container
  blocksContainer.classList.add('no-clicking');
  // Wait Duration
  setTimeout(() => {
    // Remove Class No Clicking After The Duration
    blocksContainer.classList.remove('no-clicking');
  }, duration);
}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {

  let triesElement = document.querySelector('.tries span');

  if (firstBlock.dataset.animals === secondBlock.dataset.animals) {

    firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');
    firstBlock.classList.add('has-match');
    secondBlock.classList.add('has-match');

    document.getElementById('success').play();
    checkWin();

  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    if (triesElement.innerHTML <= 11) {
      setTimeout(() => {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
      }, duration);

      document.getElementById('fail').play();
    } else {
      let end = document.querySelector(".fail-button");
      end.classList.add('End');
      Swal.fire({
        title: 'oh oh You failed !',
        text: 'Do you want to Try Again',
        icon: 'error',
        confirmButtonText: 'Try Again',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
        showCloseButton: true
      }).then(function () {
        location.reload();
      });
      document.getElementById('fails').play();

    }

  };
}



function checkWin() {
  let allMatched = blocks.every(block => block.classList.contains("has-match"));
  if (allMatched) {
    Swal.fire({
      title: 'Congratulations!',
      text: 'You win!',
      icon: 'success',
      confirmButtonText: 'Play Again'
    }).then(function () {
      location.reload();
    });
    document.getElementById('success').play();
  }
}
function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }

  return array;
}






















