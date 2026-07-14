const trackingId = (orders) => {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");

  const day = String(today.getDate()).padStart(2, "0");

  const date = `${year}${month}${day}`;

  const sequence = String(orders.length + 1).padStart(4, "0");

  return `TCS-${date}-${sequence}`;
};

export default trackingId;