import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    console.log("formdata: " + formData);

    const file = formData.get("file") as File;
    console.log("file: " + file);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const context = formData.get("context");
    let storedFilePath;
    if (context === "profileImage") {
      const filename = formData.get("username");
      storedFilePath = `./app/api/profile-images/${filename}.jpg`;
      await fs.writeFile(storedFilePath, buffer);
    } else {
      storedFilePath = `./public/uploads/${file.name}`;
      await fs.writeFile(storedFilePath, buffer);
    }

    const objectUrl = path.join(
      context === "profileImage" ? "/api/profile-images" : "/uploads",
      path.basename(storedFilePath)
    );

    console.log("Stored file URL: ", objectUrl);

    revalidatePath("/");

    return NextResponse.json({ status: "success", objectUrl });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  }
}
