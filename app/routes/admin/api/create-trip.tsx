import { GoogleGenAI } from "@google/genai";
import { ID } from "appwrite";
import { data } from "react-router";
import { appWriteConfig, appWriteDatabase } from "~/appwrite/config";
import type { Route } from "./+types/create-trip";

export async function action({ request }: Route.ActionArgs) {
  const { country, numberOfDays, travelStyle, interests, budget, groupType, userId } =
    await request.json();
  const ai = new GoogleGenAI({ apiKey: "AIzaSyDD8amojIdtqwmEd1TTl7ZXdR1A3dxywzI" });
  const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
          Budget: '${budget}'
          Interests: '${interests}'
          TravelStyle: '${travelStyle}'
          GroupType: '${groupType}'
          Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
          {
          "name": "A descriptive title for the trip",
          "description": "A brief description of the trip and its highlights not exceeding 100 words",
          "estimatedPrice": "Lowest average price for the trip in USD, show as a integer number e.g:s1700",
          "duration": ${numberOfDays},
          "budget": "${budget}",
          "travelStyle": "${travelStyle}",
          "country": "${country}",
          "interests": ${interests},
          "groupType": "${groupType}",
          "bestTimeToVisit": [
            '🌸 Season (from month to month): reason to visit',
            '☀️ Season (from month to month): reason to visit',
            '🍁 Season (from month to month): reason to visit',
            '❄️ Season (from month to month): reason to visit'
          ],
          "weatherInfo": [
            '☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
            '🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
            '🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
            '❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)'
          ],
          "location": {
            "city": "name of the city or region",
            "coordinates": [latitude, longitude],
            "openStreetMap": "link to open street map"
          },
          "itinerary": [
          {
            "day": 1,
            "location": "City/Region Name",
            "activities": [
              {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
              {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
              {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
            ]
          }
          ]
      }`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  const imageResponse = await fetch(
    `https://api.unsplash.com/search/photos?query=${interests} in ${country}&client_id=VuTMU6UrpftrDevCbPxTHKJ6z4nPn5fEJEGw57F_b3A`
  );
  const imageUrls = (await imageResponse.json()).results.map(
    (result: any) => result.urls?.regular || null
  );
  console.log(parseMarkdownToJson(response.candidates?.[0].content?.parts?.[0].text || ""));

  const createdTrip = await appWriteDatabase.createDocument(
    appWriteConfig.databaseId,
    appWriteConfig.tripCollection,
    ID.unique(),
    {
      ...parseMarkdownToJson(response.candidates?.[0].content?.parts?.[0].text || ""),
      tripImages: imageUrls.map((item: string) => ({
        name: country,
        url: item,
        description: country + " " + interests,
      })),
      createdBy: "6841d7c7ce6067ce2a2e",
    }
  );
  return data({ id: createdTrip.$id });
}

export function parseMarkdownToJson(markdownText: string) {
  const regex = /```json\n([\s\S]+?)\n```/;
  const match = markdownText.match(regex);

  if (match && match[1]) {
    try {
      return JSON.parse(match[1]);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }
  console.error("No valid JSON found in markdown text.");
  return null;
}
