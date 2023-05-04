import { useState, useEffect } from "react";
import { axiosRequest } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Pagination,
  Grid,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";

interface ParentData {
  id: number;
  sender: string;
  receiver: string;
  totalAmount: number;
  totalPaidAmount: number;
}

const columns = [
  { id: "id", label: "ID" },
  { id: "sender", label: "Sender" },
  { id: "receiver", label: "Receiver" },
  { id: "totalAmount", label: "Total Amount" },
  { id: "totalPaidAmount", label: "Total Paid Amount" },
];

function App() {
  const navigate = useNavigate();

  const [tableData, steTableData] = useState<ParentData[]>([]);
  const [pagenumber, setPageNumber] = useState<number>(1);

  const handleTotalPaidAmountClick = (parentId: number) => {
    navigate(`child-Table/${parentId} `);
  };
  const changePage = (event: any, value: number) => {
    setPageNumber(value);
  };
  useEffect(() => {
    getTableDataApi();
  }, [pagenumber]);

  async function getTableDataApi() {
    try {
      const response = await axiosRequest(
        "get",
        `parents?page=${pagenumber}&pageSize=2`,
        undefined,
        undefined
      );

      steTableData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box pt={5}>
      <Grid container>
        <Grid item sm={2}></Grid>
        <Grid item sm={8}>
          {tableData.length > 0 ? (
            <>
              <Box
                display={"flex"}
                textAlign={"center"}
                justifyContent={"center"}
              >
                <Typography variant="h4">{"Parents"}</Typography>
              </Box>
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
                        <TableCell>
                          <Button
                            onClick={() => handleTotalPaidAmountClick(row.id)}
                          >
                            {row.totalPaidAmount}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box
                pt={2}
                display={"flex"}
                textAlign={"right"}
                justifyContent={"right"}
              >
                <Pagination onChange={changePage} count={4} />
              </Box>
            </>
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
