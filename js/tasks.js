const elementsContainer = document.querySelector(".elements-grid");
const createElementForm = document.querySelector("#create_cup");
const createElementFormBtn = document.querySelector("#create_element_btn");
const createElementModale = document.querySelector("#staticBackdrop");
const createElementModaleTitle = document.querySelector("#staticBackdropLabel");
const createElementOpenModelBtn = document.querySelector(".btn-primary.nav-link");
const volumeValue = document.querySelector(".main-side-menu_value");
const countVolumeBtn = document.querySelector(".main-side-menu__count-button");
const editElementModalBtn = document.querySelector("#edite_element_btn");
const sortByValueCheckbox = document.querySelector("#flexSwitchCheckDefault");
const searchBtn = document.querySelector("#serchBtn");
const searchBtnCansel = document.querySelector("#searchBtnCansel");
const searchValue = document.querySelector("#searchFild");
const createElementFilds = createElementForm.querySelectorAll("input");

let data = [];
let editedElement;
let editedHtmlElement;
createElementFormBtn.disabled = true;

window.addEventListener("load", () => {
  data = gettDataFromChannelStore();
  if(data){
    renderElementsGrid();
  }else{
    data = [];
  }
});

createElementFormBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addNewElem();
  clearForm();
  createElementFormBtn.disabled = true;
  volumeValue.innerText = "";
});

createElementFilds.forEach((elem) => {
  if (elem.type != "submit") {
    elem.addEventListener("keyup", (event) => {
      if (event.target.value.length < 2) {
        event.target.style.borderColor = "red";
        createElementFormBtn.disabled = true;
      } else {
        event.target.style.borderColor = "black";
        if (verifyFormField()) {
          createElementFormBtn.disabled = false;
        }
      }
    });
  }
});

countVolumeBtn.addEventListener("click", updateVolume);

editElementModalBtn.addEventListener("click", saveEditedElement);

sortByValueCheckbox.addEventListener("change", sortByValue);

searchBtn.addEventListener("click", searchByName);

searchBtnCansel.addEventListener("click",(event)=>{
  event.preventDefault();
  elementsContainer.innerText = "";
  renderElementsGrid();
})

createElementOpenModelBtn.addEventListener("click", () => {
  createElementModaleTitle.innerText = "Add cap";
  createElementFormBtn.style.display = "block";
  editElementModalBtn.style.display = "none";
  clearForm();
});

function addNewElem(event) {
  const elem = {
    id: new Date().getTime(),
    image: createElementForm.image.value,
    title: createElementForm.title.value,
    volume: createElementForm.volume.value,
    material: createElementForm.material.value,
    color: createElementForm.color.value,
  };
  data.push(elem);
  createElementModale.style.display = "none";

  document.querySelector(".modal-backdrop").classList.remove("show");
  setDataToChannelStore();
  createElement(elem);
}

function verifyFormField() {
  if (
    createElementForm.image.value.length < 2 ||
    createElementForm.title.value.length < 2 ||
    createElementForm.volume.value.length < 2 ||
    createElementForm.material.value.length < 2 ||
    createElementForm.color.value.length < 2
  ) {
    return false;
  } else {
    return true;
  }
}

function createElement(elem) {
  const container = document.createElement("div");
  container.setAttribute("id", elem.id);
  container.classList.add("elem");

  const elemImg = document.createElement("img");
  elemImg.setAttribute("src", elem.image);
  elemImg.classList.add("elem-icon");

  const title = document.createElement("div");
  title.innerText = elem.title;
  title.classList.add("parameter");

  const volume = document.createElement("div");
  volume.innerText = `Volume: ${elem.volume}`;
  volume.classList.add("parameter");

  const material = document.createElement("div");
  material.innerText = `Material: ${elem.material}`;
  material.classList.add("parameter");

  const color = document.createElement("div");
  color.innerText = `Color: ${elem.color}`;
  color.classList.add("parameter");

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.classList.add("elem-button");
  editBtn.setAttribute("data-bs-toggle", "modal");
  editBtn.setAttribute("data-bs-target", "#staticBackdrop");

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("elem-button");

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("parameter");

  container.appendChild(elemImg);
  container.appendChild(title);
  container.appendChild(volume);
  container.appendChild(material);
  container.appendChild(color);

  btnContainer.appendChild(editBtn);
  btnContainer.appendChild(deleteBtn);
  container.appendChild(btnContainer);
  deleteBtn.addEventListener("click", deleteElem);
  editBtn.addEventListener("click", openEditeElemForm);
  elementsContainer.appendChild(container);
}

