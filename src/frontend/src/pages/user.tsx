import {
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { useState } from "react";
import IUser, { IUserWithTotalCount } from "../models/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StyledTableCell from "../components/StyledTableCell";
import StyledTableRow from "../components/StyledTableRow";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const columnHelper = createColumnHelper<IUser>();

export function Apptable() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [menuFor, setMenuFor] = useState<IUser>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLButtonElement>(
    null
  );
  const handleClick = React.useCallback(
    (menuFor: IUser) => (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setMenuFor(menuFor);
    },
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("username", {
        id: "username",
        cell: (info) => info.getValue(),

        header: () => <span>User Name</span>,
      }),
      columnHelper.accessor("createdAt", {
        id: "createdAt",
        cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY"),
        header: () => <span>Created At</span>,
      }),
      columnHelper.accessor("status", {
        header: "status",
      }),
      columnHelper.display({
        header: "Actions",

        cell: (info) => (
          <IconButton onClick={handleClick(info.row.original)}>
            <MoreVertIcon />
          </IconButton>
        ),
      }),
    ],
    [handleClick]
  );
  const open = Boolean(anchorEl);

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const { data } = useQuery<IUserWithTotalCount>(
    ["users"],
    () => axios.get("/api/user"),
    {
      initialData: {
        data: [],
        totalCount: 0,
      },
    }
  );
  console.log(data);

  const table = useReactTable({
    data: data.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <TableContainer sx={{ minWidth: 1000 }} component={Paper} className="p-2">
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <StyledTableCell key={header.id}>
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
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Fab
        size="small"
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: "40px", right: "32px" }}
        onClick={() => {
          setIsDialogOpen(true);
          handleClose();
        }}
      >
        <AddIcon />
      </Fab>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setIsDialogOpen(true);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose}>Activate</MenuItem>
        <MenuItem onClick={handleClose}>Deactiv</MenuItem>
      </Menu>
    </>
  );
}
