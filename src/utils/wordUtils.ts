
export interface FilterOptions {
  filterString?: string;
}

const normalizeString = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u0302\u0304-\u036f]/g, "").normalize("NFC");
}

export const filterWords = (words: string[], filterString?: string): string[] => {
    if (!filterString) return words
    
    const normalizedFilter = normalizeString(filterString).replace(/\*/g, '[bcdfghjklmnñpqrstvwxyz]*')
    
    const regexString = ".*".concat(normalizedFilter).concat("$")
    const regex = new RegExp(regexString)
    
    return words.filter(word => regex.test(normalizeString(word)))
};
