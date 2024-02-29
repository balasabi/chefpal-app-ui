
import {
    MaterialReactTable,
    useMaterialReactTable,
    createMRTColumnHelper,
    MRT_Row,
  } from 'material-react-table';
  import { data, type Person } from './makeData';
  import { Box } from '@mui/system';
  import PlaceIcon from '@mui/icons-material/Place';
import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';


  const columnHelper = createMRTColumnHelper<Person>();

  const columns = [
    // columnHelper.accessor('id', {
    //     header: 'DATE',
    //     size: 120,
    //   }),
    columnHelper.accessor('menu', {
      header: 'MENU',
      size: 100,
      Cell: ({ renderedCellValue, row }) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <img
            alt="avatar"
            height={50}
            width={50}
            src={require(`../../assets/images/${row.original.food_Name}.jpg`)}
            loading="lazy"
            style={{ borderRadius: '50%' }}
          />
          {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
          <span style={{fontWeight:"bold"}}>{renderedCellValue}</span>
        </Box>
      ),

    }),
    columnHelper.accessor('date', {
      header: 'DATE',
      size: 120,
    }),
    columnHelper.accessor('address', {
      header: 'ADDRESS',
      size: 125,
      Cell: ({ renderedCellValue, row }) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <PlaceIcon
            fontSize={'small'}
            sx={{ color: '#EF7215' }}
          />
          {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
          <span>{renderedCellValue}</span>
        </Box>
      ),
    }),
    columnHelper.accessor('total_amount', {
      header: 'TOTAL',
      size: 5,
      Cell: ({ renderedCellValue, row }) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            color:"#EF7215",
            fontWeight:"bold"
          }}
        >

          {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
          <span>{renderedCellValue}</span>
        </Box>
      ),

    }),
    columnHelper.accessor('city', {
      header: 'STATUS',
      size: 3,
      Cell: ({ renderedCellValue, row }) => (
        <Box
          sx={{
            display: 'flex',
            // alignItems: 'center',
            justifyContent:"space-evenly",
            gap: '1rem',
            color:"#EF7215",
            fontWeight:"bold"
          }}
        >
          {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                  <Button variant='outlined'style={{color:"green"}} >Completed</Button>
                  <Button variant='outlined' style={{color:"#EF7215"}}>OrderAgain</Button>
        </Box>
      ),
    }),
  ];



  const CustomTable = () => {
    //const [selectedRows, setSelectedRows] = useState<Person[]>([]);
    // const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    // const [initialData, setInitialData] = useState<Person[]>([]);

    // useEffect(() => {
    //   // Set the initial data to the first 5 records
    //   setInitialData(data.slice(0, 5));
    // }, []);

    const handleExportData = () => {
      const csvData = convertToCSV(data);
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'AllOrders.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    };

    const handleExportSelectedData = (rows: MRT_Row<Person>[]) => {

      const rowData = rows.map((row) => row.original)

      const csvData = convertToCSV(rowData);
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'SelectedOrders.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    };

  //   const handleRowSelectionChange = (rows: MRT_Row<Person>[]) => {
  //     const selectedData = rows.map(row => row.original);
  //     setSelectedRows(selectedData);
  // };
    const convertToCSV = (dataArray: Person[]) => {
      const header = Object.keys(dataArray[0]).join(',');
      const rows = dataArray.map(item => Object.values(item).join(','));
      return [header, ...rows].join('\n');
    };


    const table = useMaterialReactTable({
      columns,
      data,
      enableFullScreenToggle:false,
      enableRowSelection: true,
      columnFilterDisplayMode: 'popover',
      paginationDisplayMode: 'pages',
      positionToolbarAlertBanner: 'bottom',
      enableStickyHeader: true,
      initialState: { pagination: { pageSize: 7, pageIndex: 0 },density:"compact" },

      // manualFiltering: true, //turn off client-side filtering
      // onGlobalFilterChange: setGlobalFilter, //hoist internal global state to your state
      // state: { globalFilter }, //pass in your own managed globalFilter state

      muiPaginationProps: {
        rowsPerPageOptions: [5,7,10, 20],
    showFirstButton: false,
    showLastButton: false,

      },
      muiTableProps: {
        // Adjust the height of the table
        sx: {
          '& .MuiTableBody-root': {
            maxHeight: 'calc(100vh - 200px)', // Adjust the height based on your requirement
          },
        },
      },
    //   muiTableBodyCellProps: {
    //     style:{padding:'20px'},
    //   },
      muiTableHeadCellProps:{
        style:{textAlign:"center"}
      },
      renderTopToolbarCustomActions:({table}) =>(
        <Box>
          <Button
            onClick={handleExportData}
            startIcon={<FileDownloadIcon />}
          >
            Export All Data
          </Button>
            <Button
            onClick={() => handleExportSelectedData(table.getSelectedRowModel().rows)}
            startIcon={<FileDownloadIcon />}
            disabled={!table.getSelectedRowModel().rows || table.getSelectedRowModel().rows.length === 0}
          >
            SelectedExport
          </Button>

        </Box>
      )

    });

    return (
      // <div style={{ ...getStyle()}} >
      <MaterialReactTable table={table} />
    //  </div>
    );


  };

  export default CustomTable;
