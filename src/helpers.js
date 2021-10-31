export const money = (number, suffix = "EGP") => 
   `${Number(number ?? 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} ${suffix}`
;
