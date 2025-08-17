// Navigation and Cart Drawer Component
class Navigation {
  constructor() {
    this.cartDrawer = null;
    this.cartToggle = null;
    this.cartOverlay = null;
    this.isOpen = false;
    this.init();
  }

  init() {
    this.cartToggle = document.getElementById('cart-toggle');
    this.cartDrawer = document.getElementById('cart-drawer');
    this.cartOverlay = document.getElementById('cart-overlay');
    
    if (this.cartToggle && this.cartDrawer) {
      this.attachEventListeners();
    }
  }

  attachEventListeners() {
    // Cart toggle button
    this.cartToggle.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleCart();
    });

    // Close cart when clicking overlay
    if (this.cartOverlay) {
      this.cartOverlay.addEventListener('click', () => {
        this.toggleCart();
      });
    }

    // Close cart when clicking close buttons
    const closeBtns = document.querySelectorAll('.js-cart-close');
    if (closeBtns) {
      closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.toggleCart();
        });
      });
    }

    // Close cart with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.toggleCart();
      }
    });

    // Listen for custom event when product is added to cart
    document.addEventListener('product-added-to-cart', () => {
      if (!this.isOpen) {
        this.toggleCart();
      }
    });
  }

  toggleCart() {
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      this.cartDrawer.classList.add('cart-drawer--open');
      if (this.cartOverlay) this.cartOverlay.classList.add('cart-overlay--visible');
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      this.cartDrawer.classList.remove('cart-drawer--open');
      if (this.cartOverlay) this.cartOverlay.classList.remove('cart-overlay--visible');
      
      // Restore body scroll
      document.body.style.overflow = '';
    }
  }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
});
