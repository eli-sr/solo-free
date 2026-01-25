
export interface FilterOptions {
  filterString?: string;
}

export const filterWords = (words: string[], filterString?: string): string[] => {
    filterString = filterString?.replace(/\*/g, '[bcdfghjklmnñpqrstvwxyz]*')
    const regexString = ".*".concat(filterString || "").concat("$")
    const regex = new RegExp(regexString)
    return words.filter(word => regex.test(word))
};