function openEditeElemForm(event) {
  editedHtmlElement = event.target.parentElement.parentElement;
  const editElementID = editedHtmlElement.id;
  const editeElementData = data.find((elem) => {
    return elem.id === +editElementID;
  });
  createElementForm.image.value = editeElementData.image;
  createElementForm.title.value = editeElementData.title;
  createElementForm.volume.value = editeElementData.volume;
  createElementForm.material.value = editeElementData.material;
  createElementForm.color.value = editeElementData.color;
  editElementModalBtn.style.display = "block";
  createElementFormBtn.style.display = "none";
  createElementModaleTitle.innerText = "Edit cup info";
  editedElement = editeElementData;
}

function saveEditedElement(event) {
  event.preventDefault();
  editedElement.image = createElementForm.image.value;
  editedElement.title = createElementForm.title.value;
  editedElement.volume = createElementForm.volume.value;
  editedElement.material = createElementForm.material.value;
  editedElement.color = createElementForm.color.value;
  editedHtmlElement.children[0].setAttribute("src", editedElement.image);
  editedHtmlElement.children[1].innerText = editedElement.title;
  editedHtmlElement.children[2].innerText = `Volume: ${editedElement.volume}`;
  editedHtmlElement.children[3].innerText = `Material: ${editedElement.material}`;
  editedHtmlElement.children[4].innerText = `Color: ${editedElement.color}`;
  editElementModalBtn.style.display = "none";
  createElementFormBtn.style.display = "block";
  clearForm();
  setDataToChannelStore();
}

function clearForm() {
  createElementForm.image.value = "";
  createElementForm.title.value = "";
  createElementForm.volume.value = "";
  createElementForm.material.value = "";
  createElementForm.color.value = "";
}

function gettDataFromChannelStore() {
  return JSON.parse(localStorage.getItem("cups"));
}

function renderElementsGrid(newData) {
  const dataForRender = newData ? newData : data;
  dataForRender.forEach((elem) => {
    createElement(elem);
  });
}

function deleteElem(elem) {
  const deleteElem = elem.target.parentElement.parentElement;
  data = data.filter((item) => {
    console.log(deleteElem.getAttribute("id"));
    if (item["id"] === +deleteElem.getAttribute("id")) {
      return false;
    } else return true;
  });
  deleteElem.remove();
  setDataToChannelStore();
  volumeValue.innerText = "";
}

function countVolume() {
  if (data.length > 0) {
    return data.reduce((previous, currentValue) => {
      return Number(previous) + Number(currentValue["volume"]);
    }, 0);
  }
}

function updateVolume() {
  volumeValue.innerText = `Total voume:  ${countVolume()}`;
}

function setDataToChannelStore() {
  localStorage.setItem("cups", JSON.stringify(data));
}

function sortByValue(event) {
  if (event.target.checked) {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      return a.volume - b.volume;
    });
    elementsContainer.innerHTML = "";
    renderElementsGrid(sortedData);
  } else {
    elementsContainer.innerHTML = "";
    renderElementsGrid();
  }
}

function searchByName(event) {
  event.preventDefault();
  const searchedValue = searchValue.value;
  const filtredList = data.filter((elem) => {
    return elem.title.includes(searchedValue);
  });
  if (filtredList.length === 0) {
    elementsContainer.innerHTML = "";
    elementsContainer.innerText = "Searched value is not found!";
    searchValue.value = "";
  } else {
    elementsContainer.innerHTML = "";
    renderElementsGrid(filtredList);
    searchValue.value = "";
  }
}
