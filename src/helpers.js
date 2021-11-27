export const money = (number, suffix = "EGP") =>
  `${Number(number ?? 0)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")} ${suffix}`;

export const JSON2FD = json => {
  const fd = new FormData();

  for (const key in json) {
    const value = json[key];

    if (value) {
      if (Array.isArray(value)) {
        value = JSON.stringify(value);
      }

      fd.append(key, value);
    }
  }

  return fd;
};
