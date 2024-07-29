export function deepMerge(target, source) {
  // Verificamos si target es un objeto o un array
  if (typeof target !== 'object' || target === null) {
    target = Array.isArray(source) ? [] : {};
  }

  // Iteramos sobre las propiedades del source
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      if (Array.isArray(source[key])) {
        // Si la propiedad es un array, verificamos si target también lo es y los concatenamos
        if (!Array.isArray(target[key])) {
          target[key] = [];
        }
        target[key] = target[key].concat(source[key]);
      } else if (typeof source[key] === 'object' && source[key] !== null) {
        // Si la propiedad es un objeto, llamamos recursivamente a deepMerge
        if (!target[key] || typeof target[key] !== 'object') {
          target[key] = {};
        }
        target[key] = deepMerge(target[key], source[key]);
      } else {
        // Si no es un objeto ni un array, simplemente copiamos el valor
        target[key] = source[key];
      }
    }
  }

  return target;
}