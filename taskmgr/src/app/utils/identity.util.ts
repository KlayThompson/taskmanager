import { GB2260 } from './identity.data';

/**
 * 根据身份证号码获取地址生日和性别信息
 * @param idNum 身份证号码
 */
export function extractInfo(idNum: string) {
  const addressPart = idNum.substring(0, 6);
  const birthPart = idNum.substring(6, 14);
  const genderPart = parseInt(idNum.substring(14, 17), 10);

  return {
    addrCode: addressPart,
    dateOfBirth: birthPart,
    gender: genderPart % 2 !== 0
  };
}



export function isValidAddr(code: string): boolean {
  return GB2260[code] !== undefined;
}

export const getAddrByCode = (code) => {
  const provinceStr = GB2260[code.substring(0, 2) + '0000'];
  const cityStr = GB2260[code.substring(0, 4) + '00'];
  const districtStr = GB2260[code];
  const city = cityStr.replace(provinceStr, '');
  const district = districtStr.replace(cityStr, '');
  return {
    province: provinceStr,
    city: city,
    district: district
  };
};
