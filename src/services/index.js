import axios from "axios";

export const getTransactionHistory = async (query) => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_BASE_URL
    }/get-historical-transactions?limit=10&tx_id=${query}`
  );

  return data.data;
};

export const getSupportedChains = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/supported-chains`
  );

  return data;
};

export const getExplorerStat = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/get-oracle-stats`
  );

  return data;
};

export const getTransactionsHistory = async (query) => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_BASE_URL
    }/get-historical-transactions?tx_id=${query}`
  );

  return data.data;
};

export const getAllUserBridgeTransaction = async (query) => {
  console.log("the query", query);
  const { account, origins } = query;

  console.log("the query", query);

  const { data } = await axios.get(
    `${
      import.meta.env.VITE_BASE_URL
    }/get-historical-transactions?limit=5&sender=${account}&origins=${origins}`
  );

  return data.data;
};

export const handleUpsertTransaction = async (data) => {
  try {
    // Send the POST request using Axios
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/upsert-historical-transaction`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Handle the response
    console.log("Transaction Success:", response.data);
  } catch (error) {
    // Handle error
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};
