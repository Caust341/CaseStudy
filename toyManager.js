const manager = new inventoryManager();

function showProductlist(list = manager.productList) {
    const listContainter = document.querySelector('.product-manage-list ul')
    listContainter.innerHTML = '';
    list.forEach(toy => {
        const Item = document.createElement('li');
        Item.innerHTML = `
            <div class="manage-item">
                                <img src=${toy.image} alt=${toy.name} class="item-image">
                                <div class="metadata">
                                    <div class="main-metadata">
                                        <h1>${toy.name}</h1>
                                        <span class="id">ID: ${toy.id}</span>
                                    </div>

                                    <div class="detailed-metadata">
                                        <ul>
                                            <li>
                                                <p>Price: $${toy.price}</p>
                                            </li>
                                            <li>
                                                <p>Age: ${toy.age}</p>
                                            </li>
                                            <li>
                                                <p>Theme: ${toy.theme}</p>
                                            </li>
                                            <li>
                                                <p>Stock: ${toy.stock}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="control-page">
                                    <button class="edit-btn" data-id="${toy.id}">Edit</button>
                                    <button class="remove-btn" data-id="${toy.id}">Remove</button>
                                </div>
                            </div>
        `;

        listContainter.appendChild(Item)
    });
}

function setUpInventoryUI() {
    const modal = document.getElementById('Modal');
    const modalForm = document.querySelector('.modal-form');
    const modalTitle = document.querySelector('.modal-header h2')
    const closeBtn = document.querySelector('.close-modal-btn');
    const cancelBtn = document.querySelector('.cancel-btn');

    document.querySelector('.add-item-btn').addEventListener('click', () => {
        modalForm.reset();
        modalTitle.textContent = "Add Product";
        modal.classList.add('active');
        modalForm.removeAttribute('edit-id');
    });

    document.querySelector('.product-manage-list ul').addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const DeleteId = event.target.getAttribute('data-id');
            const isConfirmed = confirm("Are you sure you want to delete this toy?");
            if (isConfirmed) {
                manager.deleteProduct(DeleteId);
                showProductlist();
            }
        } else if (event.target.classList.contains('edit-btn')) {
            const EditId = event.target.getAttribute('data-id');
            const selectedProduct = manager.productList.find(t => t.id === EditId);

            if (selectedProduct) {
                document.getElementById("form-name").value = selectedProduct.name;
                document.getElementById("form-id").value = selectedProduct.id;
                document.getElementById("form-price").value = selectedProduct.price;
                document.getElementById("form-age-limit").value = selectedProduct.age;
                document.getElementById("form-stock").value = selectedProduct.stock;
                document.getElementById("desc-form").value = selectedProduct.description;
                document.getElementById("theme-form").value = selectedProduct.theme;
                document.getElementById("img-src-form").value = selectedProduct.image;

                modalForm.setAttribute('edit-id', EditId);
                modalTitle.textContent = "Edit Product";
                modal.classList.add("active");

            }

        }
    });

    if (modalForm) {
        modalForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const nameValue = document.getElementById("form-name").value;
            const idValue = document.getElementById("form-id").value;
            const priceValue = document.getElementById("form-price").value;
            const ageValue = document.getElementById("form-age-limit").value;
            const stockValue = document.getElementById("form-stock").value;
            const descValue = document.getElementById("desc-form").value;
            const themeValue = document.getElementById("theme-form").value;
            const imageValue = document.getElementById("img-src-form").value;


            if (!idValue || !nameValue || !priceValue) {
                alert("Please fill out all mandatory fields: ID, Name, and Price!");
                return;
            }
            const submittedProduct = new Product(idValue, nameValue, priceValue, stockValue, themeValue, ageValue, descValue, imageValue);

            const editingId = modalForm.getAttribute('edit-id');
            if (editingId) {
                console.log(editingId);
                manager.changeProduct(editingId, submittedProduct);
            } else {
                manager.addNewProduct(submittedProduct);
            }
            showProductlist();
            modalForm.reset();
            modalForm.removeAttribute('edit-id');
            modal.classList.remove('active');

        });
    }

    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    cancelBtn.addEventListener('click', () => modal.classList.remove('active'));
}

function sortDropdown() {
    const sortMenu = document.getElementById('sort-variants');
    sortMenu.addEventListener('change', (event) => {
        const selectedCriteria = event.target.value;
        manager.sortProduct(selectedCriteria);
        showProductlist();

    });
}


function setUpSearchProduct() {
    const searchInput = document.getElementById('search-bar');
    const searchBtn = document.getElementById('search-item-btn');

    if (!searchInput || !searchBtn) return;

    const performSearch = () => {
        const typedText = searchInput.value;
        const filteredList = manager.searchProduct(typedText);
        showProductlist(filteredList);
    };


    searchBtn.addEventListener('click', (event) => {
        event.preventDefault();
        performSearch();
    });


    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            performSearch();
        }
    })

    searchInput.addEventListener('input', (event) => {
        if (event.target.value.trim() === '') {
            showProductlist(manager.productList);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    showProductlist();
    setUpInventoryUI();
    sortDropdown();
    setUpSearchProduct();
});
