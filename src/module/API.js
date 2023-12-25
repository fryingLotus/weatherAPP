
const fetchAPI = async (location) => {
  try {
    const apiKey = "13276b29873a46088ec160930232012";

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`,
      { mode: "cors" },
    );

    if (!response.ok) {
      throw new Error("Invalid API");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error Fetching Data", error);
    throw error;
  }
};
export default fetchAPI;
