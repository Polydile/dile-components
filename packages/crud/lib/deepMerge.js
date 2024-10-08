export function deepMerge(target, source) {
  // Definir propiedades que deben sobrescribirse tal cual, sin mergear
  const overwriteProperties = ['responseAdapter', 'requestAdapter']; 

  // Creamos una copia profunda del target
  let result = Array.isArray(target) ? [] : {};

  // Copiamos las propiedades de target al result
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      result[key] = Array.isArray(target[key]) ? target[key].slice() : target[key];
    }
  }

  // Iteramos sobre las propiedades del source
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      if (overwriteProperties.includes(key)) {
        // Si la propiedad está en overwriteProperties, se sobrescribe tal cual
        result[key] = source[key];
      } else if (Array.isArray(source[key])) {
        // Si la propiedad es un array, sobrescribimos el array en el result
        result[key] = source[key].slice();
      } else if (typeof source[key] === 'object' && source[key] !== null) {
        // Si la propiedad es un objeto, llamamos recursivamente a deepMerge
        if (!result[key] || typeof result[key] !== 'object') {
          result[key] = {};
        }
        result[key] = deepMerge(result[key], source[key]);
      } else {
        // Si no es un objeto ni un array, simplemente copiamos el valor
        result[key] = source[key];
      }
    }
  }

  return result;
}