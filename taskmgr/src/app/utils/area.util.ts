import { city_data } from './area.data';

/**
 * 获取省份列表
 */
export const getProvince = () => {
  const provinces = [];
  for (const province in city_data) {
    if (province) {
      provinces.push(province);
    }
  }
  return [...provinces];
};
/**
 * 根据省份获取市列表
 * @param province 查询的省份
 */
export const getCitiesByProvince = (province: string) => {
  if (!province || !city_data[province]) {
    return [];
  }
  const cities = city_data[province];
  const citiesByProvince = [];
  for (const city in cities) {
    if (city) {
      citiesByProvince.push(city);
    }
  }
  return [...citiesByProvince];
};
/**
 * 根据省份和市获取区名称
 * @param province 省份
 * @param city 城市🏙
 */
export const getAreaByCity = (province: string, city: string) => {
  if (!province || !city || city_data[province][city]) {
    return [];
  }
  const areaArr = city_data[province][city];
  return [...areaArr];
};
