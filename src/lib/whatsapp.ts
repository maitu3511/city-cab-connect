export const WHATSAPP_NUMBER = "919558565655";
export const PHONE_NUMBER = "+91 9558565655";
export const EMAIL = "hello@astrowithhrishi.com";
export const ADDRESS = "Vadodara, Gujarat, India";

export const waLink = (message: string, number = WHATSAPP_NUMBER) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export const openWhatsApp = (message: string, number = WHATSAPP_NUMBER) => {
  window.open(waLink(message, number), "_blank");
};
