let xhr = new XMLHttpRequest();
let userData;

function createLi(length) {
    let myOl = document.getElementById("myOl");
    myOl.onclick = function(event) {
        if (event.target.parentElement.tagName !== 'FIGURE') {
            return;
        }
        popUpLi(event.target.parentElement.parentElement);
    };
    for (let i = 0; i < length; i++) {
        let li = document.createElement("LI");
        let figure = document.createElement("FIGURE");
        let newImg = document.createElement("IMG");
        li.appendChild(figure);
        figure.appendChild(newImg);
        figure.appendChild(document.createElement("FIGCAPTION"));
        myOl.appendChild(li);
        li.value = i + 1;
    }
}

createLi(50);

function loadUser() {
    let url = 'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture';
    xhr.open('GET', url, true);
    xhr.send();
}

xhr.onload = function() {
    if (xhr.status != 200) {
        alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    } else {
        userData = JSON.parse(xhr.responseText).results;
        addInfotoLi();
    }
};


function addInfotoLi() {
    let myOl = document.getElementById("myOl");
    let childCount = myOl.childElementCount;
    for (let i = 0; i < childCount; i++) {
        let figure = myOl.children[i].firstChild;
        let name = userData[i].name;
        let text = document.createTextNode(`${ToUpperCase(name.title)}. ${ToUpperCase(name.first)} ${ToUpperCase(name.last)}`);
        figure.firstChild.setAttribute("src", userData[i].picture.medium);
        figure.lastChild.textContent = text.textContent;
    }
}


xhr.onerror = function() {
    alert("Запрос не удался");
};

function SortBtn() {
    let sel = document.getElementById('selectOrder');
    let order = sel.options[sel.selectedIndex].value;
    let selLttr = document.getElementById('selectLetter');
    let letter = selLttr.options[selLttr.selectedIndex].value;
    mySort(letter, order);
}

function mySort(letter = 0, order = 1) {

    if (userData === undefined) {
        return;
    }
    userData.sort(function(a, b) {
        let x;
        let y;
        if (a.name.first[letter] === undefined) {
            x = a.name.first[a.name.first.length - 1].toLowerCase();
        } else {
            x = a.name.first[letter].toLowerCase();
        }
        if (b.name.first[letter] === undefined) {
            y = b.name.first[b.name.first.length - 1].toLowerCase();
        } else {
            y = b.name.first[letter].toLowerCase();
        }
        if (x < y) { return -1 * order; }
        if (x > y) { return 1 * order; }
        return 0;
    });
    addInfotoLi();
}

function popUpLi(li) {
    let myDiv = document.querySelector('.popUp');

    let result = userData[li.value - 1];

    document.getElementById('img2').src = result.picture.large;


    myDiv.children[2].textContent = `Street: ${regExp(result.location.street)}`;
    myDiv.children[3].textContent = `City: ${regExp(result.location.city)}`;
    myDiv.children[4].textContent = `State: ${regExp(result.location.state)}`;
    myDiv.children[5].textContent = `Email: ${result.email}`;
    myDiv.children[6].textContent = `Phone: ${result.phone}`;

    myDiv.style.display = "block";
}

function HideMyDivBtn() {
    let myDiv = document.querySelector('.popUp');
    myDiv.style.display = "none";
}

function regExp(str) {
    str = str.match(/\w+/gi);
    for (let i = 0; i < str.length; i++) {
        str[i] = ToUpperCase(str[i]);
    }
    return str.join(' ');
}

function ToUpperCase(s) {
    s = s.split("");
    s[0] = s[0].toUpperCase();
    s = s.join("");
    return s;
}