import { firestore } from "../../../firebase/admin";

export default async (req, res) => {
  try {
    const { query } = req;
    const { id } = query;

    const doc = await firestore.collection("softees").doc(id).get();

    const data = doc.data();
    const { createdAt } = data;

    res.json({
      ...data,
      id,
      createdAt: +createdAt.toDate(),
    });
  } catch (err) {
    console.error(err);
    res.status(404).end();
  }
};
