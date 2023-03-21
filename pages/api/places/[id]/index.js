import Place from "../../../../db/models/Places.js";
import dbConnect from "../../../../db/connect.js";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }

    response.status(200).json(place);
  }

  // PUT function (Update function)
  if (request.method === "PUT") {
    const placeToUpdate = await Place.findByIdAndUpdate(id, {
      $set: request.body,
    });
    response.status(200).json(placeToUpdate);
  }

  //delete function

  // Funktion wird aufgerufen, wenn DELETE- Anfrage empfangen wird
  if (request.method === "DELETE") {
    // Datensatz mit ID finden und löschen (?)
    const placeToDelete = await Place.findByIdAndDelete(id);

    // Wenn nicht gefunden wird dann Fehlermeldung
    if (!placeToDelete) {
      return response.status(404).json({ status: "Not found" });
    }
    // Wenn Datensatz gelöscht wurde, sende gelöschten Datensatz in JSON zurück
    response.status(200).json(placeToDelete);
  }
}
