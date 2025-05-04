// === Datos Globales ===
const galleryDataKey = "galleryImages";
let galleryItems = [];

// === Funciones de Persistencia ===
function loadGalleryFromStorage() {
  const stored = localStorage.getItem(galleryDataKey);
  galleryItems = stored ? JSON.parse(stored) : [];
}

function saveGalleryToStorage() {
  localStorage.setItem(galleryDataKey, JSON.stringify(galleryItems));
}

// === Creación de Componentes ===
function createHeader(title = "Galería2H") {
    const header = document.createElement("header");
    header.innerHTML = `<h1 style="
      margin: 0;
      font-family: 'Permanent Marker', cursive;
      font-size: 2.5rem;
      color: #f0f0f0;
      text-shadow: 1px 1px #555;
    ">${title}</h1>`;
  
    header.style.textAlign = "center";
    header.style.padding = "1rem";
    header.style.backgroundColor = "#000"; // Fondo negro
  
    // Cargar la fuente "Permanent Marker"
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  
    return header;
}

function createSidebar(onRegisterClick) {
    const sidebar = document.createElement("aside");
    sidebar.style.width = "20%";
    sidebar.style.float = "left";
    sidebar.style.backgroundColor = "#f4f4f4"; // Fondo claro neutro
    sidebar.style.height = "100vh";
    sidebar.style.padding = "1rem";
    sidebar.style.color = "#111";
    sidebar.style.fontFamily = "'Permanent Marker', cursive";
  
    const RegistrarBtn = document.createElement("button"); // Renombrado a RegistrarBtn
    RegistrarBtn.textContent = "Registrar nueva imagen";
    RegistrarBtn.style.display = "block";
    RegistrarBtn.style.marginBottom = "1rem";
    RegistrarBtn.style.cursor = "pointer";
    RegistrarBtn.style.padding = "0.6rem 1rem";
    RegistrarBtn.style.border = "none";
    RegistrarBtn.style.width = "100%";
    RegistrarBtn.style.backgroundColor = "#e0e0e0"; // Gris claro
    RegistrarBtn.style.color = "#111";
    RegistrarBtn.style.fontSize = "1rem";
    RegistrarBtn.style.fontFamily = "'Permanent Marker', cursive";
    RegistrarBtn.style.borderRadius = "4px";
  
    // Hover sutil
    RegistrarBtn.addEventListener("mouseover", () => {
      RegistrarBtn.style.backgroundColor = "#d0d0d0";
    });
    RegistrarBtn.addEventListener("mouseout", () => {
      RegistrarBtn.style.backgroundColor = "#e0e0e0";
    });
  
    // Fuente grafiti (ligera)
    const fontLink = document.createElement("link");
    fontLink.href = "https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
  
    RegistrarBtn.addEventListener("click", onRegisterClick);
    sidebar.appendChild(RegistrarBtn);
    return sidebar;
}

function createGalleryContainer() {
  const container = document.createElement("section");
  container.style.marginLeft = "22%";
  container.style.padding = "1rem";
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.gap = "1rem";
  return container;
}

function renderGallery(container) {
  container.innerHTML = "";
  galleryItems.forEach(item => {
    const div = document.createElement("div");
    div.className = "gallery-item";
    div.style.border = "1px solid #ccc";
    div.style.padding = "0.5rem";
    div.style.width = "200px";
    div.style.textAlign = "center";

    const img = document.createElement("img");
    img.src = item.url;
    img.alt = item.description;
    img.style.maxWidth = "100%";
    img.style.height = "auto";

    const p = document.createElement("p");
    p.textContent = item.description;

    div.appendChild(img);
    div.appendChild(p);
    container.appendChild(div);
  });
}

function createFooter() {
    const footer = document.createElement("footer");
    footer.textContent = "Laboratorio 1 - Paúl Gualotuña - 21602";
    footer.style.clear = "both";
    footer.style.textAlign = "center";
    footer.style.marginTop = "2rem";
    footer.style.padding = "1rem";
    footer.style.backgroundImage = "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')";
    footer.style.backgroundColor = "#111"; // Fondo oscuro como el body
    footer.style.color = "#f0f0f0";
    footer.style.fontFamily = "'Courier New', Courier, monospace";
    footer.style.borderTop = "3px solid #444"; // Opcional: un borde sutil
    return footer;
}

// === Página Principal ===
function setupHomePage() {
  loadGalleryFromStorage();

  const body = document.body;
  body.innerHTML = "";

  body.style.backgroundImage = "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')";

  const header = createHeader();
  const sidebar = createSidebar(() => {
    window.location.href = "registro.html";
  });

  const galleryContainer = createGalleryContainer();
  renderGallery(galleryContainer);

  const footer = createFooter();

  body.appendChild(header);
  body.appendChild(sidebar);
  body.appendChild(galleryContainer);
  body.appendChild(footer);
}

// === Página de Registro ===
function setupRegisterPage() {
  const body = document.body;
  body.innerHTML = "";

  const header = createHeader("Registrar Nueva Imagen");
  body.appendChild(header);

  // Botón para regresar a inicio
  const RegresarBtn = document.createElement("button");
  RegresarBtn.type = "button";
  RegresarBtn.textContent = "⬅️ Regresar a Inicio";
  RegresarBtn.style.backgroundColor = "#555";
  RegresarBtn.style.color = "white";
  RegresarBtn.style.padding = "0.5rem 1rem";
  RegresarBtn.style.border = "none";
  RegresarBtn.style.cursor = "pointer";

  // Evento para regresar
  RegresarBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  const form = document.createElement("form");
  form.style.margin = "2rem auto";
  form.style.width = "80%";
  form.style.maxWidth = "500px";
  form.style.display = "flex";
  form.style.flexDirection = "column";
  form.style.gap = "1rem";

  // Campo URL
  const urlInput = document.createElement("input");
  urlInput.type = "text";
  urlInput.placeholder = "URL de la imagen";
  urlInput.required = true;

  // Campo Descripción
  const descInput = document.createElement("input");
  descInput.type = "text";
  descInput.placeholder = "Descripción (mínimo 3 caracteres)";
  descInput.required = true;

  // Botón Submit
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Agregar Imagen";
  submitBtn.style.backgroundColor = "#4CAF50";
  submitBtn.style.color = "white";
  submitBtn.style.padding = "0.5rem 1rem";
  submitBtn.style.border = "none";
  submitBtn.style.cursor = "pointer";

  form.appendChild(RegresarBtn); 

  // Mensaje de error
  const errorMsg = document.createElement("div");
  errorMsg.style.color = "red";
  errorMsg.style.display = "none";

  form.appendChild(urlInput);
  form.appendChild(descInput);
  form.appendChild(submitBtn);
  form.appendChild(errorMsg);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const url = urlInput.value.trim();
    const description = descInput.value.trim();

    if (!url || description.length < 3) {
      errorMsg.textContent = "La URL es obligatoria y la descripción debe tener al menos 3 caracteres.";
      errorMsg.style.display = "block";
      return;
    }

    errorMsg.style.display = "none";

    loadGalleryFromStorage();
    galleryItems.push({ url, description });
    saveGalleryToStorage();

    // Redirigir a la página principal
    window.location.href = "index.html";
  });

  body.appendChild(form);
}

// === Detectar página actual y ejecutar configuración ===
const currentPage = window.location.pathname.split("/").pop();

if (currentPage === "index.html" || currentPage === "") {
  setupHomePage();
} else if (currentPage === "registro.html") {
  setupRegisterPage();
}
