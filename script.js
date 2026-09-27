// ========================================
// PRODUCT POPUP
// ========================================

function openProduct(image, name, style, size, price) {
  document.getElementById("detailImage").src = image;
  document.getElementById("detailImage").alt = name;

  document.getElementById("detailName").textContent = name;
  document.getElementById("detailStyle").textContent = style;
  document.getElementById("detailPrice").textContent = price;

  document.getElementById("detailSize").textContent = size ? "📏 " + size : "";

  document.getElementById("modal").style.display = "flex";
}

// ========================================
// CLOSE POPUP
// ========================================

function closeProduct() {
  const modal = document.getElementById("modal");

  if (modal) {
    modal.style.display = "none";
  }
}

// ========================================
// CLICK OUTSIDE POPUP TO CLOSE
// ========================================

document.addEventListener("click", function (event) {
  const modal = document.getElementById("modal");

  if (modal && event.target === modal) {
    closeProduct();
  }
});

// ========================================
// ORDER
// ========================================

function orderProduct() {
  alert(
    "Cảm ơn bạn 💕 Vui lòng gửi ảnh + mã sản phẩm cho shop để đặt hàng!\n\n" +
      "謝謝你 💕 請將款式照片 + 商品編號傳給我們，即可訂購！",
  );
}

// ========================================
// RANDOM
// ========================================

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

// ========================================
// LOAD ALL PRODUCTS
// ========================================

async function loadAllProducts() {
  const allProducts = document.getElementById("allProducts");

  // Nếu không có allProducts
  if (!allProducts) {
    return;
  }

  // 4 FILE DANH MỤC
  const categoryPages = [
    "cat-eye.html",
    "y2k.html",
    "us-uk.html",
    "other.html",
  ];

  let products = [];

  // ========================================
  // ĐỌC 4 FILE
  // ========================================

  for (const page of categoryPages) {
    try {
      const response = await fetch(page);

      if (!response.ok) {
        console.error("Không thể đọc file:", page);

        continue;
      }

      const html = await response.text();

      const parser = new DOMParser();

      const documentPage = parser.parseFromString(html, "text/html");

      const pageProducts = documentPage.querySelectorAll(".product-card");

      console.log(page, "→ tìm thấy", pageProducts.length, "sản phẩm");

      pageProducts.forEach(function (product) {
        products.push(product.cloneNode(true));
      });
    } catch (error) {
      console.error("Lỗi khi đọc:", page, error);
    }
  }

  // ========================================
  // TRỘN NGẪU NHIÊN
  // ========================================

  shuffle(products);

  // ========================================
  // XÓA NỘI DUNG CŨ
  // ========================================

  allProducts.innerHTML = "";

  // ========================================
  // KHÔNG CÓ SẢN PHẨM
  // ========================================

  if (products.length === 0) {
    allProducts.innerHTML = `
      <p style="
        grid-column: 1 / -1;
        text-align: center;
        padding: 50px;
        font-size: 18px;
      ">
        😢 Không tìm thấy sản phẩm.
      </p>
    `;

    return;
  }

  // ========================================
  // HIỂN THỊ SẢN PHẨM
  // ========================================

  products.forEach(function (product) {
    allProducts.appendChild(product);
  });
}

// ========================================
// START
// ========================================

loadAllProducts();
