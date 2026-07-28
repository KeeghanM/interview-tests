const apiBase = 'http://localhost:8000'
const ordersElement = document.querySelector('#orders')
const titleElement = document.querySelector('#title')
const timelineElement = document.querySelector('#timeline')

async function loadOrders() {
  const orders = await fetch(`${apiBase}/api/orders`).then((response) =>
    response.json(),
  )
  ordersElement.innerHTML = ''
  for (const order of orders) {
    const button = document.createElement('button')
    button.textContent = `#${order.id} - ${order.customer_name} - ${order.status}`
    button.addEventListener('click', () => loadTimeline(order.id, button))
    ordersElement.appendChild(button)
  }
  if (orders[0]) {
    ordersElement.querySelector('button').click()
  }
}

async function loadTimeline(orderId, selectedButton) {
  for (const button of ordersElement.querySelectorAll('button')) {
    button.classList.toggle('active', button === selectedButton)
  }
  const payload = await fetch(`${apiBase}/api/orders/${orderId}/timeline`).then(
    (response) => response.json(),
  )
  titleElement.textContent = `Order #${payload.order.id} timeline`
  timelineElement.innerHTML = payload.timeline
    .map(
      (event) =>
        `<li><strong>${event.type}</strong><br>${event.message}<br><span class="muted">${new Date(event.created_at).toLocaleString()}</span></li>`,
    )
    .join('')
}

loadOrders().catch((error) => {
  titleElement.textContent = 'Unable to load orders'
  timelineElement.innerHTML = `<li>${error.message}</li>`
})
