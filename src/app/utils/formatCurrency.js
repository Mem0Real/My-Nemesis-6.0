export default function formatCurrency(price) {
  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ETB",
  });

  return currency.format(price);
}
