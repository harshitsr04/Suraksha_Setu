// app/lib/utils.js
export function cn(...inputs) {
  return inputs
    .flatMap(i =>
      typeof i === "string"
        ? i
        : typeof i === "object" && i !== null
        ? Object.entries(i)
            .filter(([_, value]) => Boolean(value))
            .map(([key]) => key)
        : []
    )
    .filter(Boolean)
    .join(" ");
}
