"use server";

import Fleets from "@/models/fleets";
import connectionToDataBase from "@/lib/monogdb";

export async function getFleets() {
  await connectionToDataBase();

  const fleets = await Fleets.find().lean();

  if (!fleets) return [];

  return JSON.parse(JSON.stringify(fleets));
}
