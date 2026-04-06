export default function formatPhoneNumber(phone: string) {
  let formatted = phone.trim();
  if (formatted.startsWith("+233")) formatted = formatted.slice(1);
  else if (formatted.startsWith("0")) formatted = "233" + formatted.slice(1);
  return formatted;
}
