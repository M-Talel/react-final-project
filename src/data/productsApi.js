const BASE_URL = "https://my-products-api-0fkb.onrender.com";

async function requestJSON(url, options) {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed: ${res.status} ${res.statusText}${text ? ` - ${text}` : ""}`);
  }

  // json-server returns JSON for GET/POST/PUT.
  return res.json();
}

export async function fetchProducts() {
  // json-server supports /products
  return requestJSON(`${BASE_URL}/products`);
}

export async function createProduct(payload) {
  return requestJSON(`${BASE_URL}/products`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateProductById(id, payload) {
  return requestJSON(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

