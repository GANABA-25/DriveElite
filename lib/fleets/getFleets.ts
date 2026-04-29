"use server";

import Fleets from "@/models/fleets";
import connectionToDataBase from "@/lib/monogdb";

type fleetIDTypes = {
  fleetId: string;
};

export async function getFleets() {
  await connectionToDataBase();

  const fleets = await Fleets.find().lean();

  if (!fleets) return [];

  return JSON.parse(JSON.stringify(fleets));
}

export async function getSingleFleet({ fleetId }: fleetIDTypes) {
  await connectionToDataBase();

  const fleet = await Fleets.findById(fleetId);

  if (!fleet) return null;

  return JSON.parse(JSON.stringify(fleet));
}
