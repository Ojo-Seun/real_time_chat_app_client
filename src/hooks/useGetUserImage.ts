import { useContext } from "react"
import { Store } from "../components/StoreProvider"

function useGetUserImage() {
  const { imageStorage } = useContext(Store).state

  const getImg = (imageName: string): string => {
    let img = imageStorage.find((x) => x[imageName])

    return img ? img[imageName] : ""
  }

  return { getImg }
}

export default useGetUserImage
