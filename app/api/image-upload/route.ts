import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file)
    return NextResponse.json({ error: "No files received." }, { status: 400 });

  try {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64data = reader.result?.toString().split(",")[1]; // Extract base64 data
      try {
        const response = await fetch("http://localhost:4000/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ file: base64data }),
        });
        return response.json();
      } catch (err) {
        console.log("Error occurred ", err);
        return NextResponse.json({ Message: "Failed", status: 500 });
      }
    };
  } catch (err) {
    console.log("Error occurred ", err);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
