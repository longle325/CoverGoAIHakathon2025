// Temporarily disabled to fix build issue
// import { createFromSource } from "fumadocs-core/search/server";
// import { source } from "@/lib/source";

// export const { GET } = createFromSource(source);

import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({ message: "Search temporarily disabled" }, { status: 503 });
}
