document.addEventListener('DOMContentLoaded', function() {
  console.log("hey")
    document.querySelector("#gameboard").querySelectorAll('button').forEach(function(button) {
      const col = button.id.split("_")[1];
      
      button.addEventListener('click', function() {
        fetch('/index/move', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value: col })
        })
        .then(response => {
            console.log(response);
            return response.json();})
        .then(data => {
          if (data.error) {
            alert(data.error); // Display error message if move is invalid
          } 
        })
        .catch(error => console.error('Error:', error));
      });
    });
  });
  