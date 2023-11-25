import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { Box, Button, Spinner, Stack } from "@chakra-ui/react";
import TaxationStepper from "../components/TaxationStepper";
import { IAPI_STATUS } from "../interface/api";
import axios from "axios";
import { BASE_API_URL } from "../variables/BaseAPI";
import { IProgressData } from "../interface/taxation";

const TaxationDetail = () => {
  const [fetchApiStatus, setFetchApiStatis] = useState<IAPI_STATUS>("");
  const [taxationData, setTaxationData] = useState<IProgressData>();
  const { user, logout, token } = useAuth();
  const axiosConfig = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  useEffect(() => {
    setFetchApiStatis("REQUEST");
    axios
      .get(`${BASE_API_URL}taxation-progress/${user?.username}/`, axiosConfig)
      .then((response) => {
        // Handle the successful response
        setFetchApiStatis("SUCCESS");
        setTaxationData(response.data);
      })
      .catch((error) => {
        setFetchApiStatis("FAILED");
        // Handle errors
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    console.log(taxationData);
  }, [taxationData]);
  useEffect(() => {
    const token =
      typeof window !== "undefined" && window.localStorage.getItem("token");
    if (!token || JSON.parse(token) === null) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <Box flexDirection={"column"}>
      Welcome {user?.first_name} <Button onClick={logout}>Logout</Button>
      <Box>
        {fetchApiStatus === "REQUEST" ? (
          <Spinner />
        ) : (
          <TaxationStepper taxationData={taxationData as IProgressData} />
        )}
      </Box>
    </Box>
  );
};
export default TaxationDetail;
