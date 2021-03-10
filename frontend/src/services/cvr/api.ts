export interface ICVRDataDto {
  name: string;
  email: string;
  tel: string;
  addressLine1: string;
  addressLine2: string;
}

export class CVRDataDto implements ICVRDataDto {
  name: string;
  email: string;
  tel: string;
  addressLine1: string;
  addressLine2: string;
}

export interface ICVRClient {
  getDataFromCVR(cvr: string): Promise<ICVRDataDto>;
}

export class CVRClient implements ICVRClient {
  getDataFromCVR(cvr: string): Promise<ICVRDataDto> {
    const url = "https://cvrapi.dk/api?country=dk&vat=";
    const data = new CVRDataDto();
    return fetch(url + cvr)
      .then(res => res.json())
      .then(
        result => {
          data.name = result.name ? result.name : "";
          data.email = result.email ? result.email : "";
          data.tel = result.phone ? result.phone : "";
          data.addressLine1 = result.address ? result.address : "";
          data.addressLine2 =
            (result.zipcode ? result.zipcode + " " : "") + (result.city ? result.city : "");
          return data;
        },
        error => {
          console.error("Error when trying to fetch from CVR-registry");
          return null;
        }
      );
  }
}
