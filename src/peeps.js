const peepsContainer = document.getElementById('peeps');
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://chitter-backend-api.herokuapp.com/peeps', true);
xhr.onload = function() {
  if (this.status == 200) {
    try {
      const resObjData = JSON.parse(this.responseText);
      renderDataToHTML(resObjData);
    } catch (e) {
      console.warn('There was an error in the JSON. Could not parse!');
    }
  } else {
      console.warn('Did not receive 200 OK from response!');
  }
};

xhr.send();


function renderDataToHTML(data) {
  let peepsDivHTML = '';

for (let i = 0; i < data.length; i++) {
  peepsDivHTML += `<p><strong>${data[i].user.handle}</strong>: ${data[i].body} <em>(created at ${data[i].created_at.slice(11, 16)} on ${data[i].created_at.slice(0, 10)})</em></p>`
 }
 document.getElementById('peeps').innerHTML = peepsDivHTML;
}

function signUp() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://chitter-backend-api.herokuapp.com/users", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  let input = JSON.stringify({ "user": { "handle": "kirt", "password": "mypassword" } });

  xhttp.send(input);
}

function signIn(username, password) {
  var url = 'https://chitter-backend-api.herokuapp.com/sessions';
  var data = `{ "session": { "handle": "${username}", "${password}": "mypassword" } }`;

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data), 
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));

}
