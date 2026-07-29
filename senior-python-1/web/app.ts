interface Order {
  id: number
  customer_name: string
  status: string
}

interface TimelineEvent {
  type: string
  message: string
  created_at: string
}

interface TimelinePayload {
  order: Order
  timeline: TimelineEvent[]
}

const apiBase = 'http://localhost:8000'

function getElement<ElementType extends Element>(selector: string): ElementType {
  const element = document.querySelector<ElementType>(selector)
  if (!element) {
    throw new Error(`Required page element is missing: ${selector}`)
  }
  return element
}

const ordersElement = getElement<HTMLElement>('#orders')
const titleElement = getElement<HTMLElement>('#title')
const timelineElement = getElement<HTMLOListElement>('#timeline')

async function loadOrders(): Promise<void> {
  const orders = await fetch(`${apiBase}/api/orders`).then(
    (response) => response.json() as Promise<Order[]>,
  )
  ordersElement.innerHTML = ''
  for (const order of orders) {
    const button = document.createElement('button')
    button.textContent = `#${order.id} - ${order.customer_name} - ${order.status}`
    button.addEventListener('click', () => loadTimeline(order.id, button))
    ordersElement.appendChild(button)
  }
  ordersElement.querySelector<HTMLButtonElement>('button')?.click()
}

async function loadTimeline(
  orderId: number,
  selectedButton: HTMLButtonElement,
): Promise<void> {
  for (const button of ordersElement.querySelectorAll('button')) {
    button.classList.toggle('active', button === selectedButton)
  }
  const payload = await fetch(`${apiBase}/api/orders/${orderId}/timeline`).then(
    (response) => response.json() as Promise<TimelinePayload>,
  )
  titleElement.textContent = `Order #${payload.order.id} timeline`
  timelineElement.innerHTML = payload.timeline
    .map(
      (event) =>
        `<li><strong>${event.type}</strong><br>${event.message}<br><span class="muted">${new Date(event.created_at).toLocaleString()}</span></li>`,
    )
    .join('')
}

loadOrders().catch((error: unknown) => {
  titleElement.textContent = 'Unable to load orders'
  timelineElement.innerHTML = `<li>${error instanceof Error ? error.message : String(error)}</li>`
})
