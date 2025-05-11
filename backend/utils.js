function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function getMimeAndSize(base64) {
  try {
    if (!base64) return { valid: false };
    const matches = base64.match(/^data:(.+);base64,(.*)$/);
    if (!matches) return { valid: false };
    const mime = matches[1];
    const buffer = Buffer.from(matches[2], "base64");
    return {
      valid: true,
      mime,
      size: Math.round(buffer.length / 1024)
    };
  } catch {
    return { valid: false };
  }
}

module.exports = { isPrime, getMimeAndSize };