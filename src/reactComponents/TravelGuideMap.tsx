import { Destination } from "@/types/travelGuide";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";

type Props = {
  destinations: Destination[];
};
function TravelGuideMap(props: Props) {
  const { destinations } = props;

  function getCenterLatLng(destinations: Destination[]) {
    const center = destinations.find((destination) => {
      return destination.lat && destination.lon;
    });
    if (!destinations || !center) {
      return { lat: "0", lon: "0" };
    }
    return center;
  }
  return (
    <MapContainer
      center={[
        parseFloat(getCenterLatLng(destinations).lat),
        parseFloat(getCenterLatLng(destinations).lon),
      ]}
      zoom={11}
      scrollWheelZoom={false}
      className="h-96"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {destinations.map((destination) => {
        if (destination.lat && destination.lon) {
          return (
            <Marker
              position={[
                parseFloat(destination.lat),
                parseFloat(destination.lon),
              ]}
              key={destination.name}
            >
              <Tooltip
                direction="top"
                offset={[-15, -15]}
                opacity={1}
                permanent
              >
                {destination.name}
              </Tooltip>
            </Marker>
          );
        }
      })}
    </MapContainer>
  );
}

export default TravelGuideMap;
