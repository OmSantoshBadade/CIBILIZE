export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "INR";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {},
) {
  const { currency = "INR", notation = "standard" } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(numericPrice);
}
