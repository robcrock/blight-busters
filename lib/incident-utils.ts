import { Coordinates } from "@/types/Coordinates";
import { ServiceIncident } from "@/types/ServiceIncident";
import serviceIncidentData from "@/data/Open311ServiceRequestData.json";

export function getServiceIncidents(): ServiceIncident[] {
  console.log("Service Data", serviceIncidentData)
  const serviceRequestList: ServiceIncident[] = serviceIncidentData.map(request => ({
    ...request,
    Coordinates: parseCoordinates(request.Location_1),
  }));
  
  return serviceRequestList;
}

function parseCoordinates(location: string): Coordinates | null {
  const match = location.match(/POINT \((-?\d+.\d+) (-?\d+.\d+)\)/);
  if (match) {
    const [_, longitude, latitude] = match;
    return { longitude, latitude };
  }
  return null;
}