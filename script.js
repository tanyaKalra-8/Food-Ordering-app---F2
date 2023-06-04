async function getMenu() {
    try {
      const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
      const data = await response.json();
  
      const menuContainer = document.getElementById('menu');
      data.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.innerHTML = `
        <div class = "item-container">
          <h3 class="item">${item.name}</h3>
          <img class = "image" src="${item.imgSrc}" alt="${item.imgSrc}" />
          <p>$${item.price}</p>
          </div>`;
        menuContainer.appendChild(menuItem);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function takeOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        const burgers = ['burger 1', 'Burger 2', 'Burger 3'];
        const randomBurgers = [];
        for (let i = 0; i < 3; i++) {
          const randomIndex = Math.floor(Math.random() * burgers.length);
          randomBurgers.push(burgers[randomIndex]);
        }
        resolve(randomBurgers);
      }, 2500);
    });
  }
  
  function orderPrep() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ order_status: true, paid: false });
      }, 1500);
    });
  }
  
  function payOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ order_status: true, paid: true });
      }, 1000);
    });
  }
  
  function thankyouFnc() {
    setTimeout(() => {
        alert('Thank you for eating with us today!');
    }, 500)
  }
  
  async function placeOrder() {
    try {
      const order = await takeOrder();
      const orderStatus = document.getElementById('order-status');
      orderStatus.textContent = `Order: ${order.join(', ')}`;
  
      const prepStatus = await orderPrep();
      const paymentStatus = document.getElementById('payment-status');
      paymentStatus.textContent = `Order Status: ${prepStatus.order_status}, Paid: ${prepStatus.paid}`;
  
      // Enable the "Pay" button
      const payButton = document.getElementById('pay-button');
      payButton.disabled = false;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function pay() {
    try {
      const payment = await payOrder();
      const paymentStatus = document.getElementById('payment-status');
      paymentStatus.textContent = `Order Status: ${payment.order_status}, Paid: ${payment.paid}`;
  
      if (payment.paid) {
        thankyouFnc();
      }
  
      // Disable the "Pay" button
      const payButton = document.getElementById('pay-button');
      payButton.disabled = true;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Fetch the menu on page load
  getMenu();
