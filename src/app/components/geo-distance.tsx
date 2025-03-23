// utils/distance.js

/**
 * Calculate the Haversine distance between two points in kilometers
 * This calculates the "as the crow flies" distance between two lat/lng points on Earth
 * 
 * @param {number} lat1 - Latitude of point 1 in decimal degrees
 * @param {number} lng1 - Longitude of point 1 in decimal degrees
 * @param {number} lat2 - Latitude of point 2 in decimal degrees
 * @param {number} lng2 - Longitude of point 2 in decimal degrees
 * @returns {number} Distance in kilometers
 */
export function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
    // Earth's radius in kilometers
    const R = 6371;
    
    // Convert latitude and longitude from degrees to radians
    const dLat = deg2rad(lat2 - lat1);
    const dLng = deg2rad(lng2 - lng1);
    
    // Haversine formula
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
      
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    
    return distance;
  }
  
  /**
   * Convert degrees to radians
   * 
   * @param {number} deg - Angle in degrees
   * @returns {number} Angle in radians
   */
  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }