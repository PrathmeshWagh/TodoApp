import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

function AllPlaces({ route }) {

  const [loadedPlaces, setLoadedPlaces] = useState('')
  const isFocused = useIsFocused

  useEffect(() => {

    async function loadPlaces() {
      await fetchPlaces()
    }

    if (isFocused && route.params) {
      loadPlaces()
      // setLoadedPlaces(cuurrentPlaces => [...cuurrentPlaces, route.params.place])
    }

  }, [isFocused])


  return <PlacesList places={loadedPlaces} />
}

export default AllPlaces