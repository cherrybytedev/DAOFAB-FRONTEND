import { useState, useEffect } from "react";
import { axiosRequest } from "../../../api/api";

import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

interface ChildData {
  id: number;
  sender: string;
  receiver: string;
  totalAmount: number;
  paidAmount: number;
}

const columns = [
  { id: "id", label: "ID" },
  { id: "sender", label: "Sender" },
  { id: "receiver", label: "Receiver" },
  { id: "totalAmount", label: "Total Amount" },
  { id: "paidAmount", label: "Paid Amount" },
];

function App() {
  const [tableData, steTableData] = useState<ChildData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const params = useParams();

  useEffect(() => {
    getTableDataApi();
    console.log("child", params);
  }, []);

  async function getTableDataApi() {
    setLoading(true);
    try {
      const response = await axiosRequest(
        "get",
        `children/${params.id}`,
        undefined,
        undefined
      );
      if (response) {
        setLoading(false);
        console.log(response.data);
        steTableData(response.data);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <Box pt={5}>
      <Grid container>
        <Grid item sm={2}></Grid>
        <Grid item sm={8}>
          <Box display={"flex"} textAlign={"center"} justifyContent={"center"}>
            <Typography variant="h4">{"Children"}</Typography>
          </Box>
          {!loading ? (
            tableData && tableData.length > 0 ? (
              <>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell key={column.id}>{column.label}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.sender}</TableCell>
                          <TableCell>{row.receiver}</TableCell>
                          <TableCell>{row.totalAmount}</TableCell>
                          <TableCell>{row.totalAmount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) : (
              <Box
                pt={5}
                display={"flex"}
                textAlign={"center"}
                justifyContent={"center"}
              >
                <Paper elevation={4} sx={{ px: 5, bgcolor: "#D3D3D3" }}>
                  <Typography variant="h6">{"No child found"}</Typography>
                </Paper>
              </Box>
            )
          ) : (
            <Box
              display={"flex"}
              textAlign={"center"}
              justifyContent={"center"}
            >
              <CircularProgress />
            </Box>
          )}
        </Grid>
        <Grid item sm={2}></Grid>
      </Grid>
    </Box>
  );
}

export default App;
