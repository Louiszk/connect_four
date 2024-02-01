import consumer from "channels/consumer"

consumer.subscriptions.create({channel: "GameChannel"}, {
  connected() {
    console.log("Connected")
  },

  disconnected() {
    console.log("Disonnected")
  },

  received(data) {
    if(data["action"]=="move"){
      updateGridView(data["col"], data["grid"], data["turn"])
      const win = check_win(data["grid"]);
      if (win){
        var output_win = document.getElementById("output_win");
        output_win.innerHTML = win==1 ? "Red won" : "Yellow won"
        output_win.className = win==1 ? "text-red-500 font-bold text-5xl" : "text-yellow-500 font-bold text-5xl"
        document.getElementById("gameboard").querySelectorAll("button").forEach(button => button.disabled = true)
      }
    }else {
      console.log("resetted")
      var gameboard = document.getElementById("gameboard");
      gameboard.querySelectorAll(".m-1").forEach(div => div.className = 'aspect-square rounded-md m-1 ')
      document.getElementById("output").innerHTML = ""
      document.getElementById("output_win").innerHTML = ""
      gameboard.querySelectorAll("button").forEach(button => button.disabled = false)
      
    }
  }
});


function updateGridView(col, gridData, turn) {
  
  const put_move_id = 'div_' + col + '_' + (6-gridData[col].length)
  var gridDiv = document.getElementById(put_move_id);

  
  
  gridDiv.querySelector("div").className = turn==1 ? 'aspect-square bg-red-500 rounded-md m-1' : 'aspect-square bg-yellow-500 rounded-md m-1';

  document.getElementById("output").innerHTML = turn==1 ? "Yellows turn" : "Reds turn"
}

function check_win(field) {
  // Check horizontally
  for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 3; row++) {
          if (field[col][row]  &&
              field[col][row] === field[col][row + 1] &&
              field[col][row] === field[col][row + 2] &&
              field[col][row] === field[col][row + 3]) {
              return field[col][row];
          }
      }
  }

  // Check vertically
  for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 6; row++) {
          if (field[col][row] &&
              field[col][row] === field[col + 1][row] &&
              field[col][row] === field[col + 2][row] &&
              field[col][row] === field[col + 3][row]) {
              return field[col][row];
          }
      }
  }

  // Check diagonally (ascending)
  for (let col = 0; col < 4; col++) {
      for (let row = 3; row < 6; row++) {
          if (field[col][row] &&
              field[col][row] === field[col + 1][row - 1] &&
              field[col][row] === field[col + 2][row - 2] &&
              field[col][row] === field[col + 3][row - 3]) {
              return field[col][row];
          }
      }
  }

  // Check diagonally (descending)
  for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 3; row++) {
          if (field[col][row] &&
              field[col][row] === field[col + 1][row + 1] &&
              field[col][row] === field[col + 2][row + 2] &&
              field[col][row] === field[col + 3][row + 3]) {
              return field[col][row];
          }
      }
  }

  return 0; // No winner yet
}


