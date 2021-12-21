import { firestore } from "../../../firebase/admin";

export default async (req, res) => {
  try {
    const { query } = req;
    const { id } = query;

    const doc = await firestore.collection("softees").doc(id).get();

    const data = doc.data();
    return res.json(data);
  } catch (err) {
    console.error(err);
    res.status(404).end();
  }
};
