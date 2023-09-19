import fetch from "node-fetch";
import DataSchema from "../models/Top10DataModel.js";
async function fetchData() {
  try {
    const response = await fetch("https://api.wazirx.com/api/v2/tickers");
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    throw error;
  }
}
export const home = async (req, res) => {
  //api fetch end
  try {
    const apiData = await fetchData();
    const top10Data = [];
    let count = 0;

    for (const key in apiData) {
      if (count >= 10) {
        break;
      }
      top10Data.push({
        name: key,
        last: apiData[key]["last"],
        buy: apiData[key]["buy"],
        sell: apiData[key]["sell"],
        volume: apiData[key]["volume"],
        base_unit: apiData[key]["base_unit"],
      });
      count++;
    }
    await DataSchema.deleteMany({});
    // Insert the data into MongoDB
    await DataSchema.insertMany(top10Data);

    // res.status(200).json({ message: "Data fetched and stored successfully" });
    const data = await DataSchema.find();
    return res.render("homePage", {
      title: "Home",
      data: data,
      message: "Data fetched and stored successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
