import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { $haengjung, $mapcood, $mapzoom } from "../store/haengjung";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";

const MapControl = () => {
	const map = useMap()
	const zoom = useStore($mapzoom)
	const cood = useStore($mapcood)

	useEffect(() => {
		map.setView(cood, zoom)
	}, [cood, zoom])

	return null
}

export default function NorajoMap() {

	const { data, loading } = useStore($haengjung)

  return (
    <MapContainer
      center={$mapcood.get()}
      zoom={$mapzoom.get()}
      scrollWheelZoom={false}
      className="h-full"
    >
			<MapControl />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
			{ data && data.map((row, i) => (
				<Marker key={`서울행정${i}`} position={[row.la, row.lo]}>
					<Popup>{`${row.c} ${row.gg}`}</Popup>
				</Marker>
			)) }
    </MapContainer>
  );
}
