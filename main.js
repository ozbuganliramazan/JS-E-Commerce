const categoryList = document.querySelector('.category-list');
const productList = document.querySelector('.product-list');
const sepetBtn = document.querySelector('#sepet');
const closeBtn = document.querySelector('#close');
const modal = document.querySelector('.modal-wrapper');

const fiyatSpan = document.querySelector('#fiyat');
const modalList = document.getElementById('modal-list');

document.addEventListener('DOMContentLoaded', () => {
  //callback > içerisinde fatklı fonksiyon çalıştıran fonksiyonlar
  fetchCategories();
  fetchProducts();
});

function fetchCategories() {
  fetch('https://api.escuelajs.co/api/v1/categories')
    .then((res) => res.json())
    .then((data) =>
      // DATA Dizisinin içindeki her bir eleman için htmle categoryDivi gönderdik
      data.slice(0, 4).forEach((category) => {
        // Gelen her obje için div oluşturma
        const categoryDiv = document.createElement('div');
        // oluşan elemana class verme
        categoryDiv.classList.add('category');
        //  elemanın html içeriğini değiştirme
        categoryDiv.innerHTML = `
             <img src="${category.image}" />
             <span>${category.name}</span>
        `;
        // oluşan elemanı htmle gönderme
        categoryList.appendChild(categoryDiv);
      })
    )
    .catch((err) => console.log(err));
}

function fetchProducts() {
  fetch('https://api.escuelajs.co/api/v1/products')
    .then((res) => res.json())
    .then((data) =>
      data.slice(0, 20).forEach((product) => {
        const numara = 30;
        // div oluşturma
        const productDiv = document.createElement('div');
        // dive class ekleme
        productDiv.classList.add('product');
        // divin içeriğini değiştirme
        productDiv.innerHTML = `
            <img src="${product.images[0]}" />
            <p> ${product.title}</p>
            <p>${product.category.name}</p>
            <div class="product-info">
              <span> ${product.price} $</span>
              <button onclick="sepeteEkle({name:'${product.title}',id:'${product.id}',price:'${product.price}',amount:1})" >Sepete Ekle</button>
            </div>               
        `;
        productList.appendChild(productDiv);
      })
    )
    .catch((err) => console.log(err));
}

// sepeti açma kapama
const basket = [];
let toplamfiyat = 0;

function listBasket() {
  basket.forEach((eleman) => {
    // SEPET ELEMANININ DİVİNİ OLUŞTURMA
    const basketItem = document.createElement('div');
    basketItem.classList.add('sepetItem');
    basketItem.innerHTML = `
            <h2>${eleman.name}</h2>
            <h2>${eleman.price} $</h2>
            <p>Miktar: ${eleman.amount}</p>
    `;
    modalList.appendChild(basketItem);
    toplamfiyat += Number(eleman.price) * eleman.amount;
  });
  fiyatSpan.innerText = toplamfiyat;
}

sepetBtn.addEventListener('click', () => {
  // sepeti açar
  toggleSepet();
  // sepete elemanları ekler
  listBasket();
});
closeBtn.addEventListener('click', () => {
  // sepet kapatır
  toggleSepet();

  // spet kapandığında listenin içini temizledik
  modalList.innerHTML = '';
});

function toggleSepet() {
  modal.classList.toggle('active');
}

// SEPETE ELEMAN EKLEME

function sepeteEkle(param) {
  // 3 == "3" > true
  // 3 === "3"  > false
  const foundItem = basket.find((eleman) => eleman.id == param.id);

  if (foundItem) {
    foundItem.amount += 1;
  } else {
    basket.push(param);
  }


}
