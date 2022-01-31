import { firestore } from "../../../firebase/admin"

export default async (req, res) => {
  try {
    const { query: params } = req

    if (Object.values(params).length < 1) {
      console.log("No hay query")
      res.json({
        statusText: "noResults",
        softees: [],
      })
    }

    const { docs } = await firestore
      .collection("softees")
      .where("hastags", "array-contains-any", Object.values(params))
      .orderBy("createdAt")
      .get()

    if (!docs) {
      res.json({
        statusText: "noResults",
        softees: [],
      })
    }

    const softees = docs.map(mapSofteeFromFirebaseToSofteeObject)

    res.json({
      statusText: "OK",
      softees,
    })
  } catch (err) {
    console.error(err)
    res.status(404).end()
  }
}

const mapSofteeFromFirebaseToSofteeObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data
  return {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
  }
}
