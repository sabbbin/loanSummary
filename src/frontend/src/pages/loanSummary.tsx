import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ILoanSummary, LoanSummaryWithCount } from "../models/loanSummary";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function LoanSummary() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [startDate, setStartDate] = useState(new Date("1990-10-1"));
  const [endDate, setEndDate] = useState(new Date());
  const [checkDate, setCheckDate] = useState(false);
  const { data } = useQuery<unknown, unknown, LoanSummaryWithCount>(
    ["loanSummary", page, rowsPerPage, startDate, endDate],
    () =>
      axios
        .get("api/loanSummary", {
          params: {
            startDate,
            endDate,
            pageNumber: page,
            pageSize: rowsPerPage,
          },
        })
        .then((res) => res.data),
    {
      initialData: {
        data: [],
        totalCount: 0,
      },
    }
  );
  const columnHelper = createColumnHelper<ILoanSummary>();

  const columns = [
    columnHelper.accessor("SDName", {
      cell: (value) => value.getValue(),
    }),

    columnHelper.accessor("PName", {
      cell: (value) => value.getValue(),
    }),
    columnHelper.accessor("Accno", {
      cell: (value) => value.getValue(),
    }),

    columnHelper.accessor("Aname", {
      cell: (value) => value.getValue(),
    }),
    columnHelper.accessor("O_Prin", {
      cell: (value) => value.getValue(),
    }),

    columnHelper.accessor("PrinDr", {
      cell: (value) => value.getValue(),
    }),
    columnHelper.accessor("PrinCr", {
      cell: (value) => value.getValue(),
    }),

    columnHelper.accessor("C_Prin", {
      cell: (value) => value.getValue(),
    }),
    columnHelper.accessor("O_Other", {
      cell: (value) => value.getValue(),
    }),

    columnHelper.accessor("OtherDr", {
      cell: (value) => value.getValue(),
    }),
    columnHelper.accessor("OtherCr", {
      cell: (value) => value.getValue(),
    }),

    columnHelper.accessor("C_Other", {
      cell: (value) => value.getValue(),
    }),
    columnHelper.accessor("O_IntOut", {
      cell: (value) => value.getValue(),
    }),

    columnHelper.accessor("CCalcInt", {
      cell: (value) => value.getValue(),
    }),

    columnHelper.accessor("IntPd", {
      cell: (value) => value.getValue(),
    }),
    columnHelper.accessor("LastYrIntPd", {
      cell: (value) => value.getValue(),
    }),

    columnHelper.accessor("ThisYrIntPd", {
      cell: (value) => value.getValue(),
    }),
    columnHelper.accessor("C_IntOut", {
      cell: (value) => value.getValue(),
    }),

    columnHelper.accessor("O_PenaltyOut", {
      cell: (value) => value.getValue(),
    }),

    columnHelper.accessor("CCalcPenalty", {
      cell: (value) => value.getValue(),
    }),
    columnHelper.accessor("PenaltyPd", {
      cell: (value) => value.getValue(),
    }),

    columnHelper.accessor("C_PenaltyOut", {
      cell: (value) => value.getValue(),
    }),
    columnHelper.accessor("IntRebate", {
      cell: (value) => value.getValue(),
    }),

    columnHelper.accessor("PenaltyRebate", {
      cell: (value) => value.getValue(),
    }),
    columnHelper.accessor("TotAmtPd", {
      cell: (value) => value.getValue(),
    }),
    columnHelper.accessor("ReportDate", {
      cell: (value) => value.getValue(),
    }),

    columnHelper.accessor("Id", {
      cell: (value) => value.getValue(),
    }),
  ];

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 25));
    setPage(0);
  };
  console.log("dat", data.data);
  const table = useReactTable({
    data: data.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (startDate < endDate) {
      setCheckDate(false);
    }
  }, [startDate, endDate]);

  let { data: resdata, refetch: downloadFromApi } = useQuery(
    ["login"],
    () =>
      axios
        .get("api/loanSummary/download", {
          params: {
            startDate,
            endDate,
          },
          headers: {
            Authorization: "Bearer token",
          },
        })
        .then((res) => res.data),
    {}
  );

  const downloadCSV = (url: string, filename: string) => {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };
  useEffect(() => {
    if (resdata) {
      const blob = new Blob([resdata], {
        type: "type/csv",
      });
      const url = URL.createObjectURL(blob);
      let filename = "exportLoanSummary";
      downloadCSV(url, `${filename}.csv`);
    }
  }, [resdata]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
          width: "90vw",
        }}
      >
        <Button variant="contained" onClick={() => downloadFromApi()}>
          Download
        </Button>
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="Select StartDate"
              value={startDate}
              onChange={(newValue) => {
                newValue && setStartDate(newValue);
              }}
              minDate={new Date("1800-1-1")}
              maxDate={new Date()}
              renderInput={(params) => (
                <TextField
                  size="small"
                  sx={{
                    marginRight: "10px",
                  }}
                  {...params}
                />
              )}
            />
            <MobileDatePicker
              label="Select endDate"
              value={endDate}
              onChange={(newValue) => {
                newValue && setEndDate(newValue);
              }}
              maxDate={new Date()}
              renderInput={({ error, ...params }) => (
                <TextField
                  error={checkDate || error}
                  size="small"
                  {...params}
                  helperText={
                    checkDate && "select start date less than end date"
                  }
                />
              )}
            />
          </LocalizationProvider>
        </div>
      </Box>

      {data.data.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <StyledTableCell key={headerGroup.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </StyledTableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <StyledTableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <StyledTableCell
                      key={cell.id}
                      sx={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            count={data.totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <div> No Record</div>
      )}
    </>
  );
}