import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    console.log("Update status API called");
    const { id, status } = await request.json();
    console.log("Received data:", { id, status });

    if (!id || !status) {
      console.log("Missing id or status");
      return NextResponse.json(
        { error: "Missing id or status" },
        { status: 400 },
      );
    }

    // Check if Supabase client is initialized
    if (!supabase) {
      console.error("Supabase client not initialized");
      return NextResponse.json(
        { error: "Database connection error" },
        { status: 500 },
      );
    }

    const { data, error } = await supabase
      .from("students")
      .update({ status })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Update successful:", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Unexpected error in update-status API:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
