export const money = (number, suffix = "EGP") =>
  `${Number(number ?? 0)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")} ${suffix}`;

export const JSON2FD = (json) => {
  const fd = new FormData();

  for (let key in json) {
    let value = json[key];

    if (value) {
      if (Array.isArray(value)) {
        value = Array.from(value);

        key = `${key}[]`;

        for (const item of value) {
          fd.append(key, item);
        }
      } else {
        fd.append(key, value);
      }
    }
  }

  return fd;
};
