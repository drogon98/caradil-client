export function roundAmount(value: number, decimalPlaces: number): number {
  return parseFloat(
    Number(
      Math.round(parseFloat(value + "e" + decimalPlaces)) + "e-" + decimalPlaces
    ).toFixed(decimalPlaces)
  );
}
