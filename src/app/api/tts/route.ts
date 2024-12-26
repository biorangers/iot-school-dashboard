import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  if (!text) {
    return NextResponse.json(
      { error: "Key and value are required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?alt=json&key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode: "tr-TR",
            name: "tr-TR-Standard-D",
            ssmlGender: "FEMALE",
          },
          audioConfig: {
            audioEncoding: "MP3",
          },
          advancedVoiceOptions: {
            lowLatencyJourneySynthesis: false,
          },
        }),
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    const audioString = `data:audio/mp3;base64,${data.audioContent}`;
    return NextResponse.json({ audioString });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to synthesize text to speech" },
      { status: 500 }
    );
  }
}
