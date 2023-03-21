/* import { places } from "../../../lib/db"; */
import Place from "../../../db/models/Places.js";
import dbConnect from "../../../db/connect.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    return response.status(200).json(places);
  }

  if (request.method === "POST") {
    try {
      const placeData = request.body;
      const place = new Place(placeData);
      await place.save();

      response.status(201).json({ status: "Joke created" });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
  response.status(400).json("Not found");
}
