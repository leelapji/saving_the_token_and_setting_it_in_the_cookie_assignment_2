// Simple base64 encoder
function base64UrlEncode(str) {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export const encrypt = (payload, secret) => {
  const header = {
    alg: "HS256",
    typ: "JWT"
  };

  // Add expiry time (60 seconds from now)
  const currentTime = Math.floor(Date.now() / 1000);
  const payloadWithExp = {
    ...payload,
    exp: currentTime + 60
  };

  const headerEncoded = base64UrlEncode(JSON.stringify(header));
  const payloadEncoded = base64UrlEncode(JSON.stringify(payloadWithExp));

  const signature = base64UrlEncode(
    CryptoJS.HmacSHA256(`${headerEncoded}.${payloadEncoded}`, secret).toString(CryptoJS.enc.Base64)
  );

  return `${headerEncoded}.${payloadEncoded}.${signature}`;
};
