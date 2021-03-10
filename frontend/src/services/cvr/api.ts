export interface CVRDataDto {
  name: string;
  email: string;
  tel: string;
  addressLine1: string;
  addressLine2: string;
}

export const getDataFromCVR = async (cvr: string): Promise<CVRDataDto> {
  const url = "https://cvrapi.dk/api?country=dk&vat=";

  const result = await fetch(url + cvr);
  if (!result.ok) throw new Error("Not 2xx response");
  const data = await result.json();

  return {
    name: result.name ?? "",
    email: result.email ?? "",
    tel: result.phone ?? "",
    addressLine1: result.address ?? "",
    addressLine2: `${result.zipcode ?? ""} ${result.city ?? ""}`.trim()
  }
}
