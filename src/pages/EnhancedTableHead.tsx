import "./style.css";
import React from 'react';
import {
    Checkbox,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel,
    Box,
    styled,
    tableCellClasses
} from "@mui/material";
import { Song } from '@/songSlice';
import { visuallyHidden } from '@mui/utils';
import { grey } from '@mui/material/colors';


type Order = 'asc' | 'desc';

interface HeadCell {
    disablePadding: boolean;
    id: keyof Omit<Song, '_id'>;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: 'Title',
    },
    {
        id: 'artist',
        numeric: false,
        disablePadding: false,
        label: 'Artist',
    },
    {
        id: 'album',
        numeric: false,
        disablePadding: false,
        label: 'Album',
    },
    {
        id: 'genre',
        numeric: false,
        disablePadding: false,
        label: 'Genre',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Song) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

const EnhancedTableHead: React.FC<EnhancedTableProps> = (props) => {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

    const createSortHandler = (property: keyof Song) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: "#2F4050",
          color: theme.palette.common.white,
          fontWeight: 500,
          fontSize: 20,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 40,
        },
      }));

    return (
        <TableHead className='tableContainer'>
            <TableRow className="textHeader">
                <TableCell padding="checkbox">
                    <Checkbox
                        color="secondary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <StyledTableCell
                    className="header-label"
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            className="header-label"
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={{ ...visuallyHidden }}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
                <StyledTableCell>
          Action
        </StyledTableCell>
            </TableRow>
        </TableHead>
    );
}

export default EnhancedTableHead;