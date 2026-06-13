export const WHATSAPP_NUMBER = "918460107287";
export const PHONE_NUMBER = "+918460107287";
export const EMAIL = "hello@astrowithhrishi.com";
export const ADDRESS = "Ahmedabad, Gujarat, India";

export const waLink = (message: string, number = WHATSAPP_NUMBER) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export const openWhatsApp = (message: string, number = WHATSAPP_NUMBER) => {
  window.open(waLink(message, number), "_blank");
};
