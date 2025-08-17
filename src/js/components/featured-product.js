// Featured Product Component
class FeaturedProduct {
  constructor() {
    this.addToCartBtn = null;
    this.init();
  }

  init() {
    this.addToCartBtn = document.getElementById('add-to-cart-btn');
    
    if (this.addToCartBtn) {
      this.attachEventListeners();
    }
  }

  attachEventListeners() {
    this.addToCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleAddToCart();
    });
  }

  handleAddToCart() {
    // Store original button content while in loading state
    const originalText = this.addToCartBtn.textContent;
    this.addToCartBtn.innerHTML = '<span class="button--loading-spinner"></span>';
    this.addToCartBtn.disabled = true;
    
    // Simulate adding to cart for 1 second
    setTimeout(() => {
      // Fire custom event after loading
      const customEvent = new CustomEvent('product-added-to-cart', {
        detail: {
          productId: 'chicken-dog-food',
          productName: 'Natures Menu Dog Food Can Chicken',
          price: 22.81,
          quantity: 1
        },
        bubbles: true
      });
      
      document.dispatchEvent(customEvent);
      
      // Reset button
      this.addToCartBtn.innerHTML = originalText;
      this.addToCartBtn.disabled = false;
    }, 1000);
  }
}

// Initialize featured product when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FeaturedProduct();
});
