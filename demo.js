
async function fetchData() {
    const urlParams = new URLSearchParams(window.location.search); 
    const productId = urlParams.get('product');  

    try {
       
        const response = await fetch(`/api/products/${productId}`);
        
   
        if (!response.ok) {
            throw new Error("Failed to fetch product data");
        }

     
        const data = await response.json();

       
        displayProduct(data);
    } catch (error) {
        console.error("Error fetching product:", error);
    }
}


function displayProduct(product) {
    const productInfo = document.getElementById("product-info");

    
    productInfo.innerHTML = `
        <h3>${product.name}</h3>
        <img src="${product.image}" alt="${product.name}">
        <p><strong>Price:</strong> $${product.price}</p>
        <ul>
            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
    `;
}


document.getElementById("fetch-data").addEventListener("click", fetchData);


window.onload = fetchData;
