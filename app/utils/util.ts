export const tibetanRegex = /^[\u0F00-\u0FFF\u0F00-\u0FFF\s]+$/;
export const typeofMinaOptions = [
    "རྩོམ་སྒྲིག་པ་",
    "གཏེར་སྟོན་",
    "ལོ་ཙཱ་བ་",
    "རྩོམ་པ་པོ་",
  ] as const
export const typeMap: { [key: string]: string } = {
  "རྩོམ་སྒྲིག་པ་": "editor",
  "གཏེར་སྟོན་": "terton",
  "ལོ་ཙཱ་བ་": "translator",
  "རྩོམ་པ་པོ་": "author",
}
interface DomainItem {
  id: string;
  text: string;
  parent_id: string | null;
}

interface ClassifiedDomains {
  parents: DomainItem[];
  sub: DomainItem[];
}
export function cleanData(data: Record<string, any>): Record<string, any> {
    return Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    );
  }
  
export const filterSuggestions = (inputValue: string, data: any[]) => {
    return inputValue.trim()
      ? data.filter((option) =>
          option.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      : [];
  };

export function classifyDomains(data: DomainItem[]): ClassifiedDomains {
    const classified: ClassifiedDomains = {
      parents: [],
      sub: []
    };
  
    data.forEach(item => {
      if (item.parent_id === null) {
        classified.parents.push(item);
      } else {
        classified.sub.push(item);
      }
    });
  
    return classified;
  }