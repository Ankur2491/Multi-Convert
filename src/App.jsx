import { useCallback, useMemo, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Converter from './Converter';
import { Button } from '@mui/material';
const fromList = ['json', 'properties', 'xml','yaml'];
const toList = ['json', 'properties', 'xml', 'yaml'];
function App() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('');
  const [filteredFromList, setFilteredFromList] = useState(fromList);
  const [filteredToList, setFilteredToList] = useState(toList);

  const handleFromChange = (event) => {
    setFrom(event.target.value);
    setFilteredToList(fromList.filter(item => item != event.target.value));
  };
  const handleToChange = (event) => {
    setTo(event.target.value);
    setFilteredFromList(toList.filter(item => item != event.target.value));
  };
  const reset = ()=> {
    setFilteredFromList(fromList);
    setFilteredToList(toList);
    setFrom('')
    setTo('')
  }
  // const func = useCallback(() => { if (type == 'json') console.log("JSON"); else console.log("YAML") }, [type])

  // const func2 = useMemo(() => {
  //   return () => {
  //     if (type == 'json')
  //       alert('JSON')
  //     else
  //       alert('YAML')
  //   }
  // }, [type]);
  // function changeType(e) {
  //   setType(e.target.value);
  // }
  return (
    <>
      <br />
      <Grid container spacing={2}>
        <Grid size={3}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">From</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={from}
                label="From"
                onChange={handleFromChange}
              >
                {
                  filteredFromList.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)
                }
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid size={3}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">To</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={to}
                label="To"
                onChange={handleToChange}
              >
                {
                  filteredToList.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)
                }
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid size={3}>
          <Box sx={{ minWidth: 120, marginTop: '15px' }}>
            <Button variant="contained" onClick={reset}>Reset</Button>

          </Box>
        </Grid>
      </Grid>
      <hr />
      <Converter fromType={from} toType={to} />
    </>
  )
}

export default App
