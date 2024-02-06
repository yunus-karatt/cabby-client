export function getDistance(lat1:number, lon1:number, lat2:number, lon2:number) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
  }
  else {
    const deg2rad = (deg: number) => deg * (Math.PI / 180);
    lat1 = deg2rad(lat1);
    lon1 = deg2rad(lon1);
    lat2 = deg2rad(lat2);
    lon2 = deg2rad(lon2);

    const radius = 6371;

    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;

    const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lon1) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = radius * c;
    return distance
  }
}