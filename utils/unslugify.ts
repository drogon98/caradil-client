export const unslugify = (s: string): string => {
  if (s) {
    let sections = s.split("-");
    return sections.join(" ");
  } else {
    return "";
  }
};
