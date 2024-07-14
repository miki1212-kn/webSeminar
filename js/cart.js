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
  document.addEventListener("DOMContentLoaded", initStore); // DOMが読み込まれたら初期化

  // 商品のイベント
  selectors.products.addEventListener("click", addToCart);

  // カートのイベント
  selectors.cartBtn.addEventListener("click", showCart);
  selectors.cartOverlay.addEventListener("click", hideCart);
  selectors.cartClose.addEventListener("click", hideCart);
  selectors.cartBody.addEventListener("click", updateCart);
  selectors.cartClear.addEventListener("click", clearCart);
};

const initStore = () => {
  loadCart(); // カートのデータをロード
  loadProducts("https://fakestoreapi.com/products") // 商品データをロード
    .then(renderProducts) // 商品を描画
    .finally(renderCart); // カートを描画
};

const showCart = () => {
  selectors.cart.classList.add("show"); // カートを表示
  selectors.cartOverlay.classList.add("show"); // オーバーレイを表示
};

const hideCart = () => {
  selectors.cart.classList.remove("show"); // カートを非表示
  selectors.cartOverlay.classList.remove("show"); // オーバーレイを非表示
};

const clearCart = () => {
  cart = []; // カートをクリア
  saveCart(); // カートを保存
  renderCart(); // カートを描画
  renderProducts(); // 商品を再描画
  setTimeout(hideCart, 500); // 500ms後にカートを隠す
};

const addToCart = (e) => {
  if (e.target.hasAttribute("data-id")) {
    // データIDがある場合
    const id = parseInt(e.target.dataset.id); // 商品IDを取得
    const inCart = cart.find((x) => x.id === id); // カート内に同じ商品があるか確認

    if (inCart) {
      alert("アイテムはすでにカートにあります。");
      return;
    }

    cart.push({ id, qty: 1 });
    saveCart();
    renderProducts();
    renderCart();
    showCart();
  }
};

const removeFromCart = (id) => {
  cart = cart.filter((x) => x.id !== id); // カートからアイテムを削除

  // 最後のアイテムが削除されたらカートを閉じる
  cart.length === 0 && setTimeout(hideCart, 500);

  renderProducts(); // 商品を再描画
};

const increaseQty = (id) => {
  const item = cart.find((x) => x.id === id); // カートからアイテムを取得
  if (!item) return;

  item.qty++; // 数量を増加
};

const decreaseQty = (id) => {
  const item = cart.find((x) => x.id === id); // カートからアイテムを取得
  if (!item) return;

  item.qty--; // 数量を減少

  if (item.qty === 0) removeFromCart(id); // 数量が0なら削除
};

const updateCart = (e) => {
  if (e.target.hasAttribute("data-btn")) {
    // ボタンにデータ属性がある場合
    const cartItem = e.target.closest(".cart-item"); // カートアイテムを取得
    const id = parseInt(cartItem.dataset.id); // 商品IDを取得
    const btn = e.target.dataset.btn; // ボタンのデータを取得

    btn === "incr" && increaseQty(id); // 増加ボタンの場合
    btn === "decr" && decreaseQty(id); // 減少ボタンの場合

    saveCart(); // カートを保存
    renderCart(); // カートを再描画
  }
};

const saveCart = () => {
  localStorage.setItem("online-store", JSON.stringify(cart)); // カートをローカルストレージに保存
};

const loadCart = () => {
  cart = JSON.parse(localStorage.getItem("online-store")) || []; // カートをロード
};

//* 描画関数
const renderCart = () => {
  // カートの数量を表示
  const cartQty = cart.reduce((sum, item) => {
    return sum + item.qty;
  }, 0);

  selectors.cartQty.textContent = cartQty; // カートの数量を更新
  selectors.cartQty.classList.toggle("visible", cartQty); // 表示状態を更新

  // カートの合計を表示
  selectors.cartTotal.textContent = calculateTotal().format();

  // カートが空の場合
  if (cart.length === 0) {
    selectors.cartBody.innerHTML =
      '<div class="cart-empty">カートは空です</div>';
    return;
  }

  // カート内の商品を表示
  selectors.cartBody.innerHTML = cart
    .map(({ id, qty }) => {
      const product = products.find((x) => x.id === id); // 商品情報を取得
      const { title, image, price } = product; // 商品情報を分解
      const amount = price * qty; // 合計金額を計算

      return `
        <div class="cart-item" data-id="${id}">
          <img src="${image}" alt="${title}" />
          <div class="cart-item-detail">
            <h3>${title}</h3>
            <h5>${price.format()}</h5>
            <div class="cart-item-amount">
              <i class="bi bi-dash-lg" data-btn="decr"></i>
              <span class="qty">${qty}</span>
              <i class="bi bi-plus-lg" data-btn="incr"></i>

              <span class="cart-item-price">
                ${amount.format()}
              </span>
            </div>
          </div>
        </div>`;
    })
    .join("");
};

const renderProducts = () => {
  selectors.products.innerHTML = products
    .map((product) => {
      const { id, title, image, price } = product; // 商品情報を分解

      // カート内に商品があるか確認
      const inCart = cart.find((x) => x.id === id);
      const disabled = inCart ? "disabled" : ""; // すでにカートにある場合は無効
      const text = inCart ? "カートに入っています" : "カートに入れる"; // ボタンのテキスト

      return `
    <div class="product">
          <img src="${image}" alt="${title}" />
      <h3>${title}</h3>
      <h5>${price.format()}</h5>
      <button ${disabled} data-id=${id}>${text}</button>
    </div>
    `;
    })
    .join("");
};

//* API関数
const loadProducts = async (apiURL) => {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`HTTPエラー！ステータス=${response.status}`);
    }
    products = await response.json(); // 商品データを取得
    console.log(products);
  } catch (error) {
    console.error("フェッチエラー:", error);
  }
};

//* ヘルパー関数
const calculateTotal = () => {
  return cart
    .map(({ id, qty }) => {
      const { price } = products.find((x) => x.id === id); // 商品の価格を取得
      return qty * price; // 合計金額を計算
    })
    .reduce((sum, number) => {
      return sum + number; // 合計を返す
    }, 0);
};

// 数値フォーマット関数
Number.prototype.format = function () {
  return this.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

//* 初期化
setupListeners(); // リスナーをセットアップ
