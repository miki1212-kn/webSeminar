let products = []; // 商品の配列
let cart = []; // カートの配列

const selectors = {
  products: document.querySelector(".products"), // 商品表示エリア
  cartBtn: document.querySelector(".cart-btn"), // カートボタン
  cartQty: document.querySelector(".cart-qty"), // カート数量
  cartClose: document.querySelector(".cart-close"), // カートクローズボタン
  cart: document.querySelector(".cart"), // カート
  cartOverlay: document.querySelector(".cart-overlay"), // カートオーバーレイ
  cartClear: document.querySelector(".cart-clear"), // カートクリアボタン
  cartBody: document.querySelector(".cart-body"), // カートの中身
  cartTotal: document.querySelector(".cart-total"), // カート合計
};

const setupListeners = () => {
  document.addEventListener("DOMContentLoaded", initStore);

  // 商品のイベント
  selectors.products.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      addToCart(e.target);
    }
  });

  // カートのイベント
  selectors.cartBtn.addEventListener("click", showCart);
  selectors.cartOverlay.addEventListener("click", hideCart);
  selectors.cartClose.addEventListener("click", hideCart);
  selectors.cartBody.addEventListener("click", (e) => {
    if (e.target.dataset.btn) {
      const id = parseInt(e.target.closest(".cart-item").dataset.id);
      if (e.target.dataset.btn === "incr") increaseQty(id);
      if (e.target.dataset.btn === "decr") decreaseQty(id);
      saveCart();
      renderCart();
    }
  });
  selectors.cartClear.addEventListener("click", clearCart);
};

const initStore = () => {
  loadCart();
  loadProducts("https://fakestoreapi.com/products").then(() => {
    renderProducts();
    renderCart();
  });
};

const showCart = () => {
  selectors.cart.classList.add("show");
  selectors.cartOverlay.classList.add("show");
};

const hideCart = () => {
  selectors.cart.classList.remove("show");
  selectors.cartOverlay.classList.remove("show");
};

const clearCart = () => {
  cart = [];
  saveCart();
  renderCart();
  renderProducts();
  setTimeout(hideCart, 500);
};

const addToCart = (button) => {
  const id = parseInt(button.dataset.id);
  const inCart = cart.some((item) => item.id === id);

  if (inCart) {
    alert("アイテムはすでにカートにあります。");
    return;
  }

  cart.push({ id, qty: 1 });
  saveCart();
  renderProducts();
  renderCart();
  showCart();
};

const removeFromCart = (id) => {
  cart = cart.filter((item) => item.id !== id);
  if (cart.length === 0) setTimeout(hideCart, 500);
  renderProducts();
};

const increaseQty = (id) => {
  const item = cart.find((x) => x.id === id);
  if (item) item.qty++;
};

const decreaseQty = (id) => {
  const item = cart.find((x) => x.id === id);
  if (item) {
    item.qty--;
    if (item.qty === 0) removeFromCart(id);
  }
};

const saveCart = () => {
  localStorage.setItem("online-store", JSON.stringify(cart));
};

const loadCart = () => {
  const savedCart = localStorage.getItem("online-store");
  cart = savedCart ? JSON.parse(savedCart) : [];
};

const renderCart = () => {
  selectors.cartQty.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  selectors.cartQty.classList.toggle("visible", cart.length > 0);
  selectors.cartTotal.textContent = calculateTotal().toLocaleString("ja-JP", {
    style: "currency",
    currency: "JPY",
  });

  if (cart.length === 0) {
    selectors.cartBody.innerHTML =
      '<div class="cart-empty">カートは空です</div>';
    return;
  }

  selectors.cartBody.innerHTML = cart
    .map(({ id, qty }) => {
      const product = products.find((x) => x.id === id);
      const amount = product.price * qty;
      return `
      <div class="cart-item" data-id="${id}">
        <img src="${product.image}" alt="${product.title}" />
        <div class="cart-item-detail">
          <h3>${product.title}</h3>
          <h5>${product.price.toLocaleString("ja-JP", {
            style: "currency",
            currency: "JPY",
          })}</h5>
          <div class="cart-item-amount">
            <i class="bi bi-dash-lg" data-btn="decr"></i>
            <span class="qty">${qty}</span>
            <i class="bi bi-plus-lg" data-btn="incr"></i>
            <span class="cart-item-price">${amount.toLocaleString("ja-JP", {
              style: "currency",
              currency: "JPY",
            })}</span>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
};

const renderProducts = () => {
  selectors.products.innerHTML = products
    .map((product) => {
      const inCart = cart.some((x) => x.id === product.id);
      return `
      <div class="product">
        <img src="${product.image}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <h5>${product.price.toLocaleString("ja-JP", {
          style: "currency",
          currency: "JPY",
        })}</h5>
        <button data-id="${product.id}" ${inCart ? "disabled" : ""}>
          ${inCart ? "カートに入っています" : "カートに入れる"}
        </button>
      </div>
    `;
    })
    .join("");
};

const loadProducts = async (apiURL) => {
  try {
    const response = await fetch(apiURL);
    if (!response.ok)
      throw new Error(`HTTPエラー！ステータス=${response.status}`);
    products = await response.json();
  } catch (error) {
    console.error("fetch error:", error);
  }
};

const calculateTotal = () => {
  return cart.reduce((total, { id, qty }) => {
    const product = products.find((x) => x.id === id);
    return total + product.price * qty;
  }, 0);
};

setupListeners();
