class Product {
    id; name; price; stock; theme; age; description; image;
    constructor(id, name, price, stock, theme, age, description, image) {
        this.id = id;
        this.name = name;
        this.price = parseFloat(price);
        this.stock = parseInt(stock);
        this.theme = theme;
        this.age = age;
        this.description = description;
        this.image = image;       
    }
}