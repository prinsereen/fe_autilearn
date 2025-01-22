import { NextResponse } from "next/server";
import api from "@/utils/api";

export async function GET(req) {
  const result = await api.getReport();
  const response = NextResponse.json(result);
  return response;
}