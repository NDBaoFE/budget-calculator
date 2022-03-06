const name = document.getElementById("name");
const price = document.getElementById("price");
const list = document.querySelector(".spending-list");
const submitBtn=document.querySelector("submit-btn");
const form=document.querySelector(".spend-form");
const alert = document.querySelector(".alert");
const clearBtn=document.querySelector(".clear-btn");
 const remain=document.getElementById("remain");
 const daysRemain=document.getElementById("days-remain")

form.addEventListener("submit",addItem);
/// clear the whole list buttons
clearBtn.addEventListener("click",clearItems);
// display items onload
window.addEventListener("DOMContentLoaded", setupItems);
let remainMoney=5000;



function addItem(e) {
    e.preventDefault();
    const value = name.value;
    const money=price.value;
    const id = new Date().getTime().toString();
  
    if (value !== "" &&money !=="") {
      const element = document.createElement("article");
      let attr = document.createAttribute("data-id");
      attr.value = id;
      element.setAttributeNode(attr);
      element.classList.add("spend-item");
      element.innerHTML = `<h2 class="item-name">${value}</h2>
      <h2 class="item-price">${money}</h2>
      <button class="delete-btn">
          <i class="fa-solid fa-delete-left"></i>
      </button>`;
      // add event listeners to both buttons;
      const deleteBtn = element.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", deleteItem);
      // append child
      list.appendChild(element);
      // display alert
      displayAlert("item added to the list", "success");
      //counting remainer 
       remain.textContent=calRemain();
      // set local storage
      addToLocalStorage(id, value,money);
      // set back to default
      setBackToDefault();
        
    } else {
      displayAlert("please enter value and the money ", "danger");
    }
  }



  function clearItems(){
      let items=document.querySelectorAll(".spend-item");
      if(items.length>0){
          items.forEach(function(item){
            list.removeChild(item);
          });
      }
       //counting remainer 
       remain.textContent=calRemain();
      displayAlert("empty list done", "danger");
      setBackToDefault();
      localStorage.removeItem("list");
  }




  function deleteItem(e){
 const element=e.currentTarget.parentElement;
 const id = element.dataset.id;
  list.removeChild(element);
   //counting remainer 
   remain.textContent=calRemain();
   removeFromLocalStorage(id);
  }
  // display alert
  function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    // remove alert
    setTimeout(function () {
      alert.textContent = "";
      alert.classList.remove(`alert-${action}`);
    }, 1000);
  }
  // set the form to default
  function setBackToDefault() {
    name.value = "";
    price.value="";
  }

//*local storage*/
function addToLocalStorage(id, value,money) {
  const item = { id, value, money};
  let items = getLocalStorage();
  items.push(item);
  localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });

  localStorage.setItem("list", JSON.stringify(items));
}







//*Setting up items
// ****** setup items **********

function setupItems() {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value,item.money);
    });
    
  }
    //counting remainer 
    remain.textContent=calRemain();
}

function createListItem(id, value,money) {
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("spend-item");
  element.innerHTML = `<h2 class="item-name">${value}</h2>
  <h2 class="item-price">${money}</h2>
  <button class="delete-btn">
      <i class="fa-solid fa-delete-left"></i>
  </button>`;
  // add event listeners to both buttons;
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  // append child
  list.appendChild(element);
 

}


  //** calculating remainder after spending */
  function calRemain(){
      let remain=5000;
      let prices=document.querySelectorAll(".item-price");
        prices.forEach(function(price){
            
            let money=parseInt(price.textContent);
            remain-=money;
            
        });
  
        return remain;

  }
  