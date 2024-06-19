const uri = "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json";
const newInstance = new XMLHttpRequest();

let items = [];
const itemsPerPage = 10;
let currentPage = 1;
let totalPages = 0;

newInstance.open("GET", uri);
newInstance.send();

newInstance.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status === 200) {
      items = JSON.parse(this.response);
      totalPages = Math.ceil(items.length / itemsPerPage);
      getItems(currentPage);
      getPagination();
    } 
  }
};

newInstance.onerror = function (error) {
  console.log("Error occurred", error);
};

const itemsContainer = document.createElement('div');
const paginationContainer = document.createElement('div');
paginationContainer.setAttribute('class','page-container');
itemsContainer.setAttribute('class','item-container');
document.body.append(...[itemsContainer, paginationContainer]);

function getItems(page) {
    itemsContainer.innerHTML = '';
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const itemsToDisplay = items.slice(start, end);
    
    itemsToDisplay.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `<div class='items'><span> ${item.name}</span> <span>${item.email}</span> </div>`;
        itemsContainer.appendChild(div);
    });
}

function getPagination() {
    paginationContainer.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('span');
        pageItem.textContent = i;
        pageItem.setAttribute('class', 'page-item');
        if (i === currentPage) {
            pageItem.style.fontWeight = 'bold';
            pageItem.style.background = 'darkmagenta';
            pageItem.style.color = 'white';
        }
        pageItem.addEventListener('click', () => {
            currentPage = i;
            getItems(currentPage);
            getPagination();
        });
        paginationContainer.appendChild(pageItem);
    }
}
