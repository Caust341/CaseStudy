class inventoryManager {
    storageKey; productList;

    constructor() {
        this.storageKey = 'toybox_products';
        this.productList = this.getProductList();
    }

    getProductList() {
        const storeData = localStorage.getItem(this.storageKey);
        return storeData ? JSON.parse(storeData) : [];
    }

    saveProduct() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.productList))
    }

    addNewProduct(newProduct) {
        this.productList.push(newProduct);
        this.saveProduct();
    }

    deleteProduct(productId) {
        this.productList = this.productList.filter(toy => toy.id !== productId);
        this.saveProduct();
    }

    changeProduct(productId, updatedToy) {
        const index = this.productList.findIndex(toy => toy.id === productId);
        if (index !== -1) {
            this.productList[index] = updatedToy;
            this.saveProduct();
        }
    }

    sortProduct(criteria) {
        if (criteria === 'by-name') {
            this.productList.sort((a, b) => a.name.localeCompare(b.name));
        }
        else if (criteria === 'by-id') {
            this.productList.sort((a, b) => a.id.localeCompare(b.id));

        } else if (criteria === 'by-price') {
            this.productList.sort((a, b) => (parseFloat(a.price) - parseFloat(b.price)));
        }
    }

    searchProduct(search) {
        const loweredText = search.toLowerCase();
        return this.productList.filter((toy) => {
            const nameMatch = toy.name.toLowerCase().includes(loweredText);
            const idMatch = toy.id.toLowerCase().includes(loweredText);
            return nameMatch || idMatch;
        })
    }
}